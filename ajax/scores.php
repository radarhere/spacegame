<?php
/*
Table structure is as follows:

CREATE TABLE IF NOT EXISTS `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(3) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `dateCreated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

I am aware that mysql_query is now deprecated. However, as the production environment of this project is out of my control, I am not presently motivated to update it.

Anyone wishing to use this code should find the upgrade simple enough.
*/

$data = array('id'=>null);
$scores = array();

$username = null;
$password = null;
$database = null;

if ($username != null) {
	mysql_connect("localhost",$username,$password);
	@mysql_select_db($database) or die();

	$currentScore = null;
	if (isset($_GET['name']) && isset($_GET['id'])) {
		mysql_query("UPDATE `scores` SET name = '".mysql_real_escape_string($_GET['name'])."' WHERE id = ".mysql_real_escape_string($_GET['id']).";");
	} else if (isset($_GET['score']) && isset($_GET['level']) && $_GET['score'] != 0) {
		mysql_query("INSERT INTO `scores` (score, level, ip) VALUES ('".mysql_real_escape_string($_GET['score'])."','".mysql_real_escape_string($_GET['level'])."','".mysql_real_escape_string($_SERVER['SERVER_ADDR'])."');");
		$currentScore = mysql_insert_id();
	}

	if ($currentScore != null) {
		$result = mysql_query("SELECT id, name, score FROM `scores` WHERE name IS NOT NULL OR id = ".mysql_real_escape_string($currentScore)." ORDER BY score DESC, dateCreated ASC LIMIT 3");
	} else {
		$result = mysql_query("SELECT id, name, score FROM `scores` WHERE name IS NOT NULL ORDER BY score DESC, dateCreated ASC LIMIT 3");
	}
	$i = 0;

	while ($row = mysql_fetch_array($result)) {
		$i += 1;

		$name = $row['name'];
		if ($name == null) {
			$name = '___';
			$data['id'] = $row['id'];
		}
		$scores[$name.strval($i)] = $row['score'];
	}
	mysql_close();
}

$data['scores'] = $scores;
echo json_encode($data);
?>