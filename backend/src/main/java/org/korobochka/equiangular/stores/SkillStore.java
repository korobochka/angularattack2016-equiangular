package org.korobochka.equiangular.stores;

import org.korobochka.equiangular.PersistenceUtil;
import org.korobochka.equiangular.models.Skill;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;
import java.util.Random;

/**
 * Created by korobochka on 5/15/16.
 */
public class SkillStore {
	public static Skill getSkillByTitle(EntityManager entityManager, String title) {
		Skill skill = PersistenceUtil.getSingleResult(entityManager
				.createQuery("select s from Skill as s where s.title = :title", Skill.class)
				.setParameter("title", title));
		if(skill == null) {
			skill = new Skill();
			skill.title = title;
			entityManager.persist(skill);
		}
		return skill;
	}

	public static Skill getSkillById(EntityManager entityManager, long id) {
		return entityManager.find(Skill.class, id);
	}

	public static List<Skill> getAllSkills(EntityManager entityManager) {
		return entityManager
				.createQuery("select s from Skill as s", Skill.class)
				.getResultList();
	}

	public static Skill getRandomSkill(EntityManager entityManager) {
		List<Skill> all = getAllSkills(entityManager);
		Collections.shuffle(all, new Random(System.currentTimeMillis()));
		if(all.size() > 0) return all.get(0);
		else return getSkillByTitle(entityManager, "Java");
	}
}
