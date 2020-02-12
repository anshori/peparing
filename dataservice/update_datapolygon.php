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
		$material_longsor = $_GET['material_longsor'];
		$tipe_batuan = $_GET['tipe_batuan'];
		$proses_longsor = $_GET['proses_longsor'];
		$kecepatan_luncuran = $_GET['kecepatan_luncuran'];
		$kemiringan_lereng = $_GET['kemiringan_lereng'];
		$penggunaanlahan = $_GET['penggunaanlahan'];
		$tipe_vegetasi = $_GET['tipe_vegetasi'];
		$penyebab_longsor = $_GET['penyebab_longsor'];
		$panjang_m_longsor = $_GET['panjang_m_longsor'];
		$lebar_m_longsor = $_GET['lebar_m_longsor'];
		$kedalaman_m_longsor = $_GET['kedalaman_m_longsor'];
		$volume_m3 = $_GET['volume_m3'];
		$tanggal_update = $_GET['tanggal_update'];
		try {
			$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
			$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$stmt = $dbcon->prepare("UPDATE data_polygon SET id = :id, enumerator = :enumerator, material_longsor = :material_longsor, tipe_batuan = :tipe_batuan, proses_longsor = :proses_longsor, kecepatan_luncuran = :kecepatan_luncuran, kemiringan_lereng = :kemiringan_lereng, penggunaanlahan = :penggunaanlahan, tipe_vegetasi = :tipe_vegetasi, penyebab_longsor = :penyebab_longsor, panjang_m_longsor = :panjang_m_longsor, lebar_m_longsor = :lebar_m_longsor, kedalaman_m_longsor = :kedalaman_m_longsor, volume_m3 = :volume_m3, tanggal_update = :tanggal_update WHERE gid = :gid");
			$stmt->bindValue(":gid", $gid, PDO::PARAM_INT);
			$stmt->bindValue(":id", $id, PDO::PARAM_STR);
			$stmt->bindValue(":enumerator", $enumerator, PDO::PARAM_STR);
			$stmt->bindValue(":material_longsor", $material_longsor, PDO::PARAM_STR);
			$stmt->bindValue(":tipe_batuan", $tipe_batuan, PDO::PARAM_STR);
			$stmt->bindValue(":proses_longsor", $proses_longsor, PDO::PARAM_STR);
			$stmt->bindValue(":kecepatan_luncuran", $kecepatan_luncuran, PDO::PARAM_STR);
			$stmt->bindValue(":kemiringan_lereng", $kemiringan_lereng, PDO::PARAM_STR);
			$stmt->bindValue(":penggunaanlahan", $penggunaanlahan, PDO::PARAM_STR);
			$stmt->bindValue(":tipe_vegetasi", $tipe_vegetasi, PDO::PARAM_STR);
			$stmt->bindValue(":penyebab_longsor", $penyebab_longsor, PDO::PARAM_STR);
			$stmt->bindValue(":panjang_m_longsor", $panjang_m_longsor, PDO::PARAM_STR);
			$stmt->bindValue(":lebar_m_longsor", $lebar_m_longsor, PDO::PARAM_STR);
			$stmt->bindValue(":kedalaman_m_longsor", $kedalaman_m_longsor, PDO::PARAM_STR);
			$stmt->bindValue(":volume_m3", $volume_m3, PDO::PARAM_STR);
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