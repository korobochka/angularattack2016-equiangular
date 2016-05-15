package org.korobochka.equiangular;

import org.korobochka.equiangular.models.Skill;
import org.korobochka.equiangular.models.User;

import org.korobochka.equiangular.stores.SkillStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import java.util.Set;
import java.util.StringJoiner;

import static spark.Spark.*;

/**
 * Created by lgarswood on 5/14/16.
 */
class SkillService {
	private static final Logger log = LoggerFactory.getLogger(SkillService.class);

	static void initRoutes() {
		get("/api/skills", (req, res) -> {
			User user = AuthService.getCurrentUser(req);
			return user.skills;
		}, Main.gson::toJson);

		post("/api/skills", (req, res) -> {
			User user = AuthService.getCurrentUser(req);
			EntityManager entityManager = req.attribute("EM");
			Skill skill = SkillStore.getSkillByTitle(entityManager, Main.gson.fromJson(req.body(), String.class));
			log.info("Adding new intended skill: " + skill.title);
			addUserIntendedSkills(user, skill);
			return skill;
		}, Main.gson::toJson);
		delete("/api/skills/:id", (req, res) -> {
			User user = AuthService.getCurrentUser(req);
			EntityManager entityManager = req.attribute("EM");
			Skill skill = SkillStore.getSkillById(entityManager, Long.parseLong(req.params("id")));
			log.info("Removing new intended skill: " + skill.title);
			removeUserIntendedSkills(user, skill);
			return "Removed intended skill: " + skill.title;
		}, Main.gson::toJson);
	}

	private static void removeUserIntendedSkills(User user, Skill skill) {
		user.skills.remove(skill);
	}

	private static void addUserIntendedSkills(User user, Skill skill) {
		user.skills.add(skill);
	}
}
