var numberLoaded = 0;
var backgroundLoaded;

var gateRingImage = new Image();
gateRingImage.src = 'images/gateRing.png';
gateRingImage.onload = function () { numberLoaded++; }

var gatePlatformImage = new Image();
gatePlatformImage.src = 'images/gatePlatform.png';
gatePlatformImage.onload = function () { numberLoaded++; }

var heroImage = new Image();
heroImage.src = 'images/spaceship.png';
heroImage.onload = function () { numberLoaded++; }

var enginesImage = new Image();
enginesImage.src = 'images/spaceshipMotion.png';
enginesImage.onload = function () { numberLoaded++; }

var backgroundImages = [];

var asteroidImage = new Image();
asteroidImage.src = 'images/asteroid.png';
asteroidImage.onload = function () { numberLoaded++; }

var star_blueImage = new Image();
star_blueImage.src = 'images/star_blue.png';
star_blueImage.onload = function () { numberLoaded++; }

var star_redImage = new Image();
star_redImage.src = 'images/star_red.png';
star_redImage.onload = function () { numberLoaded++; }

var star_greenImage = new Image();
star_greenImage.src = 'images/star_green.png';
star_greenImage.onload = function () { numberLoaded++; }