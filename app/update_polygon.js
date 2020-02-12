function _displayMapUpdatePolygon (divtarget) {
	divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
	document.getElementById(divtarget).innerHTML = "<div id='map' class='map-wrapper'></div>";
	
	var map, isCollapsed, Google_Terrain, Google_Satellite, openStreetMaps;
	if (document.body.clientWidth <= 767) {
		isCollapsed = true;
	} else {
		isCollapsed = false;
	}

	var promisePoint = $.ajax({
		url: "./dataservice/read_point.php",
		method: "GET",
		dataType: "json",
		data: {command:"POINT"},
		username: null,
		password: null
	});
	
	var pointObjects = L.geoJson(null, {
		onEachFeature: function (feature, layer) {
			if (feature.properties) {
				layer.on({
					click: function (e) {
						var content = "ID: " + feature.properties.id + "<br>" +
							"Dusun: " + feature.properties.dusun + "<br>" +
							"Desa: " + feature.properties.desa + "<br>" +
							"Kecamatan: " + feature.properties.kecamatan + "<br>" +
							"Tanggal kejadian: " + feature.properties.tanggal_kejadian;
						pointObjects.bindPopup(content);
					}
				});
			}
		}
	});
	promisePoint.then(function (data) {
		pointObjects.addData(data);
		map.addLayer(pointObjects);
	});
	
	var promisePolygon = $.ajax({
		url: "./dataservice/read_polygon.php",
		method: "GET",
		dataType: "json",
		data: {command:"POLYGON"},
		username: null,
		password: null
	});
	
	var polygonObjects = L.geoJson(null, {
		onEachFeature: function (feature, layer) {
			if (feature.properties) {
				layer.on({
					click: function (e) {
						var objectGIDToEdit = feature.properties.gid;
						$("#editobjectgid").val(objectGIDToEdit);
						map.off();
						map.remove();
						_displayMapEditPolygon('app',objectGIDToEdit);
					}
				});
			}
		}
	});
	promisePolygon.then(function (data) {
		polygonObjects.addData(data);
		map.addLayer(polygonObjects);
		map.fitBounds(polygonObjects.getBounds());
	});

	openStreetMaps = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		minZoom: 3, 
		maxZoom: 20, 
		attribution: 'Map Data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors.'
	});

	Google_Terrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
		maxZoom: 20,
		subdomains: ["mt0", "mt1", "mt2", "mt3"],
		attribution: 'Google'
	});

	Google_Satellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
		maxZoom: 22,
		subdomains: ["mt0", "mt1", "mt2", "mt3"],
		attribution: 'Google'
	});
	
	map = L.map("map", {
		zoom: 12,
		center: [-7.50441, 110.23682],
		layers: [Google_Terrain],
		minZoom: 3,
		maxZoom: 22,
	});
	
	map.setMaxBounds([[-12.6406520507, 94.1211943626], [7.4970404951, 142.1802794933]]);

	var baseLayers = {
		"OpenStreetMap": openStreetMaps,
		"Terrain": Google_Terrain,
		"Satellite": Google_Satellite
	};
	var overlayLayers = {
		"Lokasi": pointObjects
	};
	
	var layerControl = L.control.layers(baseLayers, overlayLayers,  {
		collapsed: isCollapsed
	}).addTo(map);

	L.control.scale({
		maxWidth: 150,
		imperial: false,
	}).addTo(map);

	/* Geolocation */
  var locateControl = L.control.locate({
    position: "topleft",
    drawCircle: true,
    follow: true,
    setView: true,
    keepCurrentZoomLevel: false,
    markerStyle: {
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.8,
    },
    circleStyle: {
      weight: 1,
      clickable: false,
    },
    icon: "fa fa-crosshairs",
    metric: true,
    strings: {
      title: "Klik untuk mengetahui lokasimu",
      popup: "Lokasimu sekarang di sini. Akurasi {distance} {unit}",
      outsideMapBoundsMsg: "Kamu berada di luar area peta"
    },
    locateOptions: {
      maxZoom: 16,
      watch: true,
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 10000
    },
  }).addTo(map);
}

/* ============================================= */

function _displayMapEditPolygon (divtarget,objectgid) {
	divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
	document.getElementById(divtarget).innerHTML = "<div id='map' class='map-wrapper'></div>";
	
	var map, isCollapsed, Google_Satellite, Google_Terrain, openStreetMaps;
	if (document.body.clientWidth <= 767) {
		isCollapsed = true;
	} else {
		isCollapsed = false;
	}

	var promisePoint = $.ajax({
		url: "./dataservice/read_point.php",
		method: "GET",
		dataType: "json",
		data: {command:"POINT"},
		username: null,
		password: null
	});
	
	var pointObjects = L.geoJson(null, {
		onEachFeature: function (feature, layer) {
			if (feature.properties) {
				layer.on({
					click: function (e) {
						var content = "ID: " + feature.properties.id + "<br>" +
							"Dusun: " + feature.properties.dusun + "<br>" +
							"Desa: " + feature.properties.desa + "<br>" +
							"Kecamatan: " + feature.properties.kecamatan + "<br>" +
							"Tanggal kejadian: " + feature.properties.tanggal_kejadian;
						pointObjects.bindPopup(content);
					}
				});
			}
		}
	});
	promisePoint.then(function (data) {
		pointObjects.addData(data);
		map.addLayer(pointObjects);
	});

	openStreetMaps = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		minZoom: 3, 
		maxZoom: 20, 
		attribution: 'Map Data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors.'
	});

	Google_Terrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
		maxZoom: 20,
		subdomains: ["mt0", "mt1", "mt2", "mt3"],
		attribution: 'Google'
	});

	Google_Satellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
		maxZoom: 22,
		subdomains: ["mt0", "mt1", "mt2", "mt3"],
		attribution: 'Google'
	});

	map = L.map("map", {
		zoom: 12,
		center: [-7.50441, 110.23682],
		layers: [Google_Satellite],
		minZoom: 3,
		maxZoom: 22,
	});
	
	map.setMaxBounds([[-12.6406520507, 94.1211943626], [7.4970404951, 142.1802794933]]);

	var baseLayers = {
		"OpenStreetMap": openStreetMaps,
		"Terrain": Google_Terrain,
		"Satellite": Google_Satellite
	};
	var overlayLayers = {
		"Lokasi": pointObjects
	};
	
	var layerControl = L.control.layers(baseLayers, overlayLayers,  {
		collapsed: isCollapsed
	}).addTo(map);
	
	/* Digitize Function */
	var drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);
	
	var promiseObjectEdit = $.ajax({
		url: "./dataservice/read_one_polygon.php",
		method: "GET",
		dataType: "json",
		data: {command:"POLYGON",gid:objectgid},
		username: null,
		password: null
	});
	
	promiseObjectEdit.then(function (data) {
		L.geoJson(data, {
			style: function (feature) {
				return {
					color: "#FF0000",
					weight: 1,
					opacity: 1
				};
			},
			onEachFeature: _onEachFeature
		});
	});

	var drawControl = new L.Control.Draw({
		draw: {
			position: 'topleft',
			polyline: false,
			polygon: false,
			rectangle: false,
			circle: false,
			marker: false,
			circlemarker: false
		},
		edit: {
			featureGroup: drawnItems,
			edit: true,
			remove: false
		}
	});
	
	map.addControl(drawControl);
	
	/* edit functions */
	map.on('draw:edited', function (e) {
		var layers = e.layers;
		layers.eachLayer(function(layer) {
			var drawnJSONObject = layer.toGeoJSON();
			var objectGeometry = Terraformer.WKT.convert(drawnJSONObject.geometry);
			var objectGIDToEdit = $("#editobjectgid").val();
			var date = new Date();
	    var day = date.getDate();
	    var month = date.getMonth() + 1;
	    var year = date.getFullYear();
	    if (month < 10) month = "0" + month;
	    if (day < 10) day = "0" + day;
	    var today = year + "-" + month + "-" + day;
			$.ajax({
				url: "./dataservice/update_polygon.php",
				method: "GET",
				dataType: "json",
				data: {command:"UPDATE",gid:objectGIDToEdit,geometry:objectGeometry,tanggal_update:today},
				success: function (data) {
					if (data.response == "200") {
						map.off();
						map.remove();
						_displayMapUpdatePolygon('app');
					} else {
						map.off();
						map.remove();
						_displayMapUpdatePolygon('app');
						console.log('Update feature failed.');
					}
				},
				username: null,
				password: null
			});
		});
	});

	map.on('draw:canceled', function (e) {
		map.off();
		map.remove();
		_displayMapUpdatePolygon('app');
		map.refresh();
	});

	$("#savedata").on('click', function(evt){
		evt.stopImmediatePropagation();
		var objectGIDToEdit = $("#editobjectgid").val();
		var id = $('#id').val();
		var enumerator = $('#enumerator').val();
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
		var tanggal_update = $('#tanggal_update').val();
		$.ajax({
			url: "./dataservice/update_datapolygon.php",
			method: "GET",
			dataType: "json",
			data: {command:"UPDATE",gid:objectGIDToEdit,id:id,enumerator:enumerator,material_longsor:material_longsor,tipe_batuan:tipe_batuan,proses_longsor:proses_longsor,kecepatan_luncuran:kecepatan_luncuran,kemiringan_lereng:kemiringan_lereng,penggunaanlahan:penggunaanlahan,tipe_vegetasi:tipe_vegetasi,penyebab_longsor:penyebab_longsor,panjang_m_longsor:panjang_m_longsor,lebar_m_longsor:lebar_m_longsor,kedalaman_m_longsor:kedalaman_m_longsor,volume_m3:volume_m3,tanggal_update:tanggal_update},
			success: function (data) {
				if (data.response=="200") {
					$("#modalbox").modal('hide');
					_displayMapUpdatePolygon('app');
					console.log('Terupdate bro...');
				} else {
					$("#modalbox").modal('hide');
					console.log('Failed to save.');
					alert('Tidak berhasil mengupdate database.');
					location.href = _displayMapUpdatePolygon('app');
				}
			},
			username: null,
			password: null
		});
	});
	
	function _onEachFeature (feature, layer) {
		layer.on({
      click: function (e) {
        var content = "<table id='feature_data' class='table table-condensed table-bordered table-striped'>"+
      	"<tr><td>ID</td><td><input type='text' id='id' name='id' class='form-control' value='"+ feature.properties.id +"'/></td></tr>"+
      	"<tr><td>Enumerator</td><td><input type='text' id='enumerator' name='enumerator' class='form-control' value='"+ feature.properties.enumerator +"'/></td></tr>"+
      	"<tr><td>Material Longsor</td><td>"+ 
	      	"<select class='form-control' id='material_longsor' name='material_longsor'>" +
		        "<option selected='selected'>" + feature.properties.material_longsor + "</option>" +
		        "<option>Tanah</option>" +
		        "<option>Batu</option>" +
		        "<option>Rombakan</option>" +
		      "</select>" +
				"</td></tr>"+
      	"<tr><td>Jenis/Tipe Batuan</td><td>"+
					"<select class='form-control' id='tipe_batuan' name='tipe_batuan'>" +
		        "<option selected='selected'>" + feature.properties.tipe_batuan + "</option>" +
		        "<option>Batuan Sedimen</option>" +
		        "<option>Batuan Beku</option>" +
		        "<option>Batuan Metamorf</option>" +
		      "</select>" +
				"</td></tr>"+
      	"<tr><td>Proses/Jenis Longsoran</td><td>" +
					"<select class='form-control' id='proses_longsor' name='proses_longsor'>" +
						"<option selected='selected'>" + feature.properties.proses_longsor + "</option>" +
		        "<option>Translasi</option>" +
		        "<option>Rotasi</option>" +
		        "<option>Rayapan</option>" +
		        "<option>Aliran Rombakan</option>" +
		        "<option>Runtuhan Batu</option>" +
		        "<option>Blok</option>" +
		      "</select>" +
				"</td></tr>"+
				"<tr><td>Kecepatan Longsor</td><td>"+
					"<select class='form-control' id='kecepatan_luncuran' name='kecepatan_luncuran'>" +
		        "<option selected='selected'>" + feature.properties.kecepatan_luncuran + "</option>" +
		        "<option>Cepat</option>" +
		        "<option>Lambat</option>" +
		      "</select>" +
				"</td></tr>"+
				"<tr><td>Kemiringan Lereng (&#176;)</td><td><input type='text' id='kemiringan_lereng' name='kemiringan_lereng' class='form-control' value='"+ feature.properties.kemiringan_lereng +"'/></td></tr>"+
				"<tr><td class=''>Penggunaan Lahan</td>" +
					"<td class='text-center'>" +
						"<select class='form-control' id='penggunaanlahan' name='penggunaanlahan'>" +
							"<option selected='selected'>" + feature.properties.penggunaanlahan + "</option>" +
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
				"</td></tr>" +
      	"<tr><td>Tipe/Jenis Vegetasi</td><td><input type='text' id='tipe_vegetasi' name='tipe_vegetasi' class='form-control' value='"+ feature.properties.tipe_vegetasi +"'/></td></tr>"+
      	"<tr><td>Penyebab Longsor</td><td><input type='text' id='penyebab_longsor' name='penyebab_longsor' class='form-control' value='"+ feature.properties.penyebab_longsor +"'/></td></tr>"+
      	"<tr><td>Panjang (m)</td><td><input type='text' id='panjang_m_longsor' name='panjang_m_longsor' class='form-control' value='"+ feature.properties.panjang_m_longsor +"'/></td></tr>"+
      	"<tr><td>Lebar (m)</td><td><input type='text' id='lebar_m_longsor' name='lebar_m_longsor' class='form-control' value='"+ feature.properties.lebar_m_longsor +"'/></td></tr>"+
      	"<tr><td>Kedalaman (m)</td><td><input type='text' id='kedalaman_m_longsor' name='kedalaman_m_longsor' class='form-control' value='"+ feature.properties.kedalaman_m_longsor +"'/></td></tr>"+
      	"<tr><td>Volume (m<sup>3</sup>)</td><td><input type='hidden' id='operator' value='X'><div class='input-group mb-3'><input type='text' id='volume_m3' name='volume_m3' class='form-control' value='" + feature.properties.volume_m3 + "'/>" +
					"<button type='button' class='btn btn-primary' onclick='calculatevolume()'>Hitung</button>" +
					"</div>" +
					"<small>Volume = 1/6 &pi; L W D</small>" +
				"</td></tr>"+
      	"</table>" +
      	"<input type='hidden' id='tanggal_update' name='tanggal_update' readonly />";
        $("#app_modal_body").empty();
				$("#app_modal_body").removeClass().addClass('modal-body');
				$("#app_modal_size").removeClass().addClass('modal-dialog');
				$("#app_modal_body").html(content);
				$("#app_modal_label").html("ID " + feature.properties.id);
				
				$("#modalbox").modal('show');

				$(document).ready(function() {
			    var date = new Date();

			    var day = date.getDate();
			    var month = date.getMonth() + 1;
			    var year = date.getFullYear();

			    if (month < 10) month = "0" + month;
			    if (day < 10) day = "0" + day;

			    var today = year + "-" + month + "-" + day;       
			    $("#tanggal_update").attr("value", today);
				});
      }
    });
		drawnItems.addLayer(layer);
		map.fitBounds(drawnItems.getBounds());
	}
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