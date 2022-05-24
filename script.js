'use strict';

/*
problems need to solve:
1. random number for computer between 1 and 20
2. computer just roll the number once per game
3. input for user must be a number between 1 and 20
4. check user's number and computer's number is it same or not
5. after check the condition, there must be a notification pop up to tell the user what's happen.
6. there is score (20) and the score will be decrease 1 if user fail guess the number. and if the score reach 0, user will loose
7. each user success guess the number, scores will be saved in highscore
8. there is again option which is will be lead us to run the game from beggining without reload the page
*/

//initialize body
let body = document.querySelector('body');

//initialize score
let score = 20;
let scoreText = document.querySelector('span.score');

//initialize message
let message = document.querySelector('p.message');

//initialize highscore
let highScore = document.querySelector('span.highscore')
let highScoreStore = [];
let i = 0;

//initialize number logo
let numberLogo = document.querySelector('div.number');

//random computer number
let computerNum = () => Math.floor(Math.random() * 20) + 1;
let comNum = computerNum();

//user input number check
let playerNum;
let playerInput = document.querySelector('input.guess');
let check = document.querySelector('button.check');

check.addEventListener('click', (e) => {
    console.log(comNum);
    if (score != 0) {
        if (playerInput.value.length > 0 && playerInput.value > 0 && playerInput.value <= 20) {
            playerNum = Number(playerInput.value);

            //match user and computer number
            if (playerNum === comNum) {
                //change message
                message.textContent = "You're right!!";

                //change background color
                body.setAttribute('class', 'rightColor');
                check.style.backgroundColor = '#ccc';

                //change number logo
                numberLogo.textContent = comNum;

                //apply highscore
                highScoreStore[i] = score;
                i++;

                if (highScoreStore.length == 1) {
                    highScore.textContent = score;
                } else {
                    if (highScoreStore[highScoreStore.length - 1] > highScoreStore[highScoreStore.length - 2]) {
                        highScore.textContent = highScoreStore[highScoreStore.length - 1];
                    } else if (highScoreStore[highScoreStore.length - 1] < highScoreStore[highScoreStore.length - 2]) {
                        highScore.textContent = highScoreStore[highScoreStore.length - 2];
                    } else {
                        highScore.textContent = highScoreStore[highScoreStore - 1];
                    }
                }

                //deactive the button
                check.setAttribute('disabled', '');
            } else {
                //calculate score
                score -= 1;
                scoreText.textContent = score;
                message.textContent = "Wrong number!!";

                //change background color
                body.setAttribute('class', 'wrongColor');
            }
        } else {
            message.textContent = 'Your input number isn\'t correct!';

            //change background color
            body.setAttribute('class', 'warningColor');
        };
    } else {
        message.textContent = "You lose!";
        check.style.backgroundColor = '#ccc';

        //deactive the button
        check.setAttribute('disabled', '');
    }
});

//restart the game
let again = document.querySelector('button.again');

again.addEventListener('click', () => {
    //score reset
    score = 20;
    scoreText.textContent = score;

    //bgcolor reset
    body.classList.add('defaultColor');
    body.classList.remove('warningColor', 'wrongColor', 'rightColor');

    //reset input value
    playerInput.value = '';

    //random computer num
    comNum = computerNum();

    //reset number logo
    numberLogo.textContent = '?';

    //active the button
    check.removeAttribute('disabled');
});