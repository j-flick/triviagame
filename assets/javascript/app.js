// Pseudo-code TO DO:
// When answer is clicked, move to next question.
// If no answer is selected, add one to unanswered and move to next question.
// Reset timer, question, and choices.
// When there are no more questions only show results.
// Ask to play again, and reset game.

// Functions to run when the page loads.
// ====================================================================
window.onload = function () {
	$("#startButton").click(playGame);
	$("#startButton").click(startTimer);
};

// Variables
// ====================================================================

// Start time of 30 seconds for each question.
var time = 30;
// Holds interval ID when startTimer function is executed.
var intervalId;

// Create an object to hold questions for the game.
var questions = {
	q1: ["How many new computer viruses are appear each month?", "5,000", "100,000", "1,000", "2,500", "5,000"],
	q2: ["What is the longest word you can type using only one row of letters on the keyboard?", "Typewriter", "Qwerty", "Cascading", "Javascript", "Typewriter"]
};

// Variables to hold number of answers right and wrong.
var correctAnswers = 0;
var wrongAnswers = 0;
var answer;

// Functions
// ====================================================================

function playGame() {
	// Remove the div with the start button.
	$("#startDiv").remove();

	// Show the time remaining.
	$("#timeDiv").show();

	// Display question and answer choices.
	$("#question").html(questions.q1[0]);

	$("#choices").css("display", "block");

	// Loop thru to display choices.
	var choiceLetters = ["A", "B", "C", "D"];

	for (i = 0; i <= 4; i++){
		$(".choice" + choiceLetters[i]).html(questions.q1[i + 1]);
	}

	// Get answer on click.
	$(".choice").on("click", function() {
		answer = $(this).text();
		console.log(answer);

		// Compare the selected answer to the correct answer.
		// If they match, add one to correct answers total.
		if (answer === questions.q1[5]) {
			console.log("Correct");
			correctAnswers++;
			$("#correctAnswers").text(correctAnswers);
			$("#message").html("Correct!");
		}
		// If they don't match, add one to the wrong answers total.
		else {
			console.log("Wrong");
			wrongAnswers++;
			$("#wrongAnswers").text(wrongAnswers);
			$("#message").html("Wrong. The correct answer was " + questions.q1[5] + ".");
		}

		displayResults();

	});

}

function displayResults() {
	$("#results").show();
}


// Timer
// ====================================================================
function startTimer() {
	intervalId = setInterval(decrement, 1000);
}

function decrement() {
	// Decrease time by 1.
	time--;

	// Update the HTML with the current time.
	$("#timeDisplay").html(time);

	// If the time runs out, stop the timer and display an alert.
	if(time === 0) {
		alert("Times Up!");
		clearInterval(intervalId);
	}
}