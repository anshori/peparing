<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
if (isset($_GET['command'])) {
	if ($_GET['command']=="UPDATE") {
		$gid = $_GET['gid'];
		$id = $_GET['id'];
		$enumerator = $_GET['enumerator'];
		$dusun = $_GET['dusun'];
		$desa = $_GET['desa'];
		$kecamatan = $_GET['kecamatan'];
		$kabkot = $_GET['kabkot'];
		$koordinat_info = $_GET['koordinat_info'];
		$ketinggian = $_GET['ketinggian'];
		$foto_nama = $_GET['foto_nama'];
		$foto_arahhadap = $_GET['foto_arahhadap'];
		$foto_info = $_GET['foto_info'];
		$tanggal_kejadian = $_GET['tanggal_kejadian'];
		$jam_kejadian = $_GET['jam_kejadian'];
		$hari_pasaran = $_GET['hari_pasaran'];
		$tanggal_update = $_GET['tanggal_update'];
		try {
			$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
			$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$stmt = $dbcon->prepare("UPDATE data_point SET id = :id, enumerator = :enumerator, dusun = :dusun, desa = :desa, kecamatan = :kecamatan, kabkot = :kabkot, koordinat_info = :koordinat_info, ketinggian = :ketinggian, foto_nama = :foto_nama, foto_arahhadap = :foto_arahhadap, foto_info = :foto_info, tanggal_kejadian = :tanggal_kejadian, jam_kejadian = :jam_kejadian, hari_pasaran = :hari_pasaran, tanggal_update = :tanggal_update WHERE gid = :gid");			
			$stmt->bindValue(":gid", $gid, PDO::PARAM_INT);
			$stmt->bindValue(":id", $id, PDO::PARAM_STR);
			$stmt->bindValue(":enumerator", $enumerator, PDO::PARAM_STR);
			$stmt->bindValue(":dusun", $dusun, PDO::PARAM_STR);
			$stmt->bindValue(":desa", $desa, PDO::PARAM_STR);
			$stmt->bindValue(":kecamatan", $kecamatan, PDO::PARAM_STR);
			$stmt->bindValue(":kabkot", $kabkot, PDO::PARAM_STR);
			$stmt->bindValue(":koordinat_info", $koordinat_info, PDO::PARAM_STR);
			$stmt->bindValue(":ketinggian", $ketinggian, PDO::PARAM_STR);
			$stmt->bindValue(":foto_nama", $foto_nama, PDO::PARAM_STR);
			$stmt->bindValue(":foto_arahhadap", $foto_arahhadap, PDO::PARAM_STR);
			$stmt->bindValue(":foto_info", $foto_info, PDO::PARAM_STR);
			$stmt->bindValue(":tanggal_kejadian", $tanggal_kejadian, PDO::PARAM_STR);
			$stmt->bindValue(":jam_kejadian", $jam_kejadian, PDO::PARAM_STR);
			$stmt->bindValue(":hari_pasaran", $hari_pasaran, PDO::PARAM_STR);
			$stmt->bindValue(":tanggal_update", $tanggal_update, PDO::PARAM_STR);
			if($stmt->execute()){
				$response = array("response"=>"200","message"=>"updated");
				header('Content-Type: application/json');
				echo json_encode($response);
				$dbcon = null;
				exit;
			} else {
				$response = array("response"=>"500","message"=>$e->getMessage());
				header('Content-Type: application/json');
				echo json_encode($response);
				$dbcon = null;
				exit;
			}
		} catch (PDOException $e) {
			$response = array("response"=>"500","message"=>$e->getMessage());
			header('Content-Type: application/json');
			echo json_encode($response);
			$dbcon = null;
			exit;
		}
	} else {
		$response = array("response"=>"404","message"=>"Command is not properly set.");
		header('Content-Type: application/json');
		echo json_encode($response);
		$dbcon = null;
		exit;
	}
} else {
	$response = array("response"=>"404","message"=>"Command is not properly set.");
	header('Content-Type: application/json');
	echo json_encode($response);
	$dbcon = null;
	exit;
}
?>