let inputRounds = document.querySelector('.rounds');
let inputPlayers = document.querySelectorAll('.player');
let startButton = document.querySelector('.start_button');
let nextPlayerButton = document.querySelector('.next_player_button');
let newGameButton = document.querySelector('.new_game');

let startDiv = document.querySelector('.start');
let nextPlayerDiv = document.querySelector('.next_player');
let mainDiv = document.querySelector('.main');
let endDiv = document.querySelector('.end');
let nextRoundDiv = document.querySelector('.next_round');

let tableResults = document.querySelector('.results');

let nextPlayerName = document.querySelector('.next_player_name');
let playingName = document.querySelector('.playing_name');
let winner = document.querySelector('.winner_name');
let currentScore = document.querySelector('.current_player_score');
let currentPlayer = document.querySelector('.current_player_name');
let currentPlayerTitle = document.querySelector('.current_player_title');
let nextPlayerTitle = document.querySelector('.next_player_title');

const burger = document.getElementById('burger');
const ul = document.querySelector('nav ul');

burger.addEventListener('click', () => {
    burger.classList.toggle('show-x');
    ul.classList.toggle('show');
});



let rows = 3;
let cols = 3;
let colors = ['red', 'green', 'blue'];
let table = document.querySelector('#field');
let k = 0;
let y = 0;
let r = 1;

let rounds = 0;
let players = [];
let arrResults = [];


let player1ScoreTotal = 0;
let player1ScoreRound = 0;
let player2ScoreTotal = 0;
let player2ScoreRound = 0;

// START PAGE 
startButton.addEventListener('click', function() {
    let check1 = Array.from(inputPlayers).every(elem => elem.value);
    if (check1) {

        Number(inputRounds.value) > 1 ? rounds = Number(inputRounds.value) : rounds = 1;

        players.push(inputPlayers[0].value);
        players.push(inputPlayers[1].value);

        startDiv.classList.remove('display_flex');
        startDiv.classList.add('display_none');

        nextPlayerDiv.classList.remove('display_none');
        nextPlayerDiv.classList.add('display_flex');

        nextPlayerName.innerHTML = players[y % 2];
        playingName.innerHTML = players[y % 2];

        if (currentPlayer.innerHTML.length == 0) {
            currentPlayerTitle.innerHTML = '';
            nextPlayerTitle.innerHTML = 'First player is ';
        }

    } else {
        alert('enter your names');
    };
});

nextPlayerButton.addEventListener('click', function() {


    nextPlayerDiv.classList.remove('display_flex');
    nextPlayerDiv.classList.add('display_none');
    if (table.childNodes.length != 0) {
        let children = table.querySelectorAll('tr');
        for (let child of children) {
            child.remove();
        }
    }
    createTable()
    mainDiv.classList.remove('display_none');
    mainDiv.classList.add('display_flex');

})



function createTable() {
    for (let i = 1; i <= rows; i++) {
        let newTr = document.createElement('tr');
        for (let j = 1; j <= cols; j++) {
            let newTd = document.createElement('td');
            newTd.classList.add(randomColor(colors));
            newTd.addEventListener('click', function() {
                k += 1;
                console.log(k);
                let index = colors.indexOf(this.className);
                if (index == colors.length - 1) {
                    newTd.classList.remove(this.className);
                    newTd.classList.add(colors[0]);

                } else {
                    newTd.classList.remove(this.className);
                    newTd.classList.add(colors[index + 1]);
                }

                let class1 = this.className;
                let tds1 = Array.from(document.querySelectorAll('td'));
                let check = tds1.every(function(elem) {
                    return (elem.classList.contains(class1));
                })
                console.log('here');
                if (check) {
                    y % 2 == 0 ? player1ScoreRound = k : player2ScoreRound = k;
                    console.log('k')
                    currentScore.innerHTML = k;

                    player1ScoreTotal += player1ScoreRound;
                    player2ScoreTotal += player2ScoreRound;

                    player1ScoreRound = 0;
                    player2ScoreRound = 0;

                    if (y % 2 == 1) {
                        if (r == rounds) {

                            player1ScoreTotal > player2ScoreTotal ? winner.innerHTML = players[1] : player1ScoreTotal < player2ScoreTotal ? winner.innerHTML = players[0] : winner.innerHTML = 'It as a draw';

                            mainDiv.classList.remove('display_flex');
                            mainDiv.classList.add('display_none');
                            endDiv.classList.remove('display_none');
                            endDiv.classList.add('display_flex');

                            arrResults.push(player1ScoreTotal);
                            arrResults.push(player2ScoreTotal);
                            createTableResults();
                            k = 0;
                            y = 0;
                            r = 1;
                            rounds = 0;
                            players = [];
                            arrResults = [];
                            player1ScoreTotal = 0;
                            player2ScoreTotal = 0;

                            currentPlayer.innerHTML = '';
                            currentScore.innerHTML = '';

                            inputPlayers.forEach(elem => elem.value = '');
                            inputRounds.value = '';




                        } else if (r != rounds) {
                            currentPlayer.innerHTML = players[y % 2];
                            y++
                            currentPlayerTitle.innerHTML = " ended the game with the number of clicks: ";
                            nextPlayerTitle.innerHTML = 'Next player is ';
                            nextPlayerName.innerHTML = players[y % 2];
                            playingName.innerHTML = players[y % 2];

                            mainDiv.classList.remove('display_flex');
                            mainDiv.classList.add('display_none');

                            nextPlayerDiv.classList.remove('display_none');
                            nextPlayerDiv.classList.add('display_flex');
                            k = 0;

                            r++
                        }
                    } else if (y % 2 == 0) {


                        mainDiv.classList.remove('display_flex');
                        mainDiv.classList.add('display_none');

                        nextPlayerDiv.classList.remove('display_none');
                        nextPlayerDiv.classList.add('display_flex');
                        currentPlayer.innerHTML = players[y % 2];
                        k = 0;
                        y++;
                        currentPlayerTitle.innerHTML = " ended the game with the number of clicks: ";
                        nextPlayerTitle.innerHTML = 'Next player is ';
                        nextPlayerName.innerHTML = players[y % 2];
                        playingName.innerHTML = players[y % 2];
                    }


                };

            })

            newTr.appendChild(newTd);
        }
        table.appendChild(newTr);

    }
}










function randomColor(arr) {
    let num = Math.floor(Math.random() * (arr.length - 0)) + 0;
    return arr[num];
}


function createTableResults() {
    let newTh = document.createElement('tr');
    let newThTrName = document.createElement('th');
    newThTrName.innerHTML = 'player';
    newTh.appendChild(newThTrName);

    let newThTrScore = document.createElement('th');
    newThTrScore.innerHTML = 'score';
    newTh.appendChild(newThTrScore);

    tableResults.appendChild(newTh);


    for (let i = 0; i < players.length; i++) {
        let resultTr = document.createElement('tr');

        let resultNameTd = document.createElement('td');
        resultNameTd.innerHTML = players[i];
        resultTr.appendChild(resultNameTd);

        let resultTd = document.createElement('td');
        resultTd.innerHTML = arrResults[i];
        resultTr.appendChild(resultTd);

        tableResults.appendChild(resultTr);
    }
}


newGameButton.addEventListener('click', function() {
    let tds2 = document.querySelectorAll('td');
    for (let td of tds2) {
        td.remove();
    }

    let ths = document.querySelectorAll('th');
    for (let th of ths) {
        th.remove();
    }

    endDiv.classList.remove('display_flex');
    endDiv.classList.add('display_none');
    startDiv.classList.remove('display_none');
    startDiv.classList.add('display_flex');
});