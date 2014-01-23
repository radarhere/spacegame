var asteroidRebound = new Audio('effects/asteroidRebound.wav');
asteroidRebound.volume = 0.3;

var collectStar = new Audio('effects/collectStar.wav');
collectStar.volume = 0.3;
function CollectStars() {
	this.sounds = [collectStar, collectStar.cloneNode(), collectStar.cloneNode()];
	this.i = 0;
	this.play = function() {
		this.sounds[this.i].play();
		this.i++;
		if (this.i == 3) this.i = 0;
	}
}
collectStars = new CollectStars();

var activateHyperdrive = new Audio('effects/activateHyperdrive.wav');
var loseLife = new Audio('effects/loseLife.wav');
loseLife.volume = 0.5;
var extraLife = new Audio('effects/extraLife.wav');
extraLife.volume = 0.5;
var gameOver = new Audio('effects/gameOver.wav');
gameOver.volume = 0.6;
var theme = [];
var currentTheme = null;

var sounds = [asteroidRebound, collectStar, activateHyperdrive, extraLife, gameOver];

function muted() {
	return document.getElementById('sound').className == 'muted';
}

function playSound(cue) {
	if (muted()) return;

	if (cue == 'asteroidRebound') {
		asteroidRebound.play();
	} else if (cue == 'collectStar') {
		collectStars.play();
	} else if (cue == 'activateHyperdrive') {
		activateHyperdrive.play();
	} else if (cue == 'loseLife') {
		loseLife.play();
	} else if (cue == 'extraLife') {
		extraLife.play();
	} else if (cue == 'gameOver') {
		gameOver.play();
	}
}