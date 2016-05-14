package org.korobochka.equiangular.models;

import java.util.List;
import java.util.ArrayList;

public class Question {
	private String title;
	private String body;
	private List<String> tags;
	private float estimatedComplexity;
	private float calculatedComplexity;
	private String answerBody;
	private String correctAnswer;
	private long timeLimit; // time limit in seconds

	public Question() {
		title = "lsadfjk";
		body = "lsadfjk";
		tags = new ArrayList();
		tags.add("laadfljk");
		tags.add("ldjfalasdfj");
		estimatedComplexity = 1;
		calculatedComplexity = 1;
		answerBody = "lsadfjk";
		correctAnswer = "lsadfjk";
		timeLimit = 1000;
	}

	public String getTitle() { return title; }
	public void setTitle(String title) { this.title = title; }
	public String getBody() { return body; }
	public void setBody(String body) { this.body = body; }
	public List<String> getTags() { return tags; }
	public void setTags(List<String> tags) { this.tags = tags; }
	public float getEstimatedComplexity() { return estimatedComplexity; }
	public void setEstimatedComplexity(float estimatedComplexity) { this.estimatedComplexity = estimatedComplexity; }
	public float getCalculatedComplexity() { return calculatedComplexity; }
	public void setCalculatedComplexity(float calculatedComplexity) { this.calculatedComplexity = calculatedComplexity; }
	public String getAnswerBody() { return answerBody; }
	public void setAnswerBody(String answerBody) { this.answerBody = answerBody; }
	public String getCorrectAnswer() { return correctAnswer; }
	public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
	public long getTimeLimit() { return timeLimit; }
	public void setTimeLimit(long timeLimit) { this.timeLimit = timeLimit; }
}
