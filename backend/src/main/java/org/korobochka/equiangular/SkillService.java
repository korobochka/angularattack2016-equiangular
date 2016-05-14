package org.korobochka.equiangular;

import org.korobochka.equiangular.models.Question;
import org.korobochka.equiangular.models.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

import static spark.Spark.*;

/**
 * Created by lgarswood on 5/14/16.
 */
class SkillService {
	private static final Logger log = LoggerFactory.getLogger(SkillService.class);

	static void initRoutes() {
		get("/api/skills", (req, res) -> { // TODO have select from an identity and probably take skill type
			return Main.gson.toJson(getUserIntendedSkills(null));
		});
		post("/api/skills", (req, res) -> {
			String skill = req.body();
			log.info("Adding new intended skill: " + skill);
			addUserIntendedSkills(null, skill);
			return Main.gson.toJson("Saved intended skill: " + skill);
		});
		delete("/api/skills", (req, res) -> {
			String skill = req.body();
			log.info("Removing new intended skill: " + skill);
			removeUserIntendedSkills(null, skill);
			return Main.gson.toJson("Removed intended skill: " + skill);
		});
	}

	private static void removeUserIntendedSkills(User user, String skill) {
		new User().removeIntendedSkill(skill);
	}

	private static void addUserIntendedSkills(User user, String skill) {
		new User().getIntendedSkills().add(skill);
	}

	private static List<String> getUserIntendedSkills(User user) {
		return new User().getIntendedSkills();
	}
}
