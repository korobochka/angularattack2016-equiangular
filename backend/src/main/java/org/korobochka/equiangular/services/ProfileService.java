package org.korobochka.equiangular.services;

import org.korobochka.equiangular.Main;
import org.korobochka.equiangular.models.Skill;
import org.korobochka.equiangular.models.User;
import org.korobochka.equiangular.stores.SkillStore;
import org.korobochka.equiangular.stores.UserStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Spark;

import javax.persistence.EntityManager;

import static org.korobochka.equiangular.services.AuthService.getCurrentUser;
import static spark.Spark.*;

/**
 * Created by korobochka on 5/15/16.
 */
public class ProfileService {
	private static final Logger log = LoggerFactory.getLogger(ProfileService.class);

	public static void initRoutes() {

		get("/api/profile/:userId", (request, response) -> {
			EntityManager entityManager = request.attribute("EM");
			long userId = Long.parseLong(request.params("userId"));
			if(userId == 0) return getCurrentUser(request);
			else return UserStore.getUserById(entityManager, userId);
		}, Main.gson::toJson);

		get("/api/profile/:userId/skills", (request, response) -> {
			EntityManager entityManager = request.attribute("EM");
			long userId = Long.parseLong(request.params("userId"));
			if(userId == 0) userId = getCurrentUser(request).id;
			User user = UserStore.getUserById(entityManager, userId);
			return user.skills;
		}, Main.gson::toJson);

		post("/api/profile/:userId/skills", (request, response) -> {
			long userId = Long.parseLong(request.params("userId"));
			if(userId != 0) throw new Exception("Cant modify other users skills");
			User user = getCurrentUser(request);
			EntityManager entityManager = request.attribute("EM");
			Skill skill = SkillStore.getSkillByTitle(entityManager, request.body());
			log.info("Adding new intended skill: " + skill.title);
			user.skills.add(skill);
			return skill;
		}, Main.gson::toJson);

		delete("/api/profile/:userId/skills/:skillId", (request, response) -> {
			long userId = Long.parseLong(request.params("userId"));
			if(userId != 0) throw new Exception("Cant modify other users skills");
			User user = getCurrentUser(request);
			EntityManager entityManager = request.attribute("EM");
			Skill skill = SkillStore.getSkillById(entityManager, Long.parseLong(request.params("skillId")));
			log.info("Removing new intended skill: " + skill.title);
			user.skills.remove(skill);
			return "Removed intended skill: " + skill.title;
		}, Main.gson::toJson);
	}
}
