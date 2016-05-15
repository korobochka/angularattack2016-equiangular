package org.korobochka.equiangular.services;

import org.korobochka.equiangular.Main;
import org.korobochka.equiangular.models.Question;

import org.korobochka.equiangular.models.User;
import org.korobochka.equiangular.stores.QuestionStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Spark;

import javax.persistence.EntityManager;

import java.util.Collections;
import java.util.List;
import java.util.Random;
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
			//User user = getCurrentUser(request);
			EntityManager entityManager = request.attribute("EM");
			List<Question> questions = QuestionStore.getAllQuestions(entityManager);
			questions = questions.stream()
					.filter(question -> question.answers != null && question.answers.size() > 1)
					.map(question -> {
						entityManager.detach(question);
						question.answers.forEach(answer -> answer.isCorrect = false);
						return question;
					}).collect(Collectors.toList());
			Collections.shuffle(questions, new Random(System.currentTimeMillis())); // todo better
			return questions.size() > 0 ? questions.get(0) : null;
		}, Main.gson::toJson);

		post("/api/test/submit_answer", (request, response) -> {
			User user = getCurrentUser(request);
			EntityManager entityManager = request.attribute("EM");
			// todo
			return "Question saved successfully";
		}, Main.gson::toJson);
	}
}
