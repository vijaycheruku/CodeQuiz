updatehighscorepage();

// Function that displays high scores
function updatehighscorepage() {
    let highscores = JSON.parse(window.localStorage.getItem("highscores"));
    let table = document.getElementById('highscoreTtable');
    function addCell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }
    // sort high score based on score and display in table of descending order
    if (highscores && highscores.length > 0) {
        highscores.sort((a, b) => b.score - a.score);
        highscores.forEach(function (eachscore, i) {
            var row = table.insertRow();
            addCell(row, (i + 1));
            addCell(row, eachscore.name);
            addCell(row, eachscore.score);
        });
    } else {
        table.innerHTML = '';
    }
}

// Event listeners looking for click function
document.getElementById('goBackButton').addEventListener('click', function () {
    window.location.href = "index.html"
})

// Function that clears highscores in local storage
document.getElementById('clearHighscores').addEventListener('click', function () {
    localStorage.removeItem("highscores");
    updatehighscorepage();
})