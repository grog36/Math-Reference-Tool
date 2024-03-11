//Gregory Ecklund
//March 2024

//VARIABLE DECLARATIONS
const timerList = [
    document.getElementById("minutesLabel"),
    document.getElementById("minutes"),
    document.getElementById("secondsLabel"),
    document.getElementById("seconds")
];
var score = 0;
var possibleQuestionsList = [];
var possibleAnswersList = [];
var questionCount = 0;
var currentQuestion;
var currentAnswer;

//STARTUP FUNCTION
function start() {
    //SETS UP LIST DEPENDING ON CHOSEN GAMETYPE
    switch (document.getElementById("gametypeSelect").value) {
        case "Squares of 2 Digit Numbers":
            for (let i = 10; i < 100; i++) {
                possibleQuestionsList.push(i);
                possibleAnswersList.push(i*i);
            }
            break;
        case "Squares of 3 Digit Numbers":
            for (let i = 100; i < 1000; i++) {
                possibleQuestionsList.push(i);
                possibleAnswersList.push(i*i);
            }
            break;
        case "Square Roots of 3 & 4 Digit Numbers":
            for (let i = 10; i < 100; i++) {
                possibleQuestionsList.push(i*i);
                possibleAnswersList.push(i);
            }
            break;
        case "Square Roots of 5 & 6 Digit Numbers":
            for (let i = 100; i < 1000; i++) {
                possibleQuestionsList.push(i*i);
                possibleAnswersList.push(i);
            }
            break;
    }
    questionCount = possibleQuestionsList.length;

    //SETS DOCUMENT ELEMENT VISIBILITIES
    for (let element of timerList) {
        element.style.visibility = "visible";
    }
    document.getElementById("questions").style.visibility = "visible";
    document.getElementById("input").style.visibility = "visible";
    document.getElementById("input").focus();
    document.getElementById("tips").style.visibility = "visible";

    //REMOVES START BUTTON DIV
    document.getElementById("startButtonAndSettingsDiv").remove();

    //SETS UP QUESTIONS AND TIMER
    timerContinue();
    nextQuestion();


}

//SETS UP THE NEXT QUESTION
function nextQuestion() {
    if (possibleQuestionsList.length === 0) {
        gameOver();
    }
    else {
        let currentIndex = randomNumber(0, (possibleQuestionsList.length - 1));
        currentQuestion = possibleQuestionsList[currentIndex];
        currentAnswer = possibleAnswersList[currentIndex];
        possibleQuestionsList.splice(currentIndex, 1);
        possibleAnswersList.splice(currentIndex, 1);
        document.getElementById("input").value = "";
        document.getElementById("questions").innerHTML = currentQuestion;
    }
}

//CHECKS THE INPUT FOR THE ANSWER
function checkAnswer() {
    //SETS UP VARIABLES FOR CHECKING
    let input = document.getElementById("input").value;
    let guess = input.replace(/\s/g, '');
    guess = guess.replace(/,/g, '');

    //CHECKS IF THE USER WANTED TO QUIT
    if (input === "END") {
        gameOver();
    }

    if (guess == currentAnswer) {
        score++;
        nextQuestion();
    }
}

//DISPLAYS WIN|LOSE SCREEN
function gameOver() {
    //VISIBILITY OPTIONS
    document.getElementById("input").style.visibility = "hidden";
    document.getElementById("retryButton").style.visibility = "visible";
    document.getElementById("tips").style.visibility = "hidden";

    //STOPS TIMER
    stopTimer();

    //CHECKS AND DISPLAYS WHETHER THE USER WON OR LOST
    if (score == questionCount) {
        document.getElementById("questions").innerHTML = `YOU WIN! (${score} / ${questionCount})`;
        document.body.style.background = "green";
        document.getElementById("retryButton").style.backgroundColor = "lightgreen";
    }
    else {
        let loseText = `YOU LOSE! The answer was ${currentAnswer}.`;
        loseText += `(${score} / ${questionCount})`;
        document.body.style.background = "red";
        document.getElementById("retryButton").style.backgroundColor = "crimson";
        document.getElementById("questions").innerHTML = loseText;
    }
}

//RETRY FUNCTION
function retry() {
    location.reload();
}

//TIMER SHENANIGANS
var t;
var seconds = 0;
var minutes = 0;
function timer() {
    seconds++;
    if (seconds >= 60) {
        minutes = minutes + 1;
        seconds = seconds - 60;
    }
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    timerContinue();
}
function timerContinue() {
   t = setTimeout(timer, 1000);
}
function stopTimer() {
    clearTimeout(t);
}

//RANDOM NUMBER FUNCTION
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}