package org.korobochka.equiangular.models;

import org.korobochka.equiangular.Exclude;

import javax.persistence.*;
import java.util.List;

/**
 * Created by lgarswood on 5/14/16.
 */

@Entity
public class Answer {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public long id;

	public String body;

	public boolean isCorrect;

	@Exclude
	@ManyToOne(fetch = FetchType.EAGER)
	public Question question;

	@Exclude
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "answer", cascade = CascadeType.REMOVE)
	public List<UserResponse> userResponses;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		Answer answer = (Answer) o;

		return id == answer.id;

	}

	@Override
	public int hashCode() {
		return (int) (id ^ (id >>> 32));
	}
}
