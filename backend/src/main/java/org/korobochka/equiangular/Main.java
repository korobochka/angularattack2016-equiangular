package org.korobochka.equiangular;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static spark.Spark.*;

/**
 * Created by korobochka on 5/14/16.
 */
public class Main {
	private static final Logger log = LoggerFactory.getLogger(Main.class);

	public static void main(String[] args) {
		enableCORS("*.2016.angularattack.io", "POST, GET, DELETE, PUT, OPTIONS", "Content-Type");

		before((request, response) -> request.attribute("timeStarted", System.currentTimeMillis()));
		after((request, response) -> {
			long timeSpent = System.currentTimeMillis() - (Long)request.attribute("timeStarted");
			log.info(request.url() + " completed in " + timeSpent + " ms");
		});

		get("/", (req, res) -> {
			return "Hello from the backend";
		});
	}

	private static void enableCORS(final String origin, final String methods, final String headers) {

		options("/*", (request, response) -> {

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
			// Note: this may or may not be necessary in your particular application
			response.type("application/json");
		});
	}
}
