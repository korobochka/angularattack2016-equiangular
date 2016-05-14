package org.korobochka.equiangular.models;

import java.util.List;

import javax.persistence.*;

/**
 * Created by lgarswood on 5/14/16.
 */

@Entity
@Table(name="TestUser")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int id;
	public String name;
	public String linkedInToken;
	@ManyToMany
	public List<Skill> skills;
}
