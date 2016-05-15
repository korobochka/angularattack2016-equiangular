package org.korobochka.equiangular.stores;

import org.korobochka.equiangular.PersistenceUtil;
import org.korobochka.equiangular.models.Answer;
import org.korobochka.equiangular.models.Question;
import org.korobochka.equiangular.models.User;
import org.korobochka.equiangular.models.UserResponse;

import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by korobochka on 5/15/16.
 */
public class UserResponseStore {
	public static UserResponse getOrCreateResponse(EntityManager entityManager, User user, Question question) {
		UserResponse response = PersistenceUtil.getSingleResult(entityManager
				.createQuery("select r from UserResponse as r where r.user = :user and r.question = :question", UserResponse.class)
				.setParameter("user", user)
				.setParameter("question", question));
		if(response == null) {
			response = new UserResponse();
			response.user = user;
			response.question = question;
			entityManager.persist(response);
		}
		return response;
	}

	public static UserResponse recordUserAnswerToQuestion(EntityManager entityManager, User user, Answer answer) {
		UserResponse response = getOrCreateResponse(entityManager, user, answer.question);
		response.answer = answer;
		return response;
	}

	public static List<UserResponse> getAllUserResponses(EntityManager entityManager, User user) {
		return entityManager
				.createQuery("select r from UserResponse as r where r.user = :user", UserResponse.class)
				.setParameter("user", user).getResultList();
	}
}
