const API = 'https://opentdb.com/api.php?amount=10&type=multiple';

let user = { score: 0 };
let questions;
let numberOfQuestions;
let currentQuestion = 0;
let answers;

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

function initButtons() {
    options.forEach((option, index) => option.addEventListener("click", () => {
        options[0].classList.remove("btn-success");
        options[1].classList.remove("btn-success");
        options[2].classList.remove("btn-success");
        options[3].classList.remove("btn-success");
        option.classList.add("btn-success");
    }));

    passButton.addEventListener("click", () => {
        nextQuestion();
        update();
    });
}

function update() {
    questionNumberDisplay.textContent = currentQuestion + 1;
    scoreDisplay.textContent = user.score;
    questionDisplay.textContent = questions.results[currentQuestion].question;
    answers = questions.results[currentQuestion].incorrect_answers;
    answers.push(questions.results[currentQuestion].correct_answer);
    shuffleArray(answers);

    options.forEach((option, index) => option.textContent = answers[index]);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function nextQuestion() { if (currentQuestion < numberOfQuestions) currentQuestion++ };

init();