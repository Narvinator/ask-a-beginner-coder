

var startButton = document.getElementById("startButton");
var questionDiv= document.getElementById("question-div");
var questionText = document.getElementById("questionText");
var answers = document.getElementById("answers");


startButton.addEventListener("click", startQuiz);


function startQuiz() {
    document.getElementById("question-div");
    showQuestion();
    startTimer();
}



var quizQuestions = [
    {
        question: "Which HTML element will have most of your text?",
        options: ["Body", "Head", "Footer", "Nav"],
        correctAnswer: "Body"
    },
   
];

quizQuestions.push({
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter"],
    correctAnswer: "mars"
});


var currentQuestionIndex = 0;


function showQuestion(){
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answers.innerHTML = "";

    for (var option of currentQuestion.options) {
        var listEl = document.createElement("li");
        var radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "q" + (currentQuestionIndex + 1);
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
        
        if (timeRemaining <=0) {
            clearInterval(timerInterval);
            timerElement.textcontent = "Time's up!";
        }
    }, 1000);
}


nextButton.addEventListener("click", nextQuestion);

function nextQuestion() {
    const selectedOption = document.querySelector("input[name='q" + (currentQuestionIndex + 1) + "']:checked");

    if (!selectedOption) {
        alert("No option selected");
        return;
    }

    const userAnswer = selectedOption.value;
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    if (userAnswer === correctAnswer) {
       
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        
        questionContainer.innerHTML = "<h2>Game Over</h2>";
    }
}
