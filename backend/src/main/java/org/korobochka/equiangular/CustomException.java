package org.korobochka.equiangular;

/**
 * Created by korobochka on 5/14/16.
 */
public class CustomException extends RuntimeException {
	public CustomException(String msg) {
		super(msg);
	}
	public CustomException(String msg, Throwable reason) {
		super(msg, reason);
	}
}
