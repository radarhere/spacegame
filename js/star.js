var colours = ['red','blue','green'];

function Star(type, x, y, radius, speedX, speedY, colour) {
	this.firstContact = false;
	this.selected = false;
	this.type = type;
	this.x = this.resetX = x;
	this.y = this.resetY = y;
	this.radius = radius;
	this.rotation = 0;
	this.directionX = 1;
	this.directionY = 1;
	if (typeof(speedX)==='undefined' || typeof(speedY)==='undefined') {
		this.speedX = 0;
		this.speedY = 0;
	} else {
		this.speedX = speedX;
		this.speedY = speedY;
		if (this.speedX < 0) {
			this.speedX = -this.speedX;
			this.directionX = -1;
		}
		if (this.speedY < 0) {
			this.speedY = -this.speedY;
			this.directionY = -1;
		}
	}
	this.resetSpeedX = this.speedX;
	this.resetSpeedY = this.speedY;
	this.resetDirectionX = this.directionX;
	this.resetDirectionY = this.directionY;
	this.colour = colour;
	this.reset = function() {
		this.firstContact = false;
		this.speedX = this.resetSpeedX;
		this.speedY = this.resetSpeedY;
		this.x = this.resetX;
		this.y = this.resetY;
		this.directionX = this.resetDirectionX;
		this.directionY = this.resetDirectionY;
	}
	this.draw = function() {
		var p = verticalPosition;
		var w = effectiveCanvas.width;
		var h = effectiveCanvas.height;

		if (!this.firstContact) {
			if ((this.y + this.radius) > p && (this.y - this.radius) < (p + h)) {
				this.firstContact = true;
			} else {
				return;
			}
		}

		if (!remain && (this.y + this.radius < 0 || this.y - this.radius > 18000)) {
			return 'destroy';
		}

		this.x += this.directionX*this.speedX;
		this.y += this.directionY*this.speedY;

		if (this.type == 'asteroid') {
			if (this.x + this.radius > w) {
				this.directionX = -1;
				this.x = w - this.radius;
			}
			if (this.x - this.radius < 0) {
				this.directionX = 1;
				this.x = this.radius;
			}
			if (remain) {
				if (this.y - this.radius < 0) {
					this.directionY = 1;
					this.y = this.radius;
				}
				if (this.y + this.radius > 18000) {
					this.directionY = -1;
					this.y = 18000 - this.radius;
				}
			}
		}

		if ((this.y + this.radius) > p && (this.y - this.radius) < (p + h)) {
			if (this.selected) {
				ctx.fillStyle = "rgb(0, 255, 0)";
				ctx.arc(this.x, yPoint(this.y), this.radius, - 2 * Math.PI, 0, false);
				ctx.fill();
				if (this.type == 'asteroid') {
					ctx.font = "36px";
					ctx.textAlign = "left";
					ctx.textBaseline = "bottom";
					ctx.fillStyle = "rgb(255, 255, 255)";
					ctx.fillText(this.resetSpeedX, this.x - 10, yPoint(this.y) + 10);
					ctx.fillText(this.resetSpeedY, this.x - 10, yPoint(this.y) + 35);
				}
			} else if (this.type == 'star') {
				if (this.colour == 'red') {
					ctx.drawImage(star_redImage, this.x - this.radius, yPoint(this.y) - this.radius);
				} else if (this.colour == 'green') {
					ctx.drawImage(star_greenImage, this.x - this.radius, yPoint(this.y) - this.radius);
				} else {
					ctx.drawImage(star_blueImage, this.x - this.radius, yPoint(this.y) - this.radius);
				}
			} else {
				ctx.save();
				ctx.translate(this.x, yPoint(this.y));
				//The principle here is that the faster they move vertically, the more they rotate
				this.rotation += this.directionY * this.speedY;
				if (this.rotation == 360) this.rotation = 0;
				ctx.rotate(this.rotation / 180 * Math.PI);
				ctx.drawImage(asteroidImage, -this.radius, -this.radius);
				ctx.restore();
			}
			return 'present';
		} else {
			return 'absent';
		}
	}
}