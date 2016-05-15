package org.korobochka.equiangular.models;

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

	@ManyToOne(fetch = FetchType.EAGER)
	public Question questions;

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
