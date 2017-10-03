// Functions to run when the page loads.
// ====================================================================
window.onload = function () {
	$("#startButton").click(startGame);
};

// Variables
// ====================================================================

// Start time of 30 seconds for each question.
var time = 30;
// Holds a variable for the time interval between questions.
var timer;
// Keep track of the index of the current question displayed.
var currentQuestion = 0;

// Create an array of objects to hold questions, choices, and answers for the game.
var questions = [{
	question: "How many new computer viruses appear each month?",
	choices: ["5,000", "100,000", "1,000", "2,500"],
	answer: "5,000"
}, {
	question: "What is the longest word you can type using only one row of letters on the keyboard?",
	choices: ["Qwerty", "Typewriter", "Computer", "Javascript"],
	answer: "Typewriter"
}];

// Variables to hold number of answers right, wrong, and unanswered.
var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;
var answer;

// Functions
// ====================================================================

function startGame() {
	// Remove the div with the start button and get the first question.
	$("#startDiv").remove();
	getQuestion();
}

function displayChoices() {
	// Hide the display message showing whether answer is right or wrong.
	// This will be empty on the first go around, but needs to be hidden on subsequent intervals.
	$("#message").hide();

	// Display question.
	$("#question").css("display", "block");
	$("#question").html(questions[currentQuestion].question);

	// Display answer choices.
	$("#choices").css("display", "block");
	// Loop thru to display choices.
	var choiceLetters = ["A", "B", "C", "D"];
	for (i = 0; i < 4; i++){
		$(".choice" + choiceLetters[i]).html(questions[currentQuestion].choices[i]);
	}
}

// Function to show message displaying whether the user got the question right or wrong.
// Hides other divs so just the message is displayed.
function showMessage() {
	$("#message").show();
	$("#question").hide();
	$("#choices").hide();
	$("#timeDiv").hide();
}

function nextQuestion() {
	// Remove on click event handler.
	$(".choice").off();
	// // Move to next question.
	// currentQuestion++;
	// // Stop the timer.
	// clearInterval(timer);
	// Reset the time to 30 seconds.
	time = 30;
	// Get the next question after 4 seconds.
	setTimeout(getQuestion, 4000);
}

function getQuestion() {
	// Set initial time of 30 in HTML so there is no delay in the decrement function between questions.
	setTime();
	// Run the decrement function every 1 second for a running clock.
	startTimer();

	// Display the div holding the time.
	$("#timeDiv").css("display", "block");

	// Function to display question and answer choices.
	displayChoices();

	// Get answer on click.
	$(".choice").one("click", function() {
		answer = $(this).text();

		// Compare the selected answer to the correct answer.
		// If they match, add one to correct answers total and show a message letting the user know they were right.
		if (answer === questions[currentQuestion].answer) {
			// Stop the timer.
			clearInterval(timer);
			correctAnswers++;
			
			// Function shows message while hiding the other divs.
			if (currentQuestion === questions.length - 1) {
				showMessage();
				$("#message").html("Correct!<br>Preparing your results...");
				// Move to next question.
				currentQuestion++;
			}
			else{
				showMessage();
				$("#message").html("Correct!<br>Get ready for the next question!");
				// Move to next question.
				currentQuestion++;
			}
		}
		// If they don't match, add one to the wrong answers total and show a message letting the user know they were wrong.
		else {
			// Stop the timer.
			clearInterval(timer);
			wrongAnswers++;

			// Function shows message while hiding the other divs.
			if (currentQuestion === questions.length - 1) {
				showMessage();
				$("#message").html("Wrong. The correct answer was " + questions[currentQuestion].answer + ".<br>Preparing your results...");
				// Move to next question.
				currentQuestion++;
			}
			else{
				showMessage();
				$("#message").html("Wrong. The correct answer was " + questions[currentQuestion].answer + ".<br>Get ready for the next question!");
				// Move to next question.
				currentQuestion++;
			}			
		}

		if (currentQuestion === questions.length) {
			setTimeout(displayResults, 4000);
		}
		else {
			nextQuestion();
		}

	});
}

function displayResults() {
	// Show results div with updated user stats.
	$("#results").show();
	$("#message").html("Thanks for playing, here are your results!");
	$("#correctAnswers").text(correctAnswers);
	$("#wrongAnswers").text(wrongAnswers);
	$("#unanswered").text(unanswered);
	// Reset the game.
	$("#playAgain").click(resetGame);
}

// Function resets all values to their original settings and starts the game over when the user clicks to play again.
function resetGame() {
	// Hide the previous game's results.
	$("#results").hide();
	// Reset values.
	// Remove on click event handler.
	$(".choice").off();
	time = 30;
	correctAnswers = 0;
	wrongAnswers = 0;
	unanswered = 0;	
	currentQuestion = 0;
	// Get first question again.
	getQuestion();
}


// Timer
// ====================================================================
// HTML to display the clock.
function setTime() {
	$("#timeDiv").html(`<p>Time left: <span id="timeDisplay">${time}</span> seconds...</p>`);
}

function startTimer() {
	timer = setInterval(decrement, 1000);
}

function timesUp() {
	// Stop the timer.
	clearInterval(timer);
	// Add one to the unanswered score since the user did not answer in time.
	unanswered++;
	// Show a message displaying the correct answer.
	showMessage();
	$("#message").html("Times Up!<br>The correct answer was " + questions[currentQuestion].answer + ".");
	// Move to next question.
	currentQuestion++;
	// If there are no more questions, show the results after 4 seconds.
	if(currentQuestion === questions.length) {
		setTimeout(displayResults, 4000);
	}
	// If there are more questions, go to the next question after 4 seconds.
	else {
		// setTimeout(nextQuestion, 4000);
		nextQuestion();
	}
}

function decrement() {
	// Decrease time by 1.
	time--;
	// Update the HTML with the current time.
	setTime();
	// If time runs out, run the function to see if there are more questions left.
	if (time <= 0) {
		timesUp();
	}
}