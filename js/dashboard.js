//Dashboard
function drawDashboard(hero) {
	ctx.fillStyle = "rgb(100, 100, 100)";
	ctx.fillRect(0, effectiveCanvas.height, effectiveCanvas.width, 60);

	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(230, 505, 510, 45);

	drawLives();

	drawConsole("Score: "+score.toString());

	drawDial(50, 530, 20, (hero.x - 50) / 650 * 360 - 180, 'rgb(151, 235, 96)');
	drawDial(120, 530, 20, (hero.relativeY - 50) / 400 * 360 - 180, 'rgb(73, 198, 255)');
	drawDial(190, 530, 20, (hero.y - 100) / 17900 * 360 - 180, 'rgb(255, 78, 29)');
}

function drawLives() {
	if (lives > 3) ctx.drawImage(heroImage, 550, 507, 50, 50);
	if (lives > 2) ctx.drawImage(heroImage, 590, 507, 50, 50);
	if (lives > 1) ctx.drawImage(heroImage, 630, 507, 50, 50);
	if (lives > 0) ctx.drawImage(heroImage, 670, 507, 50, 50);
}

function drawDial(x, y, radius, angle, colour) {
	ctx.beginPath();
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.arc(x, y, radius, (angle / 180 - 2) * Math.PI, angle / 180 * Math.PI, false);
	ctx.fill();
	ctx.strokeStyle = colour;
	ctx.lineWidth = 2;
	ctx.lineTo(x, y);
	ctx.stroke();
}

function drawConsole(text) {
	ctx.font = "32px Arial";
	ctx.textAlign = "left";
	ctx.textBaseline = "bottom";
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fillText(text, 250, 545);
}

function drawGameOver() {
	var gameOverText;
	var fontSize;
	var y;
	if (lives == 0) {
		gameOverText = 'GAME OVER';
		fontSize = '96px Arial';
		y = 150;
	} else {
		gameOverText = 'CONGRATULATIONS';
		fontSize = '64px Arial';
		y = 120;
	}

	ctx.font = fontSize;
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillText(gameOverText, 375, y);

	ctx.font = "46px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillText("PRESS RETURN TO TRY AGAIN", 375, 450);
}