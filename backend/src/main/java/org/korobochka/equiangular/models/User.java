package org.korobochka.equiangular.models;

import java.util.Set;

import javax.persistence.*;

/**
 * Created by lgarswood on 5/14/16.
 */

@Entity
@Table(name="TestUser")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public long id;

	public String name;

	@Column(unique = true)
	public String linkedInId;

	@ManyToMany(fetch = FetchType.EAGER)
	public Set<Skill> skills;
}
