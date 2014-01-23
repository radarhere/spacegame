var planet;

function Planet() {
	this.detect = function () {
		if (hero.y > 17575) {
			hero.rotate = 0;

			autopilot = true;
			timePosition = 0;
		}
	}
	this.autopilot = function () {
		if (hero.y + hyperdriveOffset + 120 < 18000) {
			hyperdriveOffset += 2;
			hero.calculatePosition();
		} else {
			autopilot = false;
			hyperdrive = true;
			hero.y = 17500;
			timeSequence = noPlaceLikeHome;
		}
	}
}