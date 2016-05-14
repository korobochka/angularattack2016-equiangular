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
	public int id;
	public String body;
	public boolean isCorrect;
	@ManyToOne
	public Question questions;
}
