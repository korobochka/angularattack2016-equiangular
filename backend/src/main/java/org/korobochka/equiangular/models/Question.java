package org.korobochka.equiangular.models;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class Question {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public long id;

	public String title;

	public String body;

	public float estimatedComplexity;

	@Column(nullable = true)
	public long timeLimit; // time limit in seconds

	@ManyToMany(fetch = FetchType.EAGER)
	public Set<Skill> skills;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "question", cascade = CascadeType.REMOVE)
	public Set<Answer> answers;
}
