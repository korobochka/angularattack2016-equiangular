package org.korobochka.equiangular.models;

import javax.persistence.*;

/**
 * Created by lgarswood on 5/14/16.
 */

@Entity
public class UserResponse {
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	public int id;
	@ManyToOne
	public User user;
	@ManyToOne
	public Question question;
	@ManyToOne
	public Answer answer;
	public long startTime; // start timestamp
	public long endTime; // end timestamp
}
