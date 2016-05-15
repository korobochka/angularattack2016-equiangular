package org.korobochka.equiangular.stores;

import org.korobochka.equiangular.PersistenceUtil;
import org.korobochka.equiangular.models.User;

import javax.persistence.EntityManager;
import java.util.Collections;

/**
 * Created by korobochka on 5/15/16.
 */
public class UserStore {
	public static User getUserByLiId(EntityManager entityManager, String LIId) {
		User user = PersistenceUtil.getSingleResult(entityManager
				.createQuery("select u from User as u where u.linkedInId = :LIId", User.class)
				.setParameter("LIId", LIId));
		if(user == null) {
			user = new User();
			user.linkedInId = LIId;
			user.skills = Collections.emptySet();
			entityManager.persist(user);
		}
		return user;
	}

	public static User getUserById(EntityManager entityManager, long id) {
		return entityManager.find(User.class, id);
	}
}
