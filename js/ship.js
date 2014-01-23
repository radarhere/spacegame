/* There was an interesting problem in considering how to detect collisions with the ship, as the ship is not a circle,
and it's not exactly a triangle either.

In the end, the decision was made to place different 'sensor' points around the edge of the shape. If one of those points,
here listed as coords for a horizontal or vertical orientation, and rotatedCoords for a diagonal orientations, enters an object
then it is considered a collision.

Stars and asteroids are treated as circles */

function Hero() {
	this.width = 100;
	this.height = 100;
	this.speed = 7.5;
	this.engines = false;
	this.rotate = 0;
	this.collision = false;
	this.flicker = 0;
	this.coords = [
		//Top bottom
		[0,20],
		[0,-50],
		//Left right
		[-30,15], [30,15],
		[-30,10], [30,10],
		//Midpoints
		[-14,-6], [14,-6],
		//Further midpoints
		[22,3], [-22,3], [7,-28], [-7,-28]
	];
	this.rotatedCoords = [
		//Top bottom
		[-14, 14],
		[35, -35],
		//Left right
		[-31, -10], [10, 31],
		[-28, -14], [14, 28],
		//Midpoints
		[-5, -14], [14, 5],
		//Further midpoints
		[13, 17], [-17, -13], [24, -14], [14, -24]
	];
	this.reset = function () {
		this.x = effectiveCanvas.width / 2;
		this.y = effectiveCanvas.height / 4;
		this.rotate = 0;
	}
	this.draw = function () {
		if (this.collision) {
			this.flicker += 1;
			if (this.flicker == 3) this.flicker = 0;
			if (this.flicker != 0) return;
		}

		var x = this.x;
		var y = 500 - this.relativeY - hyperdriveOffset;

		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(Math.PI / 4 * this.rotate);

		if (this.engines) {
			ctx.drawImage(enginesImage, -this.width / 2, -this.height / 2);
		} else {
			ctx.drawImage(heroImage, -this.width / 2, -this.height / 2);
		}

		ctx.restore();
	}
	this.fireEngines = function () {
		this.engines = true;
		if (37 in keysDown && !(39 in keysDown)) {
			if (38 in keysDown && !(40 in keysDown)) {
				this.rotate = 7;
			} else if (40 in keysDown && !(38 in keysDown)) {
				this.rotate = 5;
			} else {
				this.rotate = 6;
			}
		} else if (39 in keysDown && !(37 in keysDown)) {
			if (38 in keysDown && !(40 in keysDown)) {
				this.rotate = 1;
			} else if (40 in keysDown && !(38 in keysDown)) {
				this.rotate = 3;
			} else {
				this.rotate = 2;
			}
		} else if (40 in keysDown && !(38 in keysDown)) {
			this.rotate = 4;
		} else if (38 in keysDown && !(40 in keysDown)) {
			this.rotate = 0;
		} else if (38 in keysDown) {
			//Mashing all the arrow keys at once returns the ship normal
			this.rotate = 0;
		} else {
			this.engines = false;
		}

		if (38 in keysDown) {
			this.y += this.speed;
		}
		if (40 in keysDown) {
			this.y -= this.speed;
		}
		this.calculatePosition();

		if (37 in keysDown) {
			this.x -= this.speed;
		}
		if (39 in keysDown) {
			this.x += this.speed;
		}
		if (this.x + this.width / 2 > effectiveCanvas.width) {
			this.x = effectiveCanvas.width - this.width / 2;
		}
		if (this.x < this.width / 2) {
			this.x = this.width / 2;
		}
	}
	this.calculatePosition = function () {
		if (this.y + this.height / 2 > 17500 + effectiveCanvas.height) {
			//Vanishing off the top
			this.y = verticalPosition + effectiveCanvas.height - this.height / 2;
		} else if (this.y < this.height / 2) {
			//Vanishing off the bottom
			this.y = this.height / 2;
		}

		if (this.y < effectiveCanvas.height / 2) {
			verticalPosition = 0;
			this.relativeY = this.y;
		} else if (this.y > 17500 + effectiveCanvas.height / 2) {
			verticalPosition = 17500;
			this.relativeY = this.y - verticalPosition;
		} else {
			this.relativeY = effectiveCanvas.height / 2;
			verticalPosition = this.y - effectiveCanvas.height / 2;
		}
	}
}

var hero = new Hero();