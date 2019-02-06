<?php
/*
Table structure is as follows:

CREATE TABLE IF NOT EXISTS `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(3) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)
*/

$data = ['id'=>null];
$scores = [];

$username = null;
$password = null;
$database = null;

if ($username != null) {
	try {
		$dbh = new PDO('mysql:host=localhost;dbname='.$database, $username, $password);
	} catch (PDOException $_) {
		exit();
	}

	if (isset($_GET['name']) && isset($_GET['id'])) {
		$sth = $dbh->prepare('UPDATE `scores` SET name = ? WHERE id = ?');
		$sth->execute([$_GET['name'], $_GET['id']]);
	} else if (isset($_GET['score']) && isset($_GET['level']) && $_GET['score'] != 0) {
		$sth = $dbh->prepare('INSERT INTO `scores` (score, level, ip) VALUES (?, ?, ?)');
		$sth->execute([$_GET['score'], $_GET['level'], $_SERVER['SERVER_ADDR']]);

		$currentScoreId = $dbh->lastInsertId();
	}

	if (!empty($currentScoreId)) {
		$sth = $dbh->prepare('SELECT id, name, score FROM `scores` WHERE name IS NOT NULL OR id = ? ORDER BY score DESC, dateCreated ASC LIMIT 3');
		$sth->execute([$currentScoreId]);
	} else {
		$sth = $dbh->prepare('SELECT id, name, score FROM `scores` WHERE name IS NOT NULL ORDER BY score DESC, dateCreated ASC LIMIT 3');
		$sth->execute();
	}
	$i = 0;

	foreach ($sth->fetchAll(PDO::FETCH_ASSOC) as $row) {
		$i += 1;

		$name = $row['name'];
		if ($name == null) {
			$name = '___';
			$data['id'] = $row['id'];
		}
		$scores[$name.strval($i)] = $row['score'];
	}
}

$data['scores'] = $scores;
echo json_encode($data);
