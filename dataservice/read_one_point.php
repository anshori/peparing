<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$objectgid = $_GET['gid'];
// $objectgid = 1;
$geojson = array(
	 'type'      => 'FeatureCollection',
	 'features'  => array()
);
try {
	$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbcon->prepare("SELECT gid, id, enumerator, dusun, desa, kecamatan, kabkot, koordinat_info, ketinggian, foto_nama, foto_arahhadap, foto_info, tanggal_kejadian, jam_kejadian, hari_pasaran, public.ST_AsGeoJSON(public.ST_Transform((geom),4326),6) AS geojson FROM data_point WHERE gid = :gid");
	$stmt->bindValue(":gid", $objectgid, PDO::PARAM_INT);
	if($stmt->execute()){
		$id_count = 0;
		while($rowset = $stmt->fetch(PDO::FETCH_ASSOC)){
			$properties = $rowset;
			unset($properties['geojson']);
			unset($properties['geom']);
				$feature = array(
						 'type' => 'Feature',
						 'id' => $id_count,
						 'properties' => $properties,
						 'geometry' => json_decode($rowset['geojson'], true)
				);
			array_push($geojson['features'], $feature);
			$id_count++;
		}
		header('Content-Type: application/json');
		echo json_encode($geojson, JSON_NUMERIC_CHECK);
		$dbcon = null;
		exit;
	} else {
		header('Content-Type: application/json');
		echo json_encode($geojson, JSON_NUMERIC_CHECK);
		$dbcon = null;
		exit;
	}
} catch (PDOException $e) {
	header('Content-Type: application/json');
	echo json_encode($geojson, JSON_NUMERIC_CHECK);
	$dbcon = null;
	exit;
}
?>