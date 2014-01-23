//Universe
var ctx;
var effectiveCanvas;
var invincible = false;

var autopilot = false;
var hyperdrive = false;
var hyperdriveOffset = 0;
var timePosition = null;
var timeSequence = null;

var remain;

var levelLimit = 5;
var highScores = false;
var stars;

var slowTime = null;

var playTheme = false;

//Score
var level;
var score;
var lives;

//Keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	if (highScores && e.keyCode == 13) { highScores = false; resetScore(); resetGame(); }
	if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) e.preventDefault();
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

function drawObjects() {
	var star;
	var starState;
	var gameOver = false;
	var starsInPlay = [];
	var safe = true;
	for (var i in stars) {
		star = stars[i];
		starState = star.draw();

		if (starState == 'destroy') {
			stars.splice(i, 1);
			i--;
		} else if (starState == 'present') {
			if (timePosition == null && heroCollision(star)) {
				if (star.type == 'star') {
					stars.splice(i, 1);
					i--;
					score += 100;
					if (score % 5000 == 0 && lives < 4) {
						lives += 1;
						playSound('extraLife');
					} else {
						playSound('collectStar');
					}
				} else if (star.type == 'asteroid') {
					if (!invincible) {
						safe = false;
						if (!hero.collision) {
							lives -= 1;
							if (lives != 0) {
								playSound('loseLife');
								slowTime = 5;
								hero.collision = true;
							} else {
								playSound('gameOver');
								gameOver = true;
							}
						}
					}
				}
			}
			if (star.type == 'asteroid') {
				for (var j in starsInPlay) {
					if (collision(star,starsInPlay[j])) {
						playSound('asteroidRebound');
					}
				}
				starsInPlay.push(star);
			}
		}
	}
	if (hero.collision && safe) {
		hero.collision = false;
		hero.flicker = 0;
		invincible = true;
	}
	if (gameOver) {
		hyperdrive = true;
		timePosition = 0;
		timeSequence = fadeOut;
	}
}

function advanceTime() {
	if (timePosition == null || timeSequence == null) return;

	timePosition += 1;

	var time, action, wearingAWatch;
	var clockTime = 0;
	for (i in timeSequence) {
		time = timeSequence[i][0];
		action = timeSequence[i][1];
		wearingAWatch = timeSequence[i][2] != undefined;

		if (time == null) {
			action();
			timePosition = null;
			break;
		} else if (clockTime + time > timePosition) {
			if (wearingAWatch) {
				action((timePosition - clockTime) / time);
			} else {
				action();
			}
			break;
		}
		clockTime += time;
	}

	if (timePosition == null) timeSequence = null;
}

function drawObjectsInSpace() {
	drawSpace();

	drawObjects();

	if (gate != null) gate.draw();

	hero.draw();
}

function update() {
	if (numberLoaded != 8 || !backgroundLoaded) return;

	if (slowTime != null) {
		slowTime -= 1;
		if (hero.collision) {
			if (slowTime % 5 != 0) {
				return;
			} else {
				slowTime = 5;
			}
		} else {
			slowTime -= 1;
			if (slowTime < -70) {
				slowTime = null;
				invincible = false;
			}
		}
	}

	if (highScores) {
		if (highScorePosition != null) {
			for (var i in keysDown) {
				delete keysDown[i];
				acceptKey(i);
			}
		}
		drawWhite();
		drawGameOver();
		drawScores();
		return;
	}

	ctx.beginPath();

	advanceTime();

	//Draw background
	if (hyperdrive) {
		//Draw hero
		if (hyperdriveOffset != 0) hero.draw();
	} else {
		if (autopilot) {
			if (level == 5) {
				planet.autopilot();
			} else {
				gate.autopilot();
			}
		}

		if (timePosition == null) hero.fireEngines();

		drawObjectsInSpace();
	}

	if (timePosition == null) {
		if (gate != null) {
			gate.detect();
		} else if (level == 5) {
			planet.detect();
		}
	}

	//Draw dashboard
	drawDashboard(hero);

	if (playTheme) {
		playTheme = false;
		if (!muted()) currentTheme.play();
	}
}

function loadLevel(x) {
	level = x;

	remain = level > 3;

	if (level <= backgroundImages.length) {
		currentTheme = theme[x-1];
		return;
	}

	backgroundLoaded = false;
	var image = new Image();
	image.src = 'images/level'+level.toString()+'.png';
	image.onload = function () { backgroundImages.push(image); backgroundLoaded = true; }

	currentTheme = new Audio('effects/level'+level.toString()+'.mp3');
	theme.push(currentTheme);
	currentTheme.loop = true;
}

function resetGame() {
	hyperdrive = false;

	stars = levelStars[level-1].slice(0);
	for (var i in stars) {
		stars[i].reset();
	}

	if (level == levelLimit) {
		gate = null;
		planet = new Planet();
	} else if (gate == null) {
		gate = new Gate(375,17750);
	}

	hero.reset();

	playTheme = true;
}

function resetScore() {
	loadLevel(1);
	score = 0;
	lives = 3;
}

window.onload = function() {
	var canvas = document.getElementById('game');
	effectiveCanvas = {width:canvas.width,height:canvas.height - 60};

	if (canvas.getContext) {
		ctx = canvas.getContext('2d');

		resetScore();
		resetGame();

		setInterval(update, 17);
	} else {
		alert('Your browser does not support this game.');
	}
}