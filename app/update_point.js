function _displayMapUpdatePoint (divtarget) {
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
						var objectGIDToEdit = feature.properties.gid;
						$("#editobjectgid").val(objectGIDToEdit);
						map.off();
						map.remove();
						_displayMapEditPoint('app',objectGIDToEdit);
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
						polygonObjects.bindPopup("ID " + feature.properties.id);
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
		maxZoom: 20,
		subdomains: ["mt0", "mt1", "mt2", "mt3"],
		attribution: 'Google'
	});
	
	map = L.map("map", {
		zoom: 12,
		center: [-7.50441, 110.23682],
		layers: [Google_Terrain],
		minZoom: 3,
		maxZoom: 20,
	});
	
	map.setMaxBounds([[-12.6406520507, 94.1211943626], [7.4970404951, 142.1802794933]]);

	var baseLayers = {
		"OpenStreetMap": openStreetMaps,
		"Terrain": Google_Terrain,
		"Satellite": Google_Satellite
	};

	var overlayLayers = {
		"Area": polygonObjects
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

function _displayMapEditPoint (divtarget,objectgid) {
	divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
	document.getElementById(divtarget).innerHTML = "<div id='map' class='map-wrapper'></div>";
	
	var map, isCollapsed, Google_Satellite, Google_Terrain, openStreetMaps;
	if (document.body.clientWidth <= 767) {
		isCollapsed = true;
	} else {
		isCollapsed = false;
	}

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
						polygonObjects.bindPopup("ID " + feature.properties.id);
					}
				});
			}
		}
	});
	promisePolygon.then(function (data) {
		polygonObjects.addData(data);
		map.addLayer(polygonObjects);
		// map.fitBounds(polygonObjects.getBounds());
	});

	openStreetMaps = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		minZoom: 3, 
		maxZoom: 20, 
		attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
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
		"Area": polygonObjects
	};
	
	var layerControl = L.control.layers(baseLayers, overlayLayers,  {
		collapsed: isCollapsed
	}).addTo(map);

	L.control.scale({
		maxWidth: 150,
		imperial: false,
	}).addTo(map);
	
	/* Digitize Function */
	var drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);
	
	var promiseObjectEdit = $.ajax({
		url: "./dataservice/read_one_point.php",
		method: "GET",
		dataType: "json",
		data: {command:"POINT",gid:objectgid},
		username: null,
		password: null
	});
	
	promiseObjectEdit.then(function (data) {
		L.geoJson(data, {
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
				url: "./dataservice/update_point.php",
				method: "GET",
				dataType: "json",
				data: {command:"UPDATE",gid:objectGIDToEdit,geometry:objectGeometry,tanggal_update:today},
				success: function (data) {
					if (data.response == "200") {
						map.off();
						map.remove();
						_displayMapUpdatePoint('app');
					} else {
						map.off();
						map.remove();
						_displayMapUpdatePoint('app');
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
		_displayMapUpdatePoint('app');
		map.refresh();
	});

	$("#savedata").on('click', function(evt){
		evt.stopImmediatePropagation();
		var objectGIDToEdit = $("#editobjectgid").val();
		var id = $('#id').val();
		var enumerator = $('#enumerator').val();
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
		var tanggal_update = $('#tanggal_update').val();
		$.ajax({
			url: "./dataservice/update_datapoint.php",
			method: "GET",
			dataType: "json",
			data: {command:"UPDATE",gid:objectGIDToEdit,id:id,enumerator:enumerator,dusun:dusun,desa:desa,kecamatan:kecamatan,kabkot:kabkot,koordinat_info:koordinat_info,ketinggian:ketinggian,foto_nama:foto_nama,foto_arahhadap:foto_arahhadap,foto_info:foto_info,tanggal_kejadian:tanggal_kejadian,jam_kejadian:jam_kejadian,hari_pasaran:hari_pasaran,tanggal_update:tanggal_update},
			success: function (data) {
				if (data.response=="200") {
					$("#modalbox").modal('hide');
					_displayMapUpdatePoint('app');
					console.log('Terupdate bro...');
				} else {
					$("#modalbox").modal('hide');
					console.log('Failed to save.');
					alert('Tidak berhasil mengupdate database.');
					location.href = _displayMapUpdatePoint('app');
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
      	"<tr><td>Dusun</td><td><input type='text' id='dusun' name='dusun' class='form-control' value='"+ feature.properties.dusun +"'/></td></tr>"+
      	"<tr><td>Desa</td><td><input type='text' id='desa' name='desa' class='form-control' value='"+ feature.properties.desa +"'/></td></tr>"+
      	"<tr>" +
					"<td class=''>Kecamatan</td>" +
					"<td class='text-center'>" +
						"<select class='form-control' id='kecamatan' name='kecamatan'>" +
							"<option>" + feature.properties.kecamatan + "</option>" +
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
      	"<tr><td>Kabupaten</td><td><input type='text' id='kabkot' name='kabkot' class='form-control' value='"+ feature.properties.kabkot +"' readonly='true'/></td></tr>"+
      	"<tr>" +
					"<td class=''>Informasi Lokasi</td>" +
					"<td class='text-center'>" +
					"<select class='form-control' id='koordinat_info' name='koordinat_info'>" +
						"<option>" + feature.properties.koordinat_info + "</option>" +
		        "<option>Mahkota</option>" +
		        "<option>Tengah</option>" +
		        "<option>Kaki</option>" +
		      "</select>" +
					"</td>" +
				"</tr>" +
				"<tr>" +
					"<td class=''>Ketinggian (mdpal)</td>" +
					"<td class='text-center'><input type='text' id='ketinggian' name='ketinggian' class='form-control' value='" + feature.properties.ketinggian + "'/></td>" +
				"</tr>" +
				"<tr>" +
					"<td class=''>Nama File Foto</td>" +
					"<td class=''>" +
						"<input type='text' id='foto_nama' name='foto_nama' class='form-control' value='" + feature.properties.foto_nama + "'/>" +
					"</td>" +
				"</tr>" +
				"<tr>" +
					"<td class=''>Arah Hadap Foto (&#176;)</td>" +
					"<td class='text-center'><input type='text' id='foto_arahhadap' name='foto_arahhadap' class='form-control' value='" + feature.properties.foto_arahhadap + "'/></td>" +
				"</tr>" +
				"<tr>" +
					"<td class=''>Informasi Foto</td>" +
					"<td class='text-center'><input type='text' id='foto_info' name='foto_info' class='form-control' value='" + feature.properties.foto_info + "'/></td>" +
				"</tr>" +
				"<tr>" +
					"<td class=''>Tanggal Kejadian</td>" +
					"<td class='text-center'><input type='date' id='tanggal_kejadian' name='tanggal_kejadian' class='form-control' value='" + feature.properties.tanggal_kejadian + "'/></td>" +
				"</tr>" +
				"<tr>" +
					"<td class=''>Jam Kejadian</td>" +
					"<td class='text-center'><input type='text' id='jam_kejadian' name='jam_kejadian' class='form-control' value='" + feature.properties.jam_kejadian + "' placeholder='HH:MM'/></td>" +
				"</tr>" +
				"<tr>" +
					"<td class=''>Hari Pasaran</td>" +
					"<td class='text-center'><input type='text' id='hari_pasaran' name='hari_pasaran' class='form-control' value='" + feature.properties.hari_pasaran + "'/></td>" +
				"</tr>" +
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