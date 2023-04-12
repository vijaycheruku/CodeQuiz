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



const answers = document.getElementById("optionsToDisplay");
answers.addEventListener('click', checkChoice);
let currentQuestion = 0;
let finalScore = 0;

function checkChoice(event) {

    const userAnswer = parseInt(event.target.parentElement.dataset.index);  
    if(userAnswer == Questions[currentQuestion].crct) {
        finalScore = finalScore+10;
    }else{
        remTime = remTime - 10;
    }
     
    currentQuestion++;
    displayQuestions(currentQuestion);
}

function startQuiz(){
    document.getElementById('titleDisplay').style.display = "none"
    displayQuestions(0);
    startQuizTimer();
}

let queToDisplay = document.getElementById('queToDisplay');
let optionsToDisplay = document.getElementById('optionsToDisplay');

function displayQuestions(ind) {
    if(Questions.length <= ind ) {
        finishQuiz();
        return;
    }
    queToDisplay.textContent = Questions[ind].que;
    optionsToDisplay.innerHTML = '';
    Questions[ind].options.forEach(function(answer, index) {
      const li = document.createElement("li");
      li.dataset.index = index;
      const button = document.createElement("button");
      button.textContent = (index + 1) + ". " + answer;
      li.appendChild(button);
      optionsToDisplay.appendChild(li);
    });
}


let scoreSection = document.getElementById('scoreSection');
let questionsDisplayBlock = document.getElementById('questionsDisplayBlock');

let correctDiv = document.getElementById('correct');
let wrongDiv = document.getElementById('wrong');


function finishQuiz() {
    scoreSection.classList.remove("hide");
    questionsDisplayBlock.classList.add('hide');
    correctDiv.classList.add('hide');
    wrongDiv.classList.add('hide');
    document.getElementById('finalScore').textContent = finalScore;
    time.classList.add('hide');
    
}

let time = document.getElementById("quizRemainTime");
let remTime = 76;

function startQuizTimer() {
    let timerInterval = setInterval(function() {
        remTime--;
        time.textContent = remTime;
        if (remTime <= 0 ) {
          clearInterval(timerInterval);
          finishQuiz();
        } 
      }, 1000);
}


document.getElementById('submitButton').addEventListener('click', submitscores)
let localStorageArray = JSON.parse(window.localStorage.getItem("highscores")) ? JSON.parse(window.localStorage.getItem("highscores")) : [];

function submitscores() {
    let username = document.getElementById('initial').value.toUpperCase();
    let scoreObj = {
        'score' : finalScore,
        'name' : username
    }
    localStorageArray.push(scoreObj);
    localStorage.setItem('highscores', JSON.stringify(localStorageArray));
    window.location.href= "./highscores.html";

}
updatehighscorepage();


function updatehighscorepage() {
    let highscores = JSON.parse(window.localStorage.getItem("highscores"));
    let table = document.getElementById('highscoreTtable');

    function addCell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }

    if(highscores && highscores.length > 0) {
        highscores.sort((a,b) => b.score - a.score);
        highscores.forEach(function (eachscore, i) {
            var row = table.insertRow();
            addCell(row,   (i+1));
            addCell(row,   eachscore.name);
            addCell(row,  eachscore.score);
        });
    }else{
        table.innerHTML = '';

    }
   

}

document.getElementById('goBackButton').addEventListener('click', function() {
    window.location.href = "index.html"
})

document.getElementById('clearHighscores').addEventListener('click', function() {
    localStorage.removeItem("highscores");
    updatehighscorepage();
})