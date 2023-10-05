var startButton = document.getElementById("startButton");
var answers = document.getElementById("answers");    
var questionText = document.getElementById("questionText");
var questionDiv = document.getElementById("question-div");
    

startButton.addEventListener("click", startQuiz);   
    

function startQuiz() {
    document.getElementById("quiz-div").style.display = "none";
    questionDiv.style.display = "block";
    displayQuestion();
    startTimer();
}



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


    var timerInterval;
    var timeRemaining = 60;
    var timerElement = document.getElementById("timer");

    function startTimer() {
        timerInterval = setInterval(function() {
            timeRemaining--;
            timerElement.textContent = `Time remaining: ${timeRemaining} seconds`;

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                timerElement.textContent = "Time's up!";
            }
        }, 1000);
    }
    
    var nextButton = document.getElementById("nextButton");
   
    nextButton.addEventListener("click", nextQuestion);



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
                timerElement.textContent = "Time's up!";
            }
        }
    }


    var correctAnswers = 0;
var incorrectAnswers = 0;



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