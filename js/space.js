var verticalPosition = 0;

function yPoint(y) {
	return effectiveCanvas.height - y + verticalPosition;
}

function drawBlack() {
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(0, 0, effectiveCanvas.width, effectiveCanvas.height);
}

function drawWhite() {
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fillRect(0, 0, effectiveCanvas.width, effectiveCanvas.height);
}

function drawStars() {
	var y = 18000 - verticalPosition;
	if (gate != null) y -= hyperdriveOffset
	ctx.drawImage(backgroundImages[level-1], 0, y, 750, 500, 0, 0, 750, 500);
}

//Draw the background
function drawSpace() {
	drawBlack();
	drawStars();
}

function fadeToWhite() {
	ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	ctx.fillRect(0, 0, effectiveCanvas.width, effectiveCanvas.height);
}

function fadeFromWhite(time) {
	var percentage = 1 - time;
	ctx.fillStyle = "rgba(255, 255, 255, "+percentage.toString()+")";
	ctx.fillRect(0, 0, effectiveCanvas.width, effectiveCanvas.height);
}

function fadeInText() {
	var words = ['TWO','THREE','FOUR','FIVE'];
	var names = ['ANDROMEDA','THE MILKY WAY','ALPHA CENTAURI','EARTH'];

	ctx.font = "84px";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
	ctx.fillText("LEVEL "+words[level-1], 375, 200);
	ctx.fillText(names[level-1], 375, 300);
}

var spinHyperdrive = [
	[20, function () { hyperdriveOffset += 1; drawStars(); }],
	[5, function () { hyperdriveOffset += 2; drawStars(); }],
	[10, function () { hyperdriveOffset += 7; drawStars(); }],
	[8, function () { hyperdriveOffset += 42; drawStars(); }],
	[34, function () {
		hyperdriveOffset += 3;
		if (timePosition % 5 == 0) {
			fadeToWhite();
		}
	}],
	[30, function () {
		if (timePosition % 5 == 0) {
			fadeInText();
		}
	}],
	[1, function () {
		loadLevel(level+1);
	}],
	[119, function () {
		//wait
	}],
	[30, function () {
		if (timePosition % 5 == 0) {
			fadeToWhite();
		}
	}],
	[1, function () {
		resetGame();
		hyperdrive = true;

		hyperdriveOffset = 0;
		hero.engines = false;
		hero.calculatePosition();
		if (gate != null) gate.locked = false;
	}],
	[90, function (time) {
		drawObjectsInSpace();
		fadeFromWhite(time);
	}, true],
	[null, function() {
		hyperdrive = false;
	}]
];

var fadeOut = [
	[70, function () {
		//wait
		currentTheme.volume = (100 - timePosition) / 100;
	}],
	[30, function () {
		if (timePosition % 5 == 0) {
			fadeToWhite();
		}
		currentTheme.volume = (100 - timePosition) / 100;
	}]
];

var noPlaceLikeHome = [
	[70, function () {
		//wait
		currentTheme.volume = (100 - timePosition) / 100;
	}],
	[30, function () {
		if (timePosition % 5 == 0) {
			fadeToWhite();
		}
		currentTheme.volume = (100 - timePosition) / 100;
	}],
	[200, function () {
		if ((timePosition == 110 || timePosition == 170 || timePosition == 230 || timePosition == 290) && lives > 0) {
			if (lives == 1) {
				lives = -1;
				timePosition = 290;
			} else {
				lives -= 1;
			}
			score += 1000;
			playSound('extraLife');
		}
	}],
	[1, function () {
		hyperdriveOffset = 0;
	}]
];

var endScreen = [
	[1, function () {
		currentTheme.pause();
		currentTheme.volume = 1;
		name = '';
		scores = null;
		getScores();
	}],
	[29, function () {
		//wait
	}],
	[null, function() {
		highScores = true;
	}]
];
fadeOut = fadeOut.concat(endScreen);
noPlaceLikeHome = noPlaceLikeHome.concat(endScreen);