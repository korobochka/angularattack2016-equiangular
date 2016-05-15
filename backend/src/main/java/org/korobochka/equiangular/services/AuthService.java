package org.korobochka.equiangular.services;

import com.github.scribejava.apis.LinkedInApi20;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import org.korobochka.equiangular.CustomException;
import org.korobochka.equiangular.Main;
import org.korobochka.equiangular.apidmodels.LIProfile;
import org.korobochka.equiangular.models.User;
import org.korobochka.equiangular.stores.UserStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;
import spark.Session;

import javax.persistence.EntityManager;
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

	public static final Properties secrets;
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
			.callback(secrets.getProperty("li.callback", "https://korobochka.org:4567/api/auth/li_callback"))
			.state("some_params") //todo
			.build(LinkedInApi20.instance());
	}

	public static void initRoutes() {
		get("/api/auth/li", (request, response) -> {
			request.session().attribute("return", request.queryParams("return"));
			response.redirect(LIService.getAuthorizationUrl());
			return null;
		});

		get("/api/auth/li_callback", (request, response) -> {
			if(request.queryParams("error") != null) throw new CustomException("Auth failed!");
			String code = request.queryParams("code");
			OAuth2AccessToken accessToken = LIService.getAccessToken(code);

			OAuthRequest LIRequest = new OAuthRequest(Verb.GET, URL, LIService);
			LIService.signRequest(accessToken, LIRequest);
			final Response LIresponse = LIRequest.send();
			LIProfile profile = Main.gson.fromJson(LIresponse.getBody(), LIProfile.class);

			Session session = request.session(true);
			authorizeUser(request, profile.id, profile.formattedName);

			if(session.attribute("return") != null) response.redirect(session.attribute("return"));
			else response.redirect("/");
			return null;
		});

		post("/api/auth/logout", (request, response) -> {
			Session session = checkUserAuthorization(request);
			session.removeAttribute("user");
			return "OK";
		});
	}

	public static Session checkUserAuthorization(Request request) throws CustomException {
		Session session = request.session();
		if(session == null || session.attribute("user") == null) throw new CustomException("Auth required");
		return session;
	}

	public static User getCurrentUser(Request request) throws CustomException {
		Session session = checkUserAuthorization(request);
		EntityManager entityManager = request.attribute("EM");
		return UserStore.getUserById(entityManager, session.attribute("user"));
	}

	private static void authorizeUser(Request request, String LIID, String formattedName) {
		Session session = request.session();
		EntityManager entityManager = request.attribute("EM");
		log.info("Authorized user " + formattedName + " with id " + LIID);
		User user = UserStore.getUserByLiId(entityManager, LIID);
		user.name = formattedName;
		session.attribute("user", user.id);
	}
}
