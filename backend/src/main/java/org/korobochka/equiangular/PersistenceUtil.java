package org.korobochka.equiangular;

import javax.persistence.TypedQuery;
import java.util.List;

/**
 * Created by korobochka on 5/15/16.
 */
public class PersistenceUtil {
	public static <T> T getSingleResult(TypedQuery<T> query) {
		query.setMaxResults(1);
		List<T> list = query.getResultList();
		if (list == null || list.isEmpty()) {
			return null;
		}

		return list.get(0);
	}
}
