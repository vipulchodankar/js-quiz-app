const API = 'https://opentdb.com/api.php?amount=10&type=multiple';

let user = {
    score: 0
}
let questions;
let numberOfQuestions;

fetch(API)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        questions = data;
        numberOfQuestions = questions.results.length;
        console.log("Connection with API established.");
    });