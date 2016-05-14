package org.korobochka.equiangular;

import org.korobochka.equiangular.models.Question;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static spark.Spark.*;

/**
 * Created by lgarswood on 5/14/16.
 */

class TestService {
	private static final Logger log = LoggerFactory.getLogger(TestService.class);

	static void initRoutes() {
		get("/api/test/next_question", (req, res) -> {
			return getNextQuestion();
		}, Main.gson::toJson);
		get("/api/test/submit_answer", (req, res) -> {
			log.info("Saving answer: " + req.body());
			saveAnswer(Main.gson.fromJson(req.body(), Question.class)); // TODO make answer class
			return (Main.gson.toJson("Question saved successfully"));
		});
	}

	private static void saveAnswer(Question question) {
		// TODO implement!
	}

	private static Question getNextQuestion() {
		return new Question();
	}
}
