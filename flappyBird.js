var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// load images

var bird = new Image();
var background = new Image();
var foreground = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
background.src = "images/bg.png";
foreground.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// some variables

var gap = 120;
var constant;

var birdX = 10;
var birdY = 150;

var gravity = 1.7;

var score = 0;

// audio files

var fly = new Audio();
var scorePlusOne = new Audio();

fly.src = "sounds/fly.mp3";
scorePlusOne.src = "sounds/score.mp3";

// on key press

document.addEventListener("keydown", moveUp);

function moveUp() {
	birdY -= 25;
	//fly.play();
}

// pipe coordinates 

var pipe = [];

pipe[0] = {
	x : canvas.width,
	y : 0
}

// draw images

function draw() {

	context.drawImage(background, 0, 0);

	for (var i = 0; i < pipe.length; i++) {

		constant = pipeNorth.height + gap;
		context.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
		context.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

		pipe[i].x--;

		if (pipe[i].x === 100) {
			pipe.push({
				x : canvas.width,
				y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
			});
		}

		function gameOver() {

			var gameOverConditions = {
				birdHitsGround : birdY + bird.height >= canvas.height - foreground.height,
				birdHitsHeadOnPipe : birdY <= pipe[i].y + pipeNorth.height,
				birdLandsOnPipe : birdY + bird.height >= pipe[i].y + constant,
				birdNoseInFrontOfLeftSideOfPipe : birdX + bird.width >= pipe[i].x,
				birdTailBehindRightSideOfPipe : birdX <= pipe[i].x + pipeNorth.width
			}

			return gameOverConditions.birdNoseInFrontOfLeftSideOfPipe &&
			 gameOverConditions.birdTailBehindRightSideOfPipe &&
					 (gameOverConditions.birdHitsHeadOnPipe || gameOverConditions.birdLandsOnPipe) ||
					 gameOverConditions.birdHitsGround;
		}

		if (gameOver()) {
			location.reload();
		}

		if (pipe[i].x === 5) {
			score++;
			scorePlusOne.play();
		}

	}


	context.drawImage(foreground, 0, canvas.height - foreground.height);

	context.drawImage(bird, birdX, birdY);

	birdY += gravity;

	context.fillStyle = "#000";
	context.font = "20px Verdana";
	context.fillText("Score: " + score, 10, canvas.height - 20);

	requestAnimationFrame(draw);

}

draw();










































