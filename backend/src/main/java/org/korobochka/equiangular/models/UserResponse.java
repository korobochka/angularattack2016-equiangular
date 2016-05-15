package org.korobochka.equiangular.models;

import javax.persistence.*;

/**
 * Created by lgarswood on 5/14/16.
 */

@Entity
public class UserResponse {
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	public long id;

	@ManyToOne(fetch = FetchType.EAGER)
	public User user;

	@ManyToOne(fetch = FetchType.EAGER)
	public Question question;

	@ManyToOne(fetch = FetchType.EAGER)
	public Answer answer;

	public long elapsedTime; // start timestamp
}
