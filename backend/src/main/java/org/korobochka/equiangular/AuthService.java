package org.korobochka.equiangular;

import com.github.scribejava.apis.LinkedInApi20;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.oauth.OAuth20Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static spark.Spark.*;
/**
 * Created by korobochka on 5/14/16.
 */
public class AuthService {
	private static final Logger log = LoggerFactory.getLogger(AuthService.class);
	private static final OAuth20Service LIService = new ServiceBuilder()
			.apiKey("").apiSecret("")
			.scope("r_basicprofile")
			.callback("http://korobochka.org:4567/api/auth/li_callback")
			.state("some_params") //todo
			.build(LinkedInApi20.instance());


	public static void initRoutes() {
		get("/api/auth/li", (request, response) -> {
			return LIService.getAuthorizationUrl();
		}, Main.gson::toJson);

		get("/api/auth/li_callback", (request, response) -> {
			log.info(request.queryMap().toString());
			response.redirect("/");
			return "OK";
		});
	}
}
