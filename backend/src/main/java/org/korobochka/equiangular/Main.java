package org.korobochka.equiangular;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.eclipse.jetty.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Modifier;

import static spark.Spark.*;

/**
 * Created by korobochka on 5/14/16.
 */
public class Main {
	private static final Logger log = LoggerFactory.getLogger(Main.class);
	private static final Gson gson = new GsonBuilder()
			.excludeFieldsWithModifiers(Modifier.STATIC, Modifier.TRANSIENT, Modifier.VOLATILE)
			.create();

	public static void main(String[] args) {
		externalStaticFileLocation("../dist");
		enableCORS("*.2016.angularattack.io", "POST, GET, DELETE, PUT, OPTIONS", "Content-Type");

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

		before((request, response) -> request.attribute("timeStarted", System.currentTimeMillis()));
		after((request, response) -> {
			long timeSpent = System.currentTimeMillis() - (Long)request.attribute("timeStarted");
			log.info(request.url() + " completed in " + timeSpent + " ms");
		});

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
			log.info("Got github hook and stopping to update!");
			new Thread(() -> {
				try {
					Thread.sleep(1000);
				} catch (InterruptedException ignore) {}
				stop();
			}).start();
			return "OK";
		});
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

		before((request, response) -> {
			response.header("Access-Control-Allow-Origin", origin);
			response.header("Access-Control-Request-Method", methods);
			response.header("Access-Control-Allow-Headers", headers);
		});
	}
}
