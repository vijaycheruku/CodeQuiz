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