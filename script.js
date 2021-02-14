//variables
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const avatar = document.querySelector('#player');
const bone = document.querySelectorAll('.bone');
const score = document.querySelector('.score');
const gameOver = document.querySelector('.gameover');
const startGame = document.querySelector('.startgame');

const bones = [...bone];
const [bone1, bone2, bone3, bone4] = bones;
let x = 0;

//Game function when two elements are touching
function isTouching(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
        aRect.top + aRect.height < bRect.top ||
        aRect.top > bRect.top + bRect.height ||
        aRect.left + aRect.width < bRect.left ||
        aRect.left > bRect.left + bRect.width
    );
}

//create new Timer-making use of the timer class
const timer = new Timer(durationInput, startButton, {
    onStart() {
        for (each of bones) {
            each.style.display = "block";
        }
        moveBone(bone1);
        moveBone(bone2);
        moveBone(bone3);
        moveBone(bone4);
        moveAvatar(avatar);
        x = 0;
        score.innerText = `Score: ${x}`;
        startElements();

    },
    onTick() {
        console.log('Timer just ticked down');
    },
    onComplete() {
        console.log('Timer is completed');
        hideBones();
        endElements();

    }
});

//Game functionality
window.addEventListener('keydown', function (e) {

    if (e.key === 'ArrowDown' || e.key === 'Down') {
        moveVertical(avatar, 50);
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        moveVertical(avatar, (-50));
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        moveHorizontal(avatar, 50);
        avatar.style.transform = 'scale(1,1)';
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        moveHorizontal(avatar, -50);
        avatar.style.transform = 'scale(-1,1)';
    }
    if (isTouching(avatar, bone1)) {
        moveBone(bone1);
        scoreCount();
    }
    else if (isTouching(avatar, bone2)) {
        moveBone(bone2);
        scoreCount();
    }
    else if (isTouching(avatar, bone3)) {
        moveBone(bone3);
        scoreCount();
    }
    else if (isTouching(avatar, bone4)) {
        moveBone(bone4);
        scoreCount();
    }
});

//--------------------------Functions---------------------------

//allows avatar to move vertically
const moveVertical = (element, amount) => {
    const currTop = extractPos(element.style.top);
    element.style.top = `${currTop + amount}px`;
};

//allows avatar to move horizontally
const moveHorizontal = (element, amount) => {
    const currLeft = extractPos(element.style.left);
    element.style.left = `${currLeft + amount}px`;
};

//
const extractPos = (pos) => {
    if (!pos) return 100;
    return parseInt(pos.slice(0, -2));
};

//moves bones randomely
function moveBone(bone) {
    bone.style.top = `${Math.floor(Math.random() * window.screen.availHeight)}px`;
    bone.style.left = `${Math.floor(Math.random() * window.screen.availWidth)}px`;
};

//moves avatar randomely
function moveAvatar(avatar) {
    avatar.style.top = `${Math.floor(Math.random() * window.screen.availHeight)}px`;
    avatar.style.left = `${Math.floor(Math.random() * window.screen.availWidth)}px`;
};

//counting score function
const scoreCount = () => {
    x += 10;
    score.innerText = `Score: ${x}`;
};

//all the bones are being hidden
const hideBones = () => {
    for (each of bones) {
        each.style.display = "none";
    }
};

//elements being shown when the game loads
const startElements = () => {
    startGame.style.display = "none";
    gameOver.style.display = "none";
    avatar.style.display = "block";
    startButton.style.display = "none";
};

//elements being shown when the game ends
const endElements = () => {
    gameOver.style.display = "block";
    durationInput.value = 10;
    startButton.style.display = "block";
    startButton.innerText = "play again";
}

hideBones();




