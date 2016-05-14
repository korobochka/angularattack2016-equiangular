package org.korobochka.equiangular.models;

import javax.persistence.*;
import java.util.List;

/**
 * Created by lgarswood on 5/14/16.
 */

@Entity
public class Skill {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int id;
	public String title;
	@ManyToMany
	public List<User> users;
	@ManyToMany
	public List<Question> questions;
}
