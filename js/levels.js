//The locations of the stars in Level 1 is fixed
var starPath = [
[375, 440],
[375, 605],
[375, 807.5],
[375, 987.5],
[375, 1175],
[375, 1392.5],
[375, 1617.5],
[375, 2045],
[517.5, 2187.5],
[667.5, 2337.5],
[520, 2480],
[375, 2653],
[175, 2825],
[50, 2927.5],
[50, 3612.5],
[147.5, 3612.5],
[305, 3612.5],
[425, 3612.5],
[575, 3612.5],
[700, 3612.5],
[375, 3912.5],
[375, 4152.5],
[375, 4385],
[375, 4550],
[375, 4985],
[212.5, 5180],
[375, 5180],
[537.5, 5180],
[50, 5435],
[212.5, 5435],
[375, 5435],
[537.5, 5435],
[700, 5435],
[618.5, 5667.5],
[456.5, 5667.5],
[293.5, 5667.5],
[131.5, 5667.5],
[212, 5822.5],
[375, 5822.5],
[538, 5822.5],
[300, 5977.5],
[450, 5977.5],
[375, 6072.5],
[77.5, 6860],
[220, 6987.5],
[375, 7175],
[542.5, 7310],
[700, 7467.5],
[490, 7835],
[272.5, 8075],
[375, 8435],
[375, 9072.5],
[375, 9282.5],
[375, 9425],
[375, 9597.5],
[375, 9747.5],
[115, 10272.5],
[265, 10422.5],
[460, 10617.5],
[602.5, 10760],
[580, 11210],
[467.5, 11345],
[265, 11547.5],
[115, 11697.5],
[375, 12260],
[375, 12507.5],
[357.5, 13122.5],
[375, 13505],
[375, 13992.5],
[375, 14570],
[175, 14570],
[575, 14570],
[375, 14690],
[375, 14450],
[375, 15192.5],
[375, 15425],
[375, 15620],
[375, 15775],
[175, 15825],
[575, 15825],
[275, 15925],
[475, 15925],
[375, 16025],
[375, 16617.5],
[375, 16760],
[375, 16932.5],
[375, 17090],
[175, 17125],
[575, 17125],
[275, 17225],
[475, 17225],
[375, 17325]
];

//The locations of the asteroids in Level 1 is fixed
var asteroidPath = [
[137.5, 8277.5, 0, 0],
[512.5, 9680, 5, 0],
[242.5, 9515, -5, 0]
[618.75, 10515, -4, 0],
[618.75, 12627.5, -3, 0],
[131.25, 12807.5, 3, 0],
[618.75, 12950, -3, 0],
[490, 14247.5, -2, 2],
[212.5, 14150, 2, 2],
[70, 16992.5, 0, 0],
[670, 16992.5, 0, 0],
[145, 16445, 4, -4],
[131.25, 16027.5, 5, 0],
[370, 15097.5, 0, 0],
[587.5, 14855, -2, 3],
[85, 14705, 2, 2],
[580, 13705, 0, 0],
[137.5, 13317.5, 0, 0],
[122.5, 13040, 3, -4],
[618.75, 12012.5, 0, 0],
[377.5, 12012.5, 0, 0],
[131.25, 12012.5, 0, 0],
[385, 11802.5, 0, 0],
[537.5, 10992.5, 4, 0],
[212.5, 10992.5, -2, 0],
[377.5, 10992.5, 0, 0],
[377.5, 9935, 0, 0],
[537.5, 8562.5, -3, 3],
[375, 8782.5, 0, -3],
[377.5, 6807.5, 0, -2],
[700, 6080, -3, -3],
[50, 6080, 3, -3],
[618.75, 4730, -1, 0],
[212.5, 4475, 1, 0],
[618.75, 4257.5, -3, 0],
[131.25, 4032.5, 3, 0],
[618.75, 3237.5, -3, 0],
[131.25, 3237.5, 3, 0],
[212.5, 1077.5, 0, 0],
[618.75, 325, 0, 0]
];

//Set the location of all objects in Level 1
var level1Stars = new Array();
for (i in starPath) {
	level1Stars.push(
		new Star('star',
			starPath[i][0],
			starPath[i][1],
			14.5,
			0,
			0,
			colours[Math.floor(Math.random() * colours.length)])
	);
}
for (j in asteroidPath) {
	level1Stars.push(
		new Star('asteroid',
			asteroidPath[j][0],
			asteroidPath[j][1],
			30,
			asteroidPath[j][2],
			asteroidPath[j][3])
	);
}

var level2Stars = new Array();
var level3Stars = new Array();
var level4Stars = new Array();
var level5Stars = new Array();

function generateStars(level, m, n, limit) {
	//The 'limit' is how far into the level objects can be found
	//In Level 5, the objects should stop before Earth
	if (limit == undefined) limit = 17250;

	starLimit = limit;
	asteroidLimit = limit - 200;
	for (i = 0; i < m; i++) {
		level.push(
			new Star('star',
					Math.floor((Math.random()*500)+100),
					Math.floor((Math.random()*starLimit)+250),
					14.5,
					0,
					0,
					colours[Math.floor(Math.random() * colours.length)])
		);
	}
	for (var i = 0; i < n; i++) {
		level.push(
			new Star('asteroid',
					Math.floor((Math.random()*500)+100),
					Math.floor((Math.random()*asteroidLimit)+450),
					30,
					Math.floor((Math.random()*10)-5),
					Math.floor((Math.random()*10)-5))
		);
	}
}

generateStars(level2Stars, 60, 50);
generateStars(level3Stars, 60, 60);
generateStars(level4Stars, 50, 60);
generateStars(level5Stars, 80, 70, 16000);

var levelStars = [level1Stars, level2Stars, level3Stars, level4Stars, level5Stars];