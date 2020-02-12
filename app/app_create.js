$(document).ready(function(){
	_displayMapCreate('app');
});

function _buildDigitiseModalBoxPoint (targetmodal,context,geometry) {
	targetmodal = typeof targetmodal !== 'undefined' ? targetmodal : 'modalbox';
	context = typeof context !== 'undefined' ? context : 'POINT';
	geometry = typeof geometry !== 'undefined' ? geometry : 'POINT (110.21766 -7.459129)';
	
	var htmlformcomponent = "" +
			"<input type='hidden' id='command' name='command' value='"+context+"'/>" +
			"<input type='hidden' id='geometry' name='geometry' value='"+geometry+"'/>" +
			"<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
				"<thead>" +
					"<tr>" +
						"<th colspan='2' class='text-center'>Feature Data</th>" +
					"</tr>" +
				"</thead>" +
				"<tbody>" +
					"<tr>" +
						"<td class=''>ID</td>" +
						"<td class='text-center'><input type='text' id='id' name='id' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Nama Enumerator</td>" +
						"<td class='text-center'><input type='text' id='enumerator' name='enumerator' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Geometry<br/>(in WKT)</td>" +
						"<td class='text-center'><textarea rows='5' style='width:100%;' readonly='true'>"+geometry+"</textarea></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Dusun</td>" +
						"<td class='text-center'><input type='text' id='dusun' name='dusun' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Desa</td>" +
						"<td class='text-center'><input type='text' id='desa' name='desa' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Kecamatan</td>" +
						// "<td class='text-center'><input type='text' id='kecamatan' name='kecamatan' class='form-control' value=''/></td>" +
						"<td class='text-center'>" +
							"<select class='form-control' id='kecamatan' name='kecamatan'>" +
				        "<option>Bandongan</option>" +
				        "<option>Borobudur</option>" +
				        "<option>Candimulyo</option>" +
				        "<option>Dukun</option>" +
				        "<option>Grabag</option>" +
				        "<option>Kajoran</option>" +
				        "<option>Kaliangkrik</option>" +
				        "<option>Mertoyudan</option>" +
				        "<option>Mungkid</option>" +
				        "<option>Muntilan</option>" +
				        "<option>Ngablak</option>" +
				        "<option>Ngluwar</option>" +
				        "<option>Pakis</option>" +
				        "<option>Salam</option>" +
				        "<option>Salaman</option>" +
				        "<option>Sawangan</option>" +
				        "<option>Secang</option>" +
				        "<option>Srumbung</option>" +
				        "<option>Tegalrejo</option>" +
				        "<option>Tempuran</option>" +
				        "<option>Windusari</option>" +
				      "</select>" +
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Kabupaten/ Kota</td>" +
						"<td class='text-center'><input type='text' id='kabkot' name='kabkot' class='form-control' placeholder='Magelang' value='Magelang' readonly='true'/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Informasi Lokasi</td>" +
						"<td class='text-center'>" +
						"<select class='form-control' id='koordinat_info' name='koordinat_info'>" +
			        "<option>Mahkota</option>" +
			        "<option>Tengah</option>" +
			        "<option>Kaki</option>" +
			      "</select>" +
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Ketinggian (mdpal)</td>" +
						"<td class='text-center'><input type='text' id='ketinggian' name='ketinggian' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Nama File Foto</td>" +
						"<td class=''>" +
							"<input type='text' id='foto_nama' name='foto_nama' class='form-control'>" +
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Arah Hadap Foto (&#176;)</td>" +
						"<td class='text-center'><input type='text' id='foto_arahhadap' name='foto_arahhadap' class='form-control' value='' placeholder='Isikan nilai 0 - 360'/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Informasi Foto</td>" +
						"<td class='text-center'><input type='text' id='foto_info' name='foto_info' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Tanggal Kejadian</td>" +
						"<td class='text-center'><input type='date' id='tanggal_kejadian' name='tanggal_kejadian' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Jam Kejadian</td>" +
						"<td class='text-center'><input type='text' id='jam_kejadian' name='jam_kejadian' class='form-control' value='' placeholder='HH:MM'/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Hari Pasaran</td>" +
						"<td class='text-center'><input type='text' id='hari_pasaran' name='hari_pasaran' class='form-control' value='' placeholder='Isikan jika tau'/></td>" +
					"</tr>" +
				"</tbody>" +
			"</table>" +
			"<input type='hidden' id='tanggal_input' name='tanggal_input' readonly />" +
			"<input type='hidden' id='tanggal_update' name='tanggal_update' value='-' readonly />" +
		"";
	var modalfooter = "" +
		"<button type='button' id='canceldigitize' class='btn btn-default' data-dismiss='modal' onclick='_displayMapCreate()'><i class='fa fa-power-off'></i>&nbsp;Cancel</button>" +
		"<button type='button' id='savegeometrydata' class='btn btn-primary'><i class='fa fa-floppy-o'></i>&nbsp;Save</button>" +
		"";
	$("#form_modal_body").empty();
	$("#form_modal_footer").empty().html(modalfooter);
	$("#form_modal_body").removeClass().addClass('modal-body');
	$("#form_modal_size").removeClass().addClass('modal-dialog');
	$("#form_modal_body").html(htmlformcomponent);
	$("#form_modal_label").html("<i class='fa fa-pencil'></i>&nbsp;"+context+"");
	
	$('#'+targetmodal+'').modal({show:true, backdrop:'static', keyboard:false});

	$(document).ready(function() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;       
    $("#tanggal_input").attr("value", today);
	});
}

function _buildDigitiseModalBoxPolygon (targetmodal,context,geometry) {
	targetmodal = typeof targetmodal !== 'undefined' ? targetmodal : 'modalbox';
	context = typeof context !== 'undefined' ? context : 'POLYGON';
	geometry = typeof geometry !== 'undefined' ? geometry : 'POLYGON ((110.212784 -7.500718, 110.22686 -7.504804, 110.21553 -7.50957, 110.212784 -7.500718))';
	
	var htmlformcomponent = "" +
			"<input type='hidden' id='command' name='command' value='"+context+"'/>" +
			"<input type='hidden' id='geometry' name='geometry' value='"+geometry+"'/>" +
			"<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
				"<thead>" +
					"<tr>" +
						"<th colspan='2' class='text-center'>Feature Data</th>" +
					"</tr>" +
				"</thead>" +
				"<tbody>" +
					"<tr>" +
						"<td class=''>ID</td>" +
						"<td class='text-center'><input type='text' id='id' name='id' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Enumerator</td>" +
						"<td class='text-center'><input type='text' id='enumerator' name='enumerator' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Geometry<br/>(in WKT)</td>" +
						"<td class='text-center'><textarea rows='5' style='width:100%;' readonly='true'>"+geometry+"</textarea></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Material Longsoran</td>" +
						"<td class='text-center'>" +
							"<select class='form-control' id='material_longsor' name='material_longsor'>" +
				        "<option>Tanah</option>" +
				        "<option>Batu</option>" +
				        "<option>Rombakan</option>" +
				      "</select>" +
						"</td>" +
						// "<td class='text-center'><input type='text' id='material_longsor' name='material_longsor' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Jenis Batuan</td>" +
						"<td class='text-center'>" +
							"<select class='form-control' id='tipe_batuan' name='tipe_batuan'>" +
				        "<option>Batuan Sedimen</option>" +
				        "<option>Batuan Beku</option>" +
				        "<option>Batuan Metamorf</option>" +
				      "</select>" +
						"</td>" +
						// "<td class='text-center'><input type='text' id='tipe_batuan' name='tipe_batuan' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Proses/ Jenis Longsoran</td>" +
						"<td class='text-center'>" +
							"<select class='form-control' id='proses_longsor' name='proses_longsor'>" +
				        "<option>Translasi</option>" +
				        "<option>Rotasi</option>" +
				        "<option>Rayapan</option>" +
				        "<option>Aliran Rombakan</option>" +
				        "<option>Runtuhan Batu</option>" +
				        "<option>Blok</option>" +
				      "</select>" +
						"</td>" +
						// "<td class='text-center'><input type='text' id='proses_longsor' name='proses_longsor' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Kecepatan Longsoran</td>" +
						"<td class='text-center'>" +
							"<select class='form-control' id='kecepatan_luncuran' name='kecepatan_luncuran'>" +
				        "<option>Cepat</option>" +
				        "<option>Lambat</option>" +
				      "</select>" +
						"</td>" +
						// "<td class='text-center'><input type='text' id='kecepatan_luncuran' name='kecepatan_luncuran' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Kemiringan Lereng (&#176;)</td>" +
						"<td class='text-center'><input type='text' id='kemiringan_lereng' name='kemiringan_lereng' class='form-control' value='' placeholder='0 - 90'/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Penggunaan Lahan</td>" +
						"<td class='text-center'>" +
							"<select class='form-control' id='penggunaanlahan' name='penggunaanlahan'>" +
				        "<option>Pemukiman</option>" +
				        "<option>Sawah Irigasi</option>" +
				        "<option>Sawah Tadah Hujan</option>" +
				        "<option>Tegalan/Ladang</option>" +
				        "<option>Kebun/Perkebunan</option>" +
				        "<option>Hutan</option>" +
				        "<option>Semak/Belukar</option>" +
				        "<option>Rumput/Tanah Kosong</option>" +
				        "<option>Empang</option>" +
				        "<option>Waduk</option>" +
				      "</select>" +
						"</td>" +
						// "<td class='text-center'><input type='text' id='penggunaanlahan' name='penggunaanlahan' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Tipe/Jenis Vegetasi</td>" +
						"<td class='text-center'><input type='text' id='tipe_vegetasi' name='tipe_vegetasi' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Penyebab Longsoran</td>" +
						"<td class='text-center'><input type='text' id='penyebab_longsor' name='penyebab_longsor' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Panjang Longsoran (m)</td>" +
						"<td class='text-center'><input type='text' id='panjang_m_longsor' name='panjang_m_longsor' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Lebar Longsoran (m)</td>" +
						"<td class='text-center'><input type='text' id='lebar_m_longsor' name='lebar_m_longsor' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Kedalaman Longsoran (m)</td>" +
						"<td class='text-center'><input type='text' id='kedalaman_m_longsor' name='kedalaman_m_longsor' class='form-control' value=''/></td>" +
					"</tr>" +
					"<tr>" +
						"<td class=''>Volume (m<sup>3</sup>)</td>" +
						"<td class=''><input type='hidden' id='operator' value='X'><div class='input-group mb-3'><input type='text' id='volume_m3' name='volume_m3' class='form-control'/>" +
							"<button type='button' class='btn btn-primary' onclick='calculatevolume()'>Hitung</button>" +
							"</div>" +
							"<small>Volume = 1/6 &pi; L W D</small>" +
						"</td>" +
					"</tr>" +
				"</tbody>" +
			"</table>" +
			"<input type='hidden' id='tanggal_input' name='tanggal_input' readonly />" +
			"<input type='hidden' id='tanggal_update' name='tanggal_update' value='-' readonly />" +
		"";
	var modalfooter = "" +
		"<button type='button' id='canceldigitize' class='btn btn-default' data-dismiss='modal' onclick='_displayMapCreate()'><i class='fa fa-power-off'></i>&nbsp;Cancel</button>" +
		"<button type='button' id='savegeometrydata' class='btn btn-primary'><i class='fa fa-floppy-o'></i>&nbsp;Save</button>" +
		"";
	$("#form_modal_body").empty();
	$("#form_modal_footer").empty().html(modalfooter);
	$("#form_modal_body").removeClass().addClass('modal-body');
	$("#form_modal_size").removeClass().addClass('modal-dialog');
	$("#form_modal_body").html(htmlformcomponent);
	$("#form_modal_label").html("<i class='fa fa-pencil'></i>&nbsp;"+context+"");
	
	$('#'+targetmodal+'').modal({show:true, backdrop:'static', keyboard:false});

	$(document).ready(function() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;       
    $("#tanggal_input").attr("value", today);
	});
}
function calculatevolume(){
	var l = parseFloat(document.getElementById('panjang_m_longsor').value);
	var w = parseFloat(document.getElementById('lebar_m_longsor').value);
	var d = parseFloat(document.getElementById('kedalaman_m_longsor').value);
	var oper = document.getElementById('operator').value;
  if(oper === 'X') {
    document.getElementById('volume_m3').value = (1/6)*3.14*l*w*d;
  }
}

function _activateFeatureSave () {
	$("#savegeometrydata").on('click', function(evt){
		evt.stopImmediatePropagation();
		var commandContext = $('#command').val();
		var id = $('#id').val();
		var enumerator = $('#enumerator').val();
		var geometry = $('#geometry').val();
		var dusun = $('#dusun').val();
		var desa = $('#desa').val();
		var kecamatan = $('#kecamatan').val();
		var kabkot = $('#kabkot').val();
		var koordinat_info = $('#koordinat_info').val();
		var ketinggian = $('#ketinggian').val();
		var foto_nama = $('#foto_nama').val();
		var foto_arahhadap = $('#foto_arahhadap').val();
		var foto_info = $('#foto_info').val();
		var tanggal_kejadian = $('#tanggal_kejadian').val();
		var jam_kejadian = $('#jam_kejadian').val();
		var hari_pasaran = $('#hari_pasaran').val();
		var material_longsor = $('#material_longsor').val();
		var tipe_batuan = $('#tipe_batuan').val();
		var proses_longsor = $('#proses_longsor').val();
		var kecepatan_luncuran = $('#kecepatan_luncuran').val();
		var kemiringan_lereng = $('#kemiringan_lereng').val();
		var penggunaanlahan = $('#penggunaanlahan').val();
		var tipe_vegetasi = $('#tipe_vegetasi').val();
		var penyebab_longsor = $('#penyebab_longsor').val();
		var panjang_m_longsor = $('#panjang_m_longsor').val();
		var lebar_m_longsor = $('#lebar_m_longsor').val();
		var kedalaman_m_longsor = $('#kedalaman_m_longsor').val();
		var volume_m3 = $('#volume_m3').val();
		var tanggal_input = $('#tanggal_input').val();
		var tanggal_update = $('#tanggal_update').val();
		if (commandContext == "POINT") {
			$.ajax({
				url: "./dataservice/create_point.php",
				method: "GET",
				dataType: "json",
				data: $('#dynamicform').serialize(),
				success: function (data) {
					if (data.response=="200") {
						$("#modalform").modal('hide');
						_displayMapCreate('app');
					} else {
						$("#modalform").modal('hide');
						console.log('Failed to save.');
						alert('Tidak berhasil menyimpan ke database.');
						_displayMapCreate('app');
					}
				},
				username: null,
				password: null
			});
		} else if (commandContext == "POLYGON") {
			$.ajax({
				url: "./dataservice/create_polygon.php",
				method: "GET",
				dataType: "json",
				data: $('#dynamicform').serialize(),
				success: function (data) {
					if (data.response=="200") {
						$("#modalform").modal('hide');
						_displayMapCreate('app');
					} else {
						$("#modalform").modal('hide');
						console.log('Failed to save.');
						alert('Tidak berhasil menyimpan ke database.');
						_displayMapCreate('app');
					}
				},
				username: null,
				password: null
			});
		} else {
			console.log('__undefined__');
		}
		return false;
	});
}
