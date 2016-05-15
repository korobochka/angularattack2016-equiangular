package org.korobochka.equiangular.services;

import org.korobochka.equiangular.Main;
import org.korobochka.equiangular.models.Answer;
import org.korobochka.equiangular.models.Question;
import org.korobochka.equiangular.models.Skill;
import org.korobochka.equiangular.stores.QuestionStore;
import org.korobochka.equiangular.stores.SkillStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Spark;

import javax.persistence.EntityManager;

import java.util.HashSet;
import java.util.Set;

import static spark.Spark.*;

/**
 * Created by korobochka on 5/15/16.
 */
public class QuestionService {

	private static final Logger log = LoggerFactory.getLogger(QuestionService.class);

	public static void initRoutes() {
		// todo delete
		get("/api/questions/addrandom", (request, response) -> {
			EntityManager entityManager = request.attribute("EM");
			Question question = QuestionStore.createNewQuestion(entityManager,
					"Random title " + System.currentTimeMillis(),
					"Random body " + System.currentTimeMillis());
			for(int i = 0; i < 4; i++) {
				Answer answer = QuestionStore.createAnswer(entityManager, "Answer body " + i + " " + System.currentTimeMillis(), (i == 0));
				QuestionStore.attachAnswer(question, answer);
			}
			QuestionStore.attachSkill(question, SkillStore.getRandomSkill(entityManager));
			return question;
		}, Main.gson::toJson);

		get("/api/questions", (request, response) -> {
			EntityManager entityManager = request.attribute("EM");
			return QuestionStore.getAllQuestions(entityManager);
		}, Main.gson::toJson);

		get("/api/questions/:id", (request, response) -> {
			EntityManager entityManager = request.attribute("EM");
			long id = Long.parseLong(request.params("id"));
			return QuestionStore.getQuestionById(entityManager, id);
		}, Main.gson::toJson);

		post("/api/questions", (request, response) -> {
			EntityManager entityManager = request.attribute("EM");
			Question question = Main.gson.fromJson(request.body(), Question.class);
			Set<Skill> skills = new HashSet<>();
			question.skills.forEach(s -> { skills.add(SkillStore.getSkillByTitle(entityManager, s.title)); });
			question.skills = skills;
			Set<Answer> answers = question.answers;
			question.answers = new HashSet<>();
			answers.forEach(a -> { QuestionStore.attachAnswer(question, QuestionStore.createAnswer(entityManager, a.body, a.isCorrect)); });
			entityManager.persist(question);
			return question;
		}, Main.gson::toJson);

		delete("/api/questions/:id", (request, response) -> {
			EntityManager entityManager = request.attribute("EM");
			long id = Long.parseLong(request.params("id"));
			Question question = QuestionStore.getQuestionById(entityManager, id);
			if(question != null) entityManager.remove(question);
			return null;
		}, Main.gson::toJson);
	}
}
