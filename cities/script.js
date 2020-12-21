// menu

const burger = document.getElementById('burger');
const ul = document.querySelector('nav ul');

burger.addEventListener('click', () => {
    burger.classList.toggle('show-x');
    ul.classList.toggle('show');
});


let input = document.querySelector('.question');
let label = document.querySelector('#label1');
let currentScoreNum = document.querySelector('#current_score_num');
let bestScoreNum = document.querySelector('#best_score_num');
let currentCityName = document.querySelector('#current_city_name');
let currentLetter = document.querySelector('#current_letter');
let button = document.querySelector('#startAgain');

let main = document.querySelector('.main');
let mainInner = document.querySelector('.main_inner');
let gameOver = document.querySelector('.game_over');

let check = [];
let word;
let num;
let letter;
let count = 0;
let arrCount = [];
let specialLetters = ["ь", "ц", "ы"];
let cities;
let specialCities;



let cititesReq = new XMLHttpRequest();

cititesReq.onreadystatechange = function() {
    if (cititesReq.readyState == 4 && cititesReq.status == 200) {
        let allCities = JSON.parse(cititesReq.response);
        cities = allCities.cities;
        specialCities = allCities.specialCities;

        console.log(cities);
        console.log(specialCities);
    }
};

cititesReq.open("GET", "cities.json", true);
cititesReq.send();




input.addEventListener('click', function() {
    this.placeholder = '';
})

input.addEventListener('blur', function() {
    this.placeholder = 'возвращайся в игру!';
})
input.addEventListener('keypress', function(event) {

    if (event.keyCode == 13) {


        let checking = specialCities.some(function(elem) {
            if (elem.toLowerCase() == input.value.toLowerCase()) {
                return true
            } else {
                return false;
            }
        })

        if (checking) {
            input.value = input.value.replace(/\s/g, '-')
        }
        let yt = /\-/;
        if (yt.test(input.value)) {
            let c = /\-[а-я]/g;
            let j = input.value.match(c);
            let k;
            if (j.length == 1) {
                k = j.join('');
            } else {
                k = j[1];
            }
            let u3 = input.value.indexOf(k);
            input.value = input.value.substr(0, u3) + k[0] + k[1].toUpperCase() + input.value.substr(u3 + 2);
        }
        input.value = input.value.replace(/\s$/, '');
        let y4 = /\s/
        if (y4.test(input.value)) {
            let c2 = /\s[а-я]/;
            let j2 = input.value.match(c2);
            let k3 = j2.join('');
            let u5 = input.value.indexOf(j2.join(''));
            input.value = input.value.substr(0, u5) + k3[0] + k3[1].toUpperCase() + input.value.substr(u5 + 2);
        }
        input.value = input.value.substr(0, 1).toUpperCase() + input.value.substr(1);
        console.log(input.value);


        if (check.length != 0) {
            if (cities.indexOf(input.value) != -1) {
                if (check.indexOf(input.value) == -1) {
                    if (input.value[0].toLowerCase() == letter) {
                        check.push(input.value);
                        input.placeholder = 'you are right!';

                        currentScoreNum.innerHTML = ++count;

                        word = input.value;
                        robot(word);


                        input.value = '';
                    } else {
                        arrCount.push(Number(currentScoreNum.innerHTML));
                        arrCount.sort(function(a, b) { return a - b });
                        bestScoreNum.innerHTML = +arrCount[arrCount.length - 1];

                        main.style.display = 'none';
                        gameOver.style.display = 'flex';

                        // gameOver.classList.toggle('notactive');
                        // main.classList.toggle('nonactive');

                    }
                } else {




                    arrCount.push(Number(currentScoreNum.innerHTML));
                    arrCount.sort(function(a, b) { return a - b });
                    bestScoreNum.innerHTML = arrCount[arrCount.length - 1];



                    main.style.display = 'none';
                    gameOver.style.display = 'flex';

                    // gameOver.classList.toggle('notactive');
                    // main.classList.toggle('nonactive');


                }
            } else {




                arrCount.push(Number(currentScoreNum.innerHTML));
                arrCount.sort(function(a, b) { return a - b });
                bestScoreNum.innerHTML = arrCount[arrCount.length - 1];

                main.style.display = 'none';
                gameOver.style.display = 'flex';

                a
                // gameOver.classList.toggle('notactive');
                // main.classList.toggle('nonactive');

            }

        } else {
            if (cities.indexOf(input.value) != -1) {
                check.push(input.value);
                word = input.value;

                robot(word);

                input.value = '';
                label.innerHTML = 'напиши следующий город!';


            } else {
                input.value = '';
                input.setAttribute('placeholder', 'Напиши другой город');
            }
        }
    }



});

button.addEventListener('click', function(event) {
    event.preventDefault();
    currentCityName.innerHTML = '';
    input.value = '';
    const newLocal = check = [];
    currentLetter.innerHTML = '';
    count = '';
    currentScoreNum.innerHTML = '';
    input.placeholder = 'Let`s GO!';
    main.style.display = 'flex';
    gameOver.style.display = 'none';

    // gameOver.classList.toggle('notactive');
    // main.classList.toggle('nonactive');

});



function robot(city) {
    getLetter(city);
    num = Math.floor(Math.random() * (cities.length - 0)) + 0;

    if (check.indexOf(cities[num]) == -1) {
        if (cities[num][0].toLowerCase() == letter) {
            currentCityName.innerHTML = cities[num];
            check.push(cities[num]);
            getLetter(currentCityName.innerHTML);
            currentLetter.innerHTML = letter;
            console.log(cities[num]);

        } else {
            robot(city)
        }
    } else {
        robot(city)
    }


};






function getLetter(word) {
    let lastLetter = word[word.length - 1];
    if (specialLetters.indexOf(lastLetter) != -1) {
        getLetter(word.substr(0, word.length - 1));
    } else {
        let arr = [];
        for (let elem of cities) {
            if (elem[0].toLowerCase() == lastLetter) {
                if (check.indexOf(elem) == -1) {
                    arr.push(elem);
                }
            }
        }

        if (arr.length == 0) {
            getLetter(word.substr(0, word.length - 1));
        } else {
            letter = lastLetter;
        }

    }
}

let z = "Калач-на-дону";
let c = /\-[а-я]/g;
let j = z.match(c);
let k = j[1];
console.log(k);