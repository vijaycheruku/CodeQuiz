//Questions initialsed as an array of objects
const Questions = [
    {
        que: 'Commonly used data types DO NOT include: ',
        options: ["Strings", "Booleans", "Alerts", "Numbers"],
        crct: 2
    },
    {
        que: 'The condition in an if / else statement is enclosed within ____.',
        options: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
        crct: 2
    },
    {
        que: 'Arrays in JavaScript can be used to store ____.',
        options: ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"],
        crct: 3
    },
    {
        que: 'String values must be enclosed within _____ when being assigned to variables.',
        options: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
        crct: 2
    },
    {
        que: 'A very useful tool used during development and debugging for printing content to the debugger is: ',
        options: ["JavaScript", "Terminal/Bash", "For Loops", "console.log"],
        crct: 3
    }
];


// Initialisations for variables 
let currentQuestion = 0;
let finalScore = 0;
let remTime = 76;

// Assignment for the UI elements 
const answers = document.getElementById("optionsToDisplay");
let queToDisplay = document.getElementById('queToDisplay');
let optionsToDisplay = document.getElementById('optionsToDisplay');
let scoreSection = document.getElementById('scoreSection');
let questionsDisplayBlock = document.getElementById('questionsDisplayBlock');
let correctDiv = document.getElementById('correct');
let wrongDiv = document.getElementById('wrong');
let time = document.getElementById("quizRemainTime");
let localStorageArray = JSON.parse(window.localStorage.getItem("highscores")) ? JSON.parse(window.localStorage.getItem("highscores")) : [];


// Event listener added to detect click event
answers.addEventListener('click', checkChoice);
document.getElementById('submitButton').addEventListener('click', submitscores)

// Function that will start the Quiz, timer.
function startQuiz() {
    document.getElementById('titleDisplay').style.display = "none"
    displayQuestions(0);
    startQuizTimer();
}

// Function that will evaluate the entered user answer
function checkChoice(event) {
    const userAnswer = parseInt(event.target.parentElement.dataset.index);
    // increase the final score by 10 is ans is correct
    if (userAnswer == Questions[currentQuestion].crct) {
        finalScore = finalScore + 10;
        correctDiv.classList.remove('hide');
    } else {
        // reduce the timer by 10 sec is answer is wrong
        remTime = remTime - 10;
        wrongDiv.classList.remove('hide');
    }
    //display next question after evaluating
    currentQuestion++;
    setTimeout(function () {
        displayQuestions(currentQuestion);
    }, 1000)

}


//Function that will dislay the Question and Options as li element buttons
function displayQuestions(ind) {
    correctDiv.classList.add('hide');
    wrongDiv.classList.add('hide');
    // If its last question then end the quiz
    if (Questions.length <= ind) {
        finishQuiz();
        return;
    }
    queToDisplay.textContent = Questions[ind].que;
    optionsToDisplay.innerHTML = '';
    Questions[ind].options.forEach(function (answer, index) {
        const li = document.createElement("li");
        li.dataset.index = index;
        const button = document.createElement("button");
        button.textContent = (index + 1) + ". " + answer;
        li.appendChild(button);
        optionsToDisplay.appendChild(li);
    });
}


// Function that will display final score and Form to enter Name
function finishQuiz() {
    scoreSection.classList.remove("hide");
    questionsDisplayBlock.classList.add('hide');
    correctDiv.classList.add('hide');
    wrongDiv.classList.add('hide');
    document.getElementById('finalScore').textContent = finalScore;
    time.classList.add('hide');

}


// Function that will run timer for quiz
function startQuizTimer() {
    let timerInterval = setInterval(function () {
        remTime--;
        time.textContent = remTime;
        if (remTime <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}


// Function will read the user initial and will store it to local storage
function submitscores() {
    let username = document.getElementById('initial').value.toUpperCase();
    if (!username || username == '') {
        alert('Please enter Initials');
        return false;
    }
    let scoreObj = {
        'score': finalScore,
        'name': username
    }
    localStorageArray.push(scoreObj);
    localStorage.setItem('highscores', JSON.stringify(localStorageArray));
    window.location.href = "./highscores.html";

}