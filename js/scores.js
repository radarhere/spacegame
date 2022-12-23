var highScorePosition;
var highScoreId = null;
var name;
var scores;
var nameFlicker = 0;

function drawScores() {
	ctx.font = "96px";
	ctx.textBaseline = "bottom";
	ctx.fillStyle = "rgb(0, 0, 0)";

	highScorePosition = null;
	var i = 0;
	var nameText, scoreText;
	for (nameText in scores) {
		scoreText = scores[nameText].toString();
		nameText = nameText.substr(0, 3);

		i += 1;
		ctx.textAlign = "left";
		if (nameText == '___') {
			highScorePosition = i;

			ctx.fillStyle = "rgb(200, 0, 0)";
			if (name.length < 3) {
				nameFlicker += 1;
				if (nameFlicker > 60) {
					nameFlicker = 0;
				} else if (nameFlicker < 30) {
					var blank;
					if (name.length == 0) {
						blank = '';
					} else if (name.length == 1) {
						blank = ' ';
					} else if (name.length == 2) {
						blank = '  ';
					}
					ctx.fillText(blank+'_', 75, 120 + i * 80);
				}
			}
			ctx.fillText(name, 75, 150 + i * 80);
			ctx.fillStyle = "rgb(0, 0, 0)";
		} else {
			ctx.fillText(nameText, 75, 150 + i * 80);
		}
		ctx.textAlign = "right";
		ctx.fillText(scoreText, 675, 150 + i * 80);
	}
}

function acceptKey(eKeyCode) {
	var character = String.fromCharCode(eKeyCode);
	if (character.search(/[A-Z]/)) {
		return;
	}
	name += character;

	ctx.font = "76px";
	ctx.textAlign = "left";
	ctx.fillText(name, 75, 150 + highScorePosition * 80);

	if (name.length > 2) {
		highScorePosition = null;

		name = name.substr(0, 3);

		saveScore(name);
	}
}

function saveScore(name) {
	fetch('ajax/scores.php?name='+name+'&id='+highScoreId).then(response => response.json()).then(data => {
		scores = data["scores"];
		highScoreId = null;
	});
}

function getScores() {
	fetch('ajax/scores.php?score='+score+'&level='+level).then(response => response.json()).then(data => {
		scores = data["scores"];
		highScoreId = data["id"];
		nameFlicker = 0;
	});
}