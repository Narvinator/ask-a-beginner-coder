// This Script section was organized in chronological order of when I personally completed each part of the page


// I put some of the general ID elements up first and I believe the Start button was the main priority intially

var startButton = document.getElementById("startButton");
var answers = document.getElementById("answers");    
var questionText = document.getElementById("questionText");
var questionDiv = document.getElementById("question-div");
    
// Everything the actual event of clicking is right here stil near the start button ID

startButton.addEventListener("click", startQuiz);   
    

function startQuiz() {
    document.getElementById("quiz-div").style.display = "none";
    questionDiv.style.display = "block";
    displayQuestion();
    startTimer();
}

// The function to get the project moving start with well, the startQuiz function.


// The next most important part of the assignment the questions for the quiz.
var quizQuestions = [
    {
        question: "Which HTML element will have most of your text?",
        options: ["Body", "Head", "Footer", "Nav"],
        correctAnswer: "body"
    },
   
];

quizQuestions.push({
    question: "What is drawn up or created before you even start any project?",
    options: ["Draft", "Mock-up", "Mock-Draft", "Draw-up" ],
    correctAnswer: "mock-up"
});

// .push was used for subsequent questions to always be in order, at the end, and next.

// The currentQuestionIndex was created for use in the for loop to change to every question.

    var currentQuestionIndex = 0;

    function displayQuestion() {
        var currentQuestion = quizQuestions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        answers.innerHTML = "";

        for (var option of currentQuestion.options) {
            var listEl = document.createElement("li");
            var radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = "q" + (currentQuestionIndex + 1);
            radioInput.value = option.toLowerCase();
            listEl.appendChild(radioInput);
            listEl.appendChild(document.createTextNode(option));
            answers.appendChild(listEl);
        }
    }


// The timer elements are kept closely together and the increment of 1000 will represent 1 second of the 60 it has to count down.

    var timerInterval;
    var timeRemaining = 60;
    var timerElement = document.getElementById("timer");

    function startTimer() {
        timerInterval = setInterval(function() {
            timeRemaining--;
            timerElement.textContent = `Time remaining: ${timeRemaining} seconds`;

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                timerElement.textContent = "Done!";
            }
        }, 1000);
    }
    
    var nextButton = document.getElementById("nextButton");
   
    nextButton.addEventListener("click", nextQuestion);


// The very long next question function will force a selection, manage the correct and incorrect questions, give the time penalty of
// 10 seconds, give you several of the messages on the quiz done screen.

    function nextQuestion() {
        var selectedOption = document.querySelector("input[name='q" + (currentQuestionIndex + 1) + "']:checked");

        if (!selectedOption) {
            alert("No option selected.");
            return;
        }

        var userAnswer = selectedOption.value;
        var correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

        if (userAnswer === correctAnswer) {
            correctAnswers++;
        } else {
            timeRemaining -= 10;
            if (timeRemaining < 0) {
                timeRemaining = 0;
            }
            incorrectAnswers++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
        } else {
            if (timerInterval) {
                clearInterval(timerInterval);
            }

            if (timeRemaining > 0) {
                timerElement.textContent = `Game Over' Time remaining: ${timeRemaining} seconds`;

                var resultText = document.getElementById("resultText");
                resultText.textContent = `Your score: ${correctAnswers} correct, ${incorrectAnswers} incorrect.`;

                var timeRemainingText = document.getElementById("timeRemainingText");
                timeRemainingText.textContent = `Time remaining: ${timeRemaining} seconds`;

                document.getElementById("question-div").style.display = "none";
                document.getElementById("game-over").style.display = "block";
            } else {
                timerElement.textContent = "Done!";
            }
        }
    }

    // The vars here set to 0 so that they can be counted in the final message and the scores page

    var correctAnswers = 0;
var incorrectAnswers = 0;

// These are used self-explanotory, but well the initial input is where it can be stored on the page

var saveScoreButton = document.getElementById("saveScoreButton");
var initialsInput = document.getElementById("initials");


saveScoreButton.addEventListener("click", function() {
    var userInitials = initialsInput.value.trim();
    if (userInitials === "") {
        alert("Enter your initials.");
        return;
    };


scores.push({ initials: userInitials, correct: correctAnswers, incorrect: incorrectAnswers}); 

initialsInput.value = "";

alert(`Score stored for ${userInitials}: ${correctAnswers} correct, ${incorrectAnswers} incorrect.`);}); 

var showScoresButton = document.getElementById("showScoresButton");

// This showsScoreButton and section was created because I thought that the scores would be availible in local storage,
// but it does allow the stores to be saved on the webpage for easier access to "non" coders. 


showScoresButton.addEventListener("click", function() {
    document.getElementById("quiz-div").style.display = "none";
    document.getElementById("question-div").style.display = "none";
    document.getElementById("game-over").style.display = "none";
    document.getElementById("past-scores").style.display = "block";
    displayScores();
});

var scores = [];


function displayScores() {
    var scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = "";
    scores.forEach((score, index) => {
        var listEl = document.createElement("li");
        listEl.textContent = `Score ${index + 1}: ${score.initials} - ${score.correct} correct, ${score.incorrect} incorrect`;
        scoreList.appendChild(listEl);
    });

}