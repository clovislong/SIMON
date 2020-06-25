//set-up

//audio varioables
let green1Audio = new Audio('green1.mp3');
let red2Audio = new Audio('red2.mp3');
let yellow3Audio = new Audio('yellow3.mp3');
let blue4Audio = new Audio('blue4.mp3');
let gameOverAudio = new Audio('wrong.mp3');

//buttons
let green1Button = document.querySelectorAll('button')[0];
let red2Button = document.querySelectorAll('button')[1];
let yellow3Button = document.querySelectorAll('button')[2];
let blue4Button = document.querySelectorAll('button')[3];
let startButton = document.querySelectorAll('button')[4];

//h1 text
let h2 = document.querySelector('h2');
let h1 = document.querySelector('h1');

//other variables
let level = 0;
let computerSequence = [];
let playerSequence = [];
let turn = 'computer';

//event listeners
green1Button.addEventListener('click', () => {
	green1Audio.play();
	if (turn === 'player') playerSequence.push(1);
	if (checkLastInput() === true || turn === 'computer') {
		green1Button.classList.add('active');
		setTimeout(function() {
			green1Button.classList.remove('active');
		}, 200);
	}
	else {
		gameOver();
	}
	if (endPlayerTurn() === true && level !== 0) {
		levelUp();
		delay(1500).then(computerTurn);
	}
});
red2Button.addEventListener('click', () => {
	red2Audio.play();
	if (turn === 'player') playerSequence.push(2);
	if (checkLastInput() === true || turn === 'computer') {
		red2Button.classList.add('active');
		setTimeout(function() {
			red2Button.classList.remove('active');
		}, 200);
	}
	else {
		gameOver();
	}
	if (endPlayerTurn() === true && level !== 0) {
		levelUp();
		delay(1500).then(computerTurn);
	}
});

yellow3Button.addEventListener('click', () => {
	yellow3Audio.play();
	if (turn === 'player') playerSequence.push(3);
	if (checkLastInput() === true || turn === 'computer') {
		yellow3Button.classList.add('active');
		setTimeout(function() {
			yellow3Button.classList.remove('active');
		}, 200);
	}
	else {
		gameOver();
	}
	if (endPlayerTurn() === true && level !== 0) {
		levelUp();
		delay(1500).then(computerTurn);
	}
});
blue4Button.addEventListener('click', () => {
	blue4Audio.play();
	if (turn === 'player') playerSequence.push(4);
	if (checkLastInput() === true || turn === 'computer') {
		blue4Button.classList.add('active');
		setTimeout(function() {
			blue4Button.classList.remove('active');
		}, 200);
	}
	else {
		gameOver();
	}

	if (endPlayerTurn() === true && level !== 0) {
		levelUp();
		delay(1500).then(computerTurn);
	}
});
startButton.addEventListener('click', () => {
	if (level === 0) start();
});

//start game
function start() {
	h1.innerText = 'SIMON';
	green1Button.classList.toggle('hidden');
	red2Button.classList.toggle('hidden');
	yellow3Button.classList.toggle('hidden');
	blue4Button.classList.toggle('hidden');
	startButton.classList.toggle('hidden');
	document.querySelector('body').style.backgroundColor = '#bee0f1';
	level = 1;
	computerSequence = [];
	playerSequence = [];
	turn = 'computer';
	delay(1500).then(computerTurn);
}

// Computer adds a button and plays sequence
function computerTurn() {
	h2.innerText = `Level ${level}`;
	turn = 'computer';
	let random1to4 = Math.floor(Math.random() * 4 + 1);
	computerSequence.push(random1to4);
	for (let i = 0; i < computerSequence.length; i++) {
		let buttonNum = computerSequence[i];
		delay(600 * i).then(() => {
			if (buttonNum === 1) green1Button.click();
			else if (buttonNum === 2) red2Button.click();
			else if (buttonNum === 3) yellow3Button.click();
			else blue4Button.click();
		});
	}
	playerSequence = [];
	delay(600 * computerSequence.length).then(() => {
		turn = 'player';
	});
}

//turn level up
function levelUp() {
	level += 1;
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function gameOver() {
	let lastLevel = level;
	document.querySelector('body').style.backgroundColor = 'red';
	gameOverAudio.play();
	h2.innerText = `You died at level ${lastLevel} try again`;
	h1.innerText = 'Game Over';
	green1Button.classList.toggle('hidden');
	red2Button.classList.toggle('hidden');
	yellow3Button.classList.toggle('hidden');
	blue4Button.classList.toggle('hidden');
	startButton.classList.toggle('hidden');

	level = 0;
}

function checkLastInput() {
	if (computerSequence[playerSequence.length - 1] === playerSequence[playerSequence.length - 1]) return true;
	return false;
}

function endPlayerTurn() {
	if (level === 0) return false;
	if (playerSequence.length === computerSequence.length) return true;
	else return false;
}
