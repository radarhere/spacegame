function collision(star1, star2) {
	if (Math.sqrt(Math.pow(star1.y - star2.y,2) + Math.pow(star1.x - star2.x,2)) > star1.radius + star2.radius) return false;

	if (star1.speedX == 0) {
		star1.directionX = -star2.directionX;
	} else if (star2.speedX == 0) {
		star2.directionX = -star1.directionX;
	}
	if (star1.speedY == 0) {
		star1.directionY = -star2.directionY;
	} else if (star2.speedY == 0) {
		star2.directionY = -star1.directionY;
	}

	//Determine which side was hit - horz, vert or diag - and reverse speed accordingly
	if (star1.x > star2.x + 10) {
		star1.directionX = 1;
		star2.directionX = -1;
	} else if (star2.x > star1.x + 10) {
		star2.directionX = 1;
		star1.directionX = -1;
	}
	star1.speedY = star2.speedY = (star1.speedY + star2.speedY) / 2;
	if (star1.y > star2.y + 10) {
		star1.directionY = 1;
		star2.directionY = -1;
	} else if (star2.y > star1.y + 10) {
		star2.directionY = 1;
		star1.directionY = -1;
	}
	star1.speedX = star2.speedX = (star1.speedX + star2.speedX) / 2;

	return true;
}

function heroCollision(star) {
	var collision = false;

	var heroX_ = hero.x;
	var heroY_ = yPoint(hero.y);
	var starX_ = star.x;
	var starY_ = yPoint(star.y);

	var rotate;
	var coords;
	for (var i in hero.coords) {
		var rotate = hero.rotate;
		if (rotate % 2 == 0) {
			coords = hero.coords[i];
		} else {
			coords = hero.rotatedCoords[i];
		}
		if (rotate == 0 || rotate == 1) {
			heroX = heroX_ + coords[0];
			heroY = heroY_ + coords[1];
		} else if (rotate == 2 || rotate == 3) {
			heroX = heroX_ - coords[1];
			heroY = heroY_ + coords[0];
		} else if (rotate == 4 || rotate == 5) {
			heroX = heroX_ - coords[0];
			heroY = heroY_ - coords[1];
		} else if (rotate == 6 || rotate == 7) {
			heroX = heroX_ + coords[1];
			heroY = heroY_ - coords[0];
		}

		starX = starX_ - heroX;
		starY = starY_ - heroY;
		if (star.radius >= Math.sqrt(Math.pow(starY,2) + Math.pow(starX,2))) {
			collision = true;
			break;
		}
	}
	return collision;
}