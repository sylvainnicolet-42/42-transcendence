// canvas
const canvas = document.getElementById('game');
const container = document.getElementById("game-container");
const ctx = canvas.getContext("2d");

// objects
const GAME_STATE = {
	PAUSED: 0,
	STARTED: 1,
	OVER: 2,
};

const BASE_SPEED = 5;

const ball = {
	size: 10,
	positionX: canvas.width / 2 + 8,
	positionY: canvas.height / 2 + 8,
	velocityX: BASE_SPEED,
	velocityY: BASE_SPEED,
	color: 'white',
};

const player1 = {
	height: 100,
	width: 10,
	positionX: 10,
	positionY: canvas.height / 2 - 100 / 2,
	color: 'white',
	player: 'left',
	speed: BASE_SPEED,
};

const player2 = {
	height: 100,
	width: 10,
	positionX: canvas.width - 10 - 10,
	positionY: canvas.height / 2 - 100 / 2,
	color: 'white',
	player: 'right',
	speed: BASE_SPEED,
};

// game state
const game = {
	player1Score: 0,
	player2Score: 0,
	maxScore: 5,
	state: GAME_STATE.PAUSED,
};

const keyPressed = {
	W: false,
	S: false,
	Up: false,
	Down: false,
};

let activated = true;
let hits = 0;

// key events
document.addEventListener('keydown', (event) => {
	const keyName = event.key;

	if (keyName === 's') {
		keyPressed['S'] = true;
	}
	if (keyName === 'w') {
		keyPressed['W'] = true;
	}
	if (keyName === 'ArrowUp') {
		keyPressed['Up'] = true;
	}
	if (keyName === 'ArrowDown') {
		keyPressed['Down'] = true;
	}
	if (keyName === 'Enter' && game.state !== GAME_STATE.STARTED) {
		game.state = GAME_STATE.STARTED;
	}
}, false);

document.addEventListener('keyup', (event) => {
	const keyName = event.key;

	if (keyName === 's') {
		keyPressed['S'] = false;
	}
	if (keyName === 'w') {
		keyPressed['W'] = false;
	}
	if (keyName === 'ArrowUp') {
		keyPressed['Up'] = false;
	}
	if (keyName === 'ArrowDown') {
		keyPressed['Down'] = false;
	}
}, false);

// update state
function drawField() {
	ctx.fillStyle = '#222222';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScores() {
	ctx.font = '30px sans-serif';
	ctx.textAliign = 'center';
	ctx.fillText(game.player1Score.toString(), canvas.width / 4, 50);
	ctx.fillText(game.player2Score.toString(), canvas.width / 4 * 3, 50);
}

function drawPlayers() {
	ctx.fillStyle = player1.color;
	ctx.fillRect(player1.positionX, player1.positionY, player1.width, player1.height);
	ctx.fillStyle = player2.color;
	ctx.fillRect(player2.positionX, player2.positionY, player2.width, player2.height);
}

function drawBall() {
	ctx.fillStyle = ball.color;
	ctx.fillRect(ball.positionX, ball.positionY, ball.size, ball.size);
}

function drawNet() {
	ctx.beginPath();
	ctx.setLineDash([7, 15]);
	ctx.moveTo(canvas.width / 2, canvas.height);
	ctx.lineTo(canvas.width / 2, 0);
	ctx.lineWidth = 10;
	ctx.strokeStyle = '#ffffff';
	ctx.stroke();
}

function drawAll() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawField();
	drawPlayers();
	drawBall();
	drawNet();
	drawScores();
}

function drawGameStart() {
	drawAll();
	ctx.fillStyle = '#222222';
	ctx.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
	ctx.fillStyle = 'white';
	ctx.font = '30px sans-serif';
	ctx.textAlign = 'center';
	ctx.fillText('Press Enter to start', canvas.width / 2, canvas.height / 2);
}

function drawGameOver() {
	drawAll();
	ctx.fillStyle = '#222222';
	ctx.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
	ctx.fillStyle = 'white';
	ctx.font = '30px sans-serif';
	ctx.textAlign = 'center';
	if (game.player1Score === game.maxScore) {
		ctx.fillText('Player 1 wins', canvas.width / 2, canvas.height / 2);
	} else {
		ctx.fillText('Player 2 wins', canvas.width / 2, canvas.height / 2);
	}
	setTimeout(() => {
		drawGameStart();
	}, 1000);
}

