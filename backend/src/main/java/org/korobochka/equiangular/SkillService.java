package org.korobochka.equiangular;

import org.hibernate.jpa.boot.spi.EntityManagerFactoryBuilder;
import org.korobochka.equiangular.models.Question;
import org.korobochka.equiangular.models.Skill;
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
			User user = AuthService.getCurrentUser(req);
			return Main.gson.toJson(getUserIntendedSkills(user));

		});
		post("/api/skills", (req, res) -> {
			User user = AuthService.getCurrentUser(req);
			Skill skill = Main.gson.fromJson(req.body(), Skill.class);
			log.info("Adding new intended skill: " + skill.title);
			addUserIntendedSkills(user, skill);
			return Main.gson.toJson("Saved intended skill: " + skill.title);
		});
		delete("/api/skills", (req, res) -> {
			User user = AuthService.getCurrentUser(req);
			Skill skill = Main.gson.fromJson(req.body(), Skill.class);
			log.info("Removing new intended skill: " + skill.title);
			removeUserIntendedSkills(user, skill);
			return Main.gson.toJson("Removed intended skill: " + skill.title);
		});
	}

	private static void removeUserIntendedSkills(User user, Skill skill) {
		user.skills.remove(skill);
	}

	private static void addUserIntendedSkills(User user, Skill skill) {
		user.skills.add(skill);
	}

	private static List<Skill> getUserIntendedSkills(User user) {
		return user.skills;
	}
}
