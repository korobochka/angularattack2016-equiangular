package org.korobochka.equiangular;

import com.github.scribejava.apis.LinkedInApi20;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import org.korobochka.equiangular.models.LIProfile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import static spark.Spark.*;
/**
 * Created by korobochka on 5/14/16.
 */
public class AuthService {
	private static final Logger log = LoggerFactory.getLogger(AuthService.class);
	//private static final String URL = "https://api.linkedin.com/v1/people/~:(id,formatted-name,skills)?format=json";
	private static final String URL = "https://api.linkedin.com/v1/people/~:(id,formatted-name)?format=json";

	private static final Properties secrets;
	private static final OAuth20Service LIService;

	static {
		secrets = new Properties();
		try {
			secrets.load(new FileInputStream("secret.properties"));
		} catch (IOException e) {
			e.printStackTrace();
			System.exit(1);
		}
		LIService = new ServiceBuilder()
			.apiKey(secrets.getProperty("li.key")).apiSecret(secrets.getProperty("li.secret"))
			.scope("r_basicprofile")
			.callback(secrets.getProperty("li.callback", "http://korobochka.org:4567/api/auth/li_callback"))
			.state("some_params") //todo
			.build(LinkedInApi20.instance());
	}

	public static void initRoutes() {
		get("/api/auth/li", (request, response) -> {
			response.redirect(LIService.getAuthorizationUrl());
			return null;
		});

		get("/api/auth/li_callback", (request, response) -> {
			String code = request.queryParams("code");
			OAuth2AccessToken accessToken = LIService.getAccessToken(code);
			OAuthRequest LIRequest = new OAuthRequest(Verb.GET, URL, LIService);
			LIService.signRequest(accessToken, LIRequest);
			final Response LIresponse = LIRequest.send();
			LIProfile profile = Main.gson.fromJson(LIresponse.getBody(), LIProfile.class);
			return "Hello, " + profile.formattedName;
			//response.redirect("/");
			//return null;
		});
	}
}
