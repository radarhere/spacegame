var gate = null;

function Gate(x, y) {
	this.x = x;
	this.y = y;
	this.radius = 75;
	this.locked = false;
	this.draw = function() {
		var h = effectiveCanvas.height;
		var p = verticalPosition;

		if ((this.y + this.radius) > p && (this.y - this.radius) < (p + h)) {
			ctx.drawImage(gateRingImage, this.x - this.radius, yPoint(this.y) - this.radius);
			if (timePosition != null && autopilot) {
				currentTheme.volume = timePosition * -1 / 100;
				ctx.globalAlpha = (timePosition + 100) / 100;
				ctx.drawImage(gatePlatformImage, this.x - this.radius, yPoint(this.y) - this.radius);
				ctx.globalAlpha = 1;
			} else if (this.locked) {
				ctx.drawImage(gatePlatformImage, this.x - this.radius, yPoint(this.y) - this.radius);
			}
			return 'present';
		} else {
			return 'absent';
		}
	}
	this.drawInShip = function() {
		if (hero.x - 1 > this.x) {
			hero.x -= 1;
		} else if (hero.x + 1 < this.x) {
			hero.x += 1;
		} else if (hero.x != this.x) {
			hero.x = this.x;
		}
		if (hero.y - 1 > this.y) {
			hero.y -= 1;
		} else if (hero.y + 1 < this.y) {
			hero.y += 1;
		} else if (hero.y != this.y) {
			hero.y = this.y;
		}
		hero.calculatePosition();
	}
	this.rotateShip = function () {
		if (hero.rotate - 0.05 > 0) {
			hero.rotate -= 0.05;
		} else {
			hero.rotate = 0;
		}
	}
	this.detect = function () {
		if (heroCollision(this)) {
			autopilot = true;
			timePosition = -100;
		}
	}
	this.autopilot = function () {
		if (hero.x != this.x || hero.y != this.y) {
			this.drawInShip();
		} else if (hero.rotate != 0 || timePosition != 0) {
			if (timePosition + 1 < 0) {
				timePosition += 1;
			} else {
				timePosition = 0;
			}
			this.rotateShip();
		} else {
			currentTheme.pause();
			currentTheme.volume = 1;
			playSound('activateHyperdrive');
			autopilot = false;
			hyperdrive = true;
			gate.locked = true;
			timeSequence = spinHyperdrive;
		}
	}
}