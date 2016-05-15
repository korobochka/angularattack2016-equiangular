package org.korobochka.equiangular.stores;

import org.korobochka.equiangular.models.Answer;
import org.korobochka.equiangular.models.Question;
import org.korobochka.equiangular.models.Skill;
import org.korobochka.equiangular.models.User;

import javax.persistence.EntityManager;
import java.util.HashSet;
import java.util.List;

/**
 * Created by korobochka on 5/15/16.
 */
public class QuestionStore {
	public static Question getQuestionById(EntityManager entityManager, long id) {
		return entityManager.find(Question.class, id);
	}

	public static List<Question> getAllQuestions(EntityManager entityManager) {
		return entityManager
				.createQuery("select q from Question as q", Question.class)
				.getResultList();
	}

	public static List<Question> getUnansweredQuestions(EntityManager entityManager, User user) {
		return entityManager
				.createQuery("select q from Question as q where not exists " +
						"(select 1 from UserResponse a where a.question = q and a.user = :user)", Question.class)
				.setParameter("user", user)
				.getResultList();
	}


	public static Question createNewQuestion(EntityManager entityManager, String title, String body) {
		Question question = new Question();
		question.title = title;
		question.body = body;
		entityManager.persist(question);
		return question;
	}

	public static Question attachSkill(Question question, Skill skill) {
		if(question.skills == null) question.skills = new HashSet<>();
		question.skills.add(skill);
		return question;
	}

	public static Answer createAnswerAndAttach(EntityManager entityManager, String body, boolean correct, Question question) {
		Answer answer = new Answer();
		answer.body = body;
		answer.isCorrect = correct;
		if(question.answers == null) question.answers = new HashSet<>();
		answer.question = question;
		question.answers.add(answer);
		entityManager.persist(answer);
		return answer;
	}

	public static Answer getAnswerById(EntityManager entityManager, long id) {
		return entityManager.find(Answer.class, id);
	}
}
