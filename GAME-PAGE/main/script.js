let mainButton = document.querySelector('.main_button');
let mainDiv = document.querySelector('.main_inner');
let gameChoiceDiv = document.querySelector('.game_choice');



mainButton.addEventListener('click', function() {
    mainDiv.classList.remove('display_flex');
    mainDiv.classList.add('display_none');
    gameChoiceDiv.classList.add('display_flex');
})