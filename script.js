const API = 'https://opentdb.com/api.php?amount=10&type=multiple';

let user = { score: 0 };
let questions;
let numberOfQuestions;
let currentQuestion = 0;
let answers;
let wrongAnswer = true;
let answered = false;

// Dom Elements
let questionNumberDisplay = document.querySelector("#questionNumberDisplay");
let questionDisplay = document.querySelector("#questionDisplay");
let scoreDisplay = document.querySelector("#scoreDisplay");
let options = document.querySelectorAll(".mcq-options");
let resetButton = document.querySelector("#resetButton");
let passButton = document.querySelector("#passButton");
let submitButton = document.querySelector("#submitButton");

function init() {
    initButtons();
    reset();
}

function reset() {
    user.score = 0;
    currentQuestion = 0;
    wrongAnswer = false;
    answered = false;

    fetch(API)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            questions = data;
            numberOfQuestions = questions.results.length;
            console.log("Connection with API established.");
            update();
        });
}

function resetButtons() {
    options[0].classList.remove("btn-info");
    options[0].classList.remove("btn-warning");
    options[1].classList.remove("btn-info");
    options[1].classList.remove("btn-warning");
    options[2].classList.remove("btn-info");
    options[2].classList.remove("btn-warning");
    options[3].classList.remove("btn-info");
    options[3].classList.remove("btn-warning");
}

function initButtons() {
    options.forEach((option, index) => option.addEventListener("click", () => {
        resetButtons();
        option.classList.add("btn-info");
    }));

    passButton.addEventListener("click", () => {
        nextQuestion();
        update();
    });

    resetButton.addEventListener("click", () => reset());

    submitButton.addEventListener("click", () => checkAnswer());

}

function update() {
    questionNumberDisplay.textContent = currentQuestion + 1;
    scoreDisplay.textContent = user.score;
    questionDisplay.innerHTML = questions.results[currentQuestion].question;
    answers = questions.results[currentQuestion].incorrect_answers;
    answers.push(questions.results[currentQuestion].correct_answer);
    shuffleArray(answers);
    resetButtons();

    wrongAnswer = true;
    answered = false;

    options.forEach((option, index) => option.innerHTML = answers[index]);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function nextQuestion() { if (currentQuestion < numberOfQuestions) currentQuestion++ };

function checkAnswer() {
    options.forEach((option, index) => {
        if (option.classList.contains("btn-info") && option.textContent == questions.results[currentQuestion].correct_answer) {
            console.log("CORRECT ANSWER!");
            // option.classList.add("btn-success");
            user.score++;
            wrongAnswer = false;
            answered = true
        }
    });

    if (wrongAnswer == true) {
        console.log("WRONG ANSWER!");
        options.forEach((option, index) => {
            if (option.textContent == questions.results[currentQuestion].correct_answer) {
                option.classList.add("btn-warning");
            }
        });
    } else {
        nextQuestion();
        update();
    }
}

// function sleep(milliseconds) {
//     const date = Date.now();
//     let currentDate = null;
//     do {
//         currentDate = Date.now();
//     } while (currentDate - date < milliseconds);
// }

init();