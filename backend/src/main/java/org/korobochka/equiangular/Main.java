package org.korobochka.equiangular;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.eclipse.jetty.http.HttpStatus;
import org.korobochka.equiangular.services.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.lang.reflect.Modifier;

import static spark.Spark.*;

/**
 * Created by korobochka on 5/14/16.
 */
public class Main {
	private static EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("equiangularDB");

	private static final Logger log = LoggerFactory.getLogger(Main.class);
	public static final Gson gson = new GsonBuilder()
			.setExclusionStrategies(new ExclusionStrategy() {
				@Override
				public boolean shouldSkipField(FieldAttributes fieldAttributes) {
					return fieldAttributes.getAnnotation(Exclude.class) != null;
				}

				@Override
				public boolean shouldSkipClass(Class<?> aClass) {
					return false;
				}
			})
			.excludeFieldsWithModifiers(Modifier.STATIC, Modifier.TRANSIENT, Modifier.VOLATILE)
			.create();

	public static void main(String[] args) {
		externalStaticFileLocation("../dist");
		enableCORS("http://equiangular.2016.angularattack.io", "POST, GET, DELETE, PUT, OPTIONS", "Content-Type");

		// set up exception handling
		exception(CustomException.class, (exception, request, response) -> {
			response.status(HttpStatus.FORBIDDEN_403);
			response.body(gson.toJson(exception));
		});

		exception(Exception.class, (exception, request, response) -> {
			Throwable t = exception;
			while(t != null) {
				System.out.println(t.toString());
				t = t.getCause();
			}
			response.status(HttpStatus.INTERNAL_SERVER_ERROR_500);
			response.body(exception.toString());
		});

		// set up logging
		before((request, response) -> request.attribute("timeStarted", System.currentTimeMillis()));
		after((request, response) -> {
			long timeSpent = System.currentTimeMillis() - (Long)request.attribute("timeStarted");
			log.info(request.requestMethod() + " " +request.url() + " completed in " + timeSpent + " ms");
		});

		// set up JPA
		before((request, response) -> {
			EntityManager entityManager = entityManagerFactory.createEntityManager();
			request.attribute("EM", entityManager);
			entityManager.getTransaction().begin();
		});
		after((request, response) -> {
			EntityManager entityManager = request.attribute("EM");
			if(entityManager == null) return;
			entityManager.getTransaction().commit(); // todo rollback on exception?
			entityManager.close();
		});

		// other
		before("/api/*", (request, response) -> {
			response.type("application/json");
		});

		get("/api/ping", (req, res) -> {
			return "pong";
		});

		get("/api/throw", ((request, response) -> {
			throw new CustomException("test reason");
		}));

		// stop server on github hook
		// todo security
		post("/reload/4401dba7-2528-455d-a1d4-3e05d2ab4281", (request, response) -> {
			log.info("Got github hook and stopping to update");
			new Thread(() -> {
				try {
					Thread.sleep(1000);
				} catch (InterruptedException ignore) {}
				stop();
				entityManagerFactory.close();
			}).start();
			return "OK";
		});

		// add routes from modules
		TestService.initRoutes();
		AuthService.initRoutes();
		SkillService.initRoutes();
		ProfileService.initRoutes();
		QuestionService.initRoutes();
}

	private static void enableCORS(final String origin, final String methods, final String headers) {

		options("/api/*", (request, response) -> {
			String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
			if (accessControlRequestHeaders != null) {
				response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
			}

			String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
			if (accessControlRequestMethod != null) {
				response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
			}

			return "OK";
		});

		before("/api/*", (request, response) -> {
			if(request.headers("Origin") != null
					&& request.headers("Origin").replaceAll("http://|https://", "").startsWith("localhost:")) {
				response.header("Access-Control-Allow-Origin", request.headers("Origin"));
			} else {
				response.header("Access-Control-Allow-Origin", origin);
			}
			response.header("Access-Control-Request-Method", methods);
			response.header("Access-Control-Allow-Headers", headers);
		});
	}
}
