package org.korobochka.equiangular.models;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * Created by lgarswood on 5/14/16.
 */
public class User {
	private List<String> calculatedSkills;
	private LinkedHashMap<String, String> tags;
	private List<String> intendedSkills;
	private int id;
	private String name = "";

	public User() {
		calculatedSkills = new ArrayList<String>();
		tags = new LinkedHashMap<String, String>();
		intendedSkills = new ArrayList<String>();
		intendedSkills.add("Eating");
		intendedSkills.add("Sleeping");
		id = 0;
	}

	public List<String> getIntendedSkills() { return intendedSkills; }
	public void setIntendedSkills(List<String> intendedSkills) { this.intendedSkills = intendedSkills; }
	public List<String> getCalculatedSkills() { return calculatedSkills; }
	public void setCalculatedSkills(List<String> calculatedSkills) { this.calculatedSkills = calculatedSkills; }
	public LinkedHashMap<String, String> getTags() { return tags; }
	public void setTags(LinkedHashMap<String, String> tags) { this.tags = tags; }
	public int getId() { return id; }
	public void setId(int id) { this.id = id; }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void addIntendedSkill(String skill) {
		this.intendedSkills.add(skill);
	}

	public void removeIntendedSkill(String selectedSkill) {
		intendedSkills.removeIf(skill -> selectedSkill.equals(skill));
	}
}
