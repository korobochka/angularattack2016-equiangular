package org.korobochka.equiangular.apidmodels;

import org.korobochka.equiangular.models.Skill;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by korobochka on 5/15/16.
 */
public class Stats {
	public long answersSubmitted = 0;

	public Map<Skill, SkillResult> skillResults = new HashMap<>();

	public static class SkillResult {
		public long totalAnswers = 0;
		public long correctAnswers = 0;
	}

	public SkillResult getBySkill(Skill s) {
		SkillResult skillResult = skillResults.get(s);
		if(skillResult == null) skillResult = new SkillResult();
		skillResults.put(s, skillResult);
		return skillResult;

	}
}
