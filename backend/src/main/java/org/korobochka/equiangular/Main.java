package org.korobochka.equiangular;

import static spark.Spark.*;

/**
 * Created by korobochka on 5/14/16.
 */
public class Main {
	public static void main(String[] args) {
		get("/", (req, res) -> {
			return "Hello from the backend";
		});
	}
}
