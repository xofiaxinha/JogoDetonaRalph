const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: null,
        result: 0,
        currentTime: 60,
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
        timerId: null,
    }
}

function countDown(){
    state.values.currentTime--;
    if(state.values.currentTime <= 0){
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
        alert('GAME OVER! Seu resultado é: ' + state.values.result);
    }
    state.view.timeLeft.textContent = state.values.currentTime;
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove('enemy');
    })
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) =>
    {square.addEventListener('mousedown', () => {
        if(square.id === state.values.hitPosition){
           //document.getElementsByClassName('enemy').style.cursor = 'pointer';
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
        }
    })
    })
}

function init(){
    moveEnemy();
    addListenerHitBox();
}

init();