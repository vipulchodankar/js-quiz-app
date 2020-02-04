let API = "https://opentdb.com/api.php?amount=5&type=multiple";

let user = { score: 0 };
let questions;
let numberOfQuestions;
let currentQuestion = 0;
let answers;
let wrongAnswer = true;
let answered = 0;

// Dom Elements
let questionNumberDisplay = document.querySelector("#questionNumberDisplay");
let questionDisplay = document.querySelector("#questionDisplay");
let scoreDisplay = document.querySelector("#scoreDisplay");
let options = document.querySelectorAll(".mcq-options");
let resetButton = document.querySelector("#resetButton");
let passButton = document.querySelector("#passButton");
let submitButton = document.querySelector("#submitButton");
let categorySelect = document.querySelector("#categorySelect");
let numberOfQuestionsInput = document.querySelector("#numberOfQuestionsInput");
let difficultySelect = document.querySelector("#difficultySelect");

function init() {
    initButtons();
    reset();
}

function toggleSubmitButton() {
    submitButton.classList.toggle("d-none");
}

function reset() {
    user.score = 0;
    currentQuestion = 0;
    wrongAnswer = false;
    answered = 0;
    submitButton.classList.remove("d-none");

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
    options.forEach(option => {
        option.classList.remove("btn-info");
        option.classList.remove("btn-warning");
    })
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

    categorySelect.addEventListener("change", () => {
        console.log("You chose category: " + categorySelect.value);
        if (categorySelect.value >= 9 && categorySelect.value <= 32)
            API = API + `&category=${categorySelect.value}`;
        reset();
    });

    numberOfQuestionsInput.addEventListener("change", () => {
        console.log(`You chose to answer: + ${numberOfQuestionsInput.value} questions.`);
        API = API.replace(/amount=(\d?\d)/, `amount=${numberOfQuestionsInput.value}`);
        reset();
    });

    difficultySelect.addEventListener("change", () => {
        console.log("You chose difficulty: " + difficultySelect.value);
        if (difficultySelect.value == "easy" || difficultySelect.value == "medium" || difficultySelect.value == "hard") {
            API = API + `&difficulty=${difficultySelect.value}`;
        }
        reset();
    });
}

function update() {
    questionNumberDisplay.textContent = currentQuestion + 1;
    scoreDisplay.textContent = user.score;
    questionDisplay.innerHTML = questions.results[currentQuestion].question;
    answers = questions.results[currentQuestion].incorrect_answers;
    answers.push(questions.results[currentQuestion].correct_answer);
    shuffleArray(answers);
    resetButtons();

    if (submitButton.classList.contains("d-none")) {
        submitButton.classList.remove("d-none");
        passButton.innerHTML = `<i class="fas fa-forward"></i> Pass`;
    }

    wrongAnswer = true;

    options.forEach((option, index) => option.innerHTML = answers[index]);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function nextQuestion() {
    if (currentQuestion < numberOfQuestions - 1)
        currentQuestion++;

    else {
        alert(`The End!
        \nYour score: ${user.score}
        \nYou answered ${answered} ` + ((difficultySelect.value == "Choose Difficulty" || difficultySelect.value == 0) ? 'mixed' : difficultySelect.value) + ` questions.
        \nHope you had fun ;)`);
        reset();
    }
};

function checkAnswer() {
    options.forEach((option, index) => {
        if (option.classList.contains("btn-info") && option.textContent == questions.results[currentQuestion].correct_answer) {
            console.log("CORRECT ANSWER!");
            user.score += 5;
            wrongAnswer = false;
            answered++;
        }
    });

    if (wrongAnswer == true) {
        console.log("WRONG ANSWER!");
        toggleSubmitButton();
        passButton.innerHTML = `<i class="fas fa-forward"></i> Next`;
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

init();