package org.korobochka.equiangular.services;

import org.korobochka.equiangular.Main;
import org.korobochka.equiangular.models.*;

import org.korobochka.equiangular.stores.QuestionStore;
import org.korobochka.equiangular.stores.UserResponseStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Spark;

import javax.persistence.EntityManager;

import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import static org.korobochka.equiangular.services.AuthService.getCurrentUser;
import static spark.Spark.*;

/**
 * Created by lgarswood on 5/14/16.
 */

public class TestService {
	private static final Logger log = LoggerFactory.getLogger(TestService.class);

	public static void initRoutes() {

		Spark.post("/api/test/next_question", (request, response) -> {
			User user = getCurrentUser(request);
			EntityManager entityManager = request.attribute("EM");
			List<Question> questions = QuestionStore.getUnansweredQuestions(entityManager, user);
			Set<Skill> skills = user.skills;
			questions = questions.stream()
					.filter(question -> question.answers != null && question.answers.size() > 1)
					.filter(question -> {
						for(Skill skill : question.skills) {
							if(skills.contains(skill)) return true;
						}
						return false;
					}).collect(Collectors.toList());
			Collections.shuffle(questions, new Random(System.currentTimeMillis())); // todo better
			if(questions.size() < 1) return null;
			Question selected = questions.get(0);
			selected.answers.forEach(answer -> {
				entityManager.detach(answer);
				answer.isCorrect = false;
			});
			return selected;
		}, Main.gson::toJson);

		post("/api/test/submit_answer", (request, response) -> {
			User user = getCurrentUser(request);
			EntityManager entityManager = request.attribute("EM");
			long[] answerIds = Main.gson.fromJson(request.body(), long[].class);
			for(int i = 0; i < answerIds.length; i++) {
				Answer answer = QuestionStore.getAnswerById(entityManager, answerIds[i]);
				UserResponse userResponse = UserResponseStore.recordUserAnswerToQuestion(entityManager, user, answer);
				userResponse.elapsedTime = 10;
			}
			return null;
		}, Main.gson::toJson);
	}
}
