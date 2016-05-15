package org.korobochka.equiangular.services;

import org.korobochka.equiangular.Main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Spark;

import static spark.Spark.*;

/**
 * Created by lgarswood on 5/14/16.
 */
public class SkillService {
	private static final Logger log = LoggerFactory.getLogger(SkillService.class);

	public static void initRoutes() {
		Spark.get("/api/skills", (req, res) -> {
			res.redirect("/api/profile/0/skills");
			return null;
		}, Main.gson::toJson);

		post("/api/skills", (req, res) -> {
			res.redirect("/api/profile/0/skills");
			return null;
		}, Main.gson::toJson);

		delete("/api/skills/:id", (req, res) -> {
			res.redirect("/api/profile/0/skills/" + req.params("id"));
			return null;
		}, Main.gson::toJson);
	}
}