function updateKeyPresses() {
	if (keyPressed['W']) {
		if (player1.positionY > 0) {
			player1.positionY -= player1.speed;
		}
	}
	if (keyPressed['S']) {
		if (player1.positionY < canvas.height - player1.height) {
			player1.positionY += player1.speed;
		}
	}
	if (keyPressed['Up']) {
		if (player2.positionY > 0) {
			player2.positionY -= player2.speed;
		}
	}
	if (keyPressed['Down']) {
		if (player2.positionY < canvas.height - player2.height) {
			player2.positionY += player2.speed;
		}
	}
}

// manage ball
function resetBall() {
	ball.positionX = canvas.width / 2 - ball.size / 2;
	ball.positionY = canvas.height / 2 - ball.size / 2;

	let velocityX = ball.velocityX;
	let velocityY = ball.velocityY;

	ball.velocityX = 0;
	ball.velocityY = 0;

	setTimeout(() => {
		ball.velocityX = (-velocityX) * BASE_SPEED / velocityX;
		ball.velocityY = (Math.random() * 2 - 1) * BASE_SPEED;
	}, 1000);
}

function setScore() {
	if (ball.positionX > canvas.width - (player2.width)) {
		game.player1Score++;
		resetBall();
	} else if (ball.positionX < player1.width) {
		game.player2Score++;
		resetBall();
	}
}

function resetGame() {
	game.player1Score = 0;
	game.player2Score = 0;
	updateDefault();
}

function gameOver() {
	if (game.player1Score === game.maxScore) {
		console.log('Player 1 wins');
		resetGame();
		game.state = GAME_STATE.OVER;
		drawGameOver();
	} else if (game.player2Score === game.maxScore) {
		console.log('Player 2 wins');
		resetGame();
		game.state = GAME_STATE.OVER;
		drawGameOver();
	}
}

function updateState() {
	if (ball.positionY + ball.size >= canvas.height || ball.positionY <= 0) {
		ball.velocityY = -ball.velocityY;
	}
	if ((ball.positionX - ball.size <= player1.width + 10 &&
		ball.positionY + ball.size >= player1.positionY && ball.positionY <= player1.positionY + player1.height)
	) {
		// Collision wiith player 1 paddle
		if (activated) {
			ball.velocityX = (-ball.velocityX) * 1.05;
			collisionTimeLag();
		}
	}
	else if ((ball.positionX + ball.size >= canvas.width - player2.width - 10 &&
		ball.positionY + ball.size >= player2.positionY && ball.positionY <= player2.positionY + player2.height)
	) {
		// Collision wiith player 2 paddle
		if (activated) {
			ball.velocityX = (-ball.velocityX) * 1.05;
			collisionTimeLag();
		}
	}

	setScore();
	gameOver();

	ball.positionX += ball.velocityX;
	ball.positionY += ball.velocityY;
}

// prevent collision during collision
function collisionTimeLag() {
	activated = false;
	setTimeout(() => {
		activated = true;
	}, 500);
}

// main game loop
function gameLoop() {
	if (game.state === GAME_STATE.STARTED) {
		updateKeyPresses();
		updateState();
		if (game.state !== GAME_STATE.OVER) {
			drawAll();
		}
	}
	requestAnimationFrame(gameLoop);
}

// window resize util
function updateDefault() {
	canvas.width = container.clientWidth;
	canvas.height = canvas.width * 0.6;

	ball.positionX = canvas.width / 2 - ball.size / 2;
	ball.positionY = canvas.height / 2 - ball.size / 2;

	player1.positionY = canvas.height / 2 - player1.height / 2;
	player2.positionX = canvas.width - player2.width - 10;
	player2.positionY = canvas.height / 2 - player2.height / 2;
}

function resizeHandler() {
	updateDefault();
	if (game.state === GAME_STATE.OVER) {
		drawGameOver();
	} else if (game.state !== GAME_STATE.STARTED) {
		drawGameStart();
	} else {
		drawAll();
	}
}

resizeHandler();
window.addEventListener('resize', resizeHandler);

drawGameStart();
requestAnimationFrame(gameLoop);
