package org.korobochka.equiangular.models;

import javax.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
public class Question {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int id;
	public String title;
	public String body;
	public float estimatedComplexity;
	public long timeLimit; // time limit in seconds
	@ManyToMany
	public List<Skill> skills;
	@OneToMany
	public List<Answer> answers;
}
