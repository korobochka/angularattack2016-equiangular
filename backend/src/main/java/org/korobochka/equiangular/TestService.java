package org.korobochka.equiangular;

import org.korobochka.equiangular.models.Question;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static spark.Spark.*;
import com.google.gson.Gson;

/**
 * Created by lgarswood on 5/14/16.
 */

public class TestService {
	private static final Logger log = LoggerFactory.getLogger(TestService.class);

	public static void initRoutes() {
		get("/api/test/next_question", (req, res) -> {
			try {
				return (new Gson().toJson(getNextQuestion()));
			}
			catch (CustomException exception) {
				return exception.getMessage();
			}
		});

		get("/api/test/submit_answer", (req, res) -> {
			try {
				saveQuestion(new Gson().fromJson(req.body(), Question.class));
				return (new Gson().toJson("Question saved successfully"));
			}
			catch (Exception exception) {
				return (new Gson().toJson("Question could not be saved"));
			}
		});
	}

	public static void saveQuestion(Question question) throws CustomException {
		// TODO implement!
	}

	public static Question getNextQuestion() throws CustomException {
		try {
			return new Question();
		}
		catch (Exception exception) {
			throw new CustomException("No more questions could be obtained");
		}
	}
}
