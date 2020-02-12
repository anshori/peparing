function _displayMapCreate (divtarget) {
	divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
	document.getElementById(divtarget).innerHTML = "<div id='map' class='map-wrapper'></div>";
	
	var map, isCollapsed, Google_Satellite, Google_Terrain, openStreetMaps;
	if (document.body.clientWidth <= 767) {
		isCollapsed = true;
	} else {
		isCollapsed = false;
	}

	var bataskecamatan = L.geoJson(null, {
    style: function (feature) { 
      return {
        color: "gray",
        weight: 2, 
        opacity: 1,
        fillColor: "#A4C639",
        fillOpacity: 0
      };
    },
    onEachFeature: function (feature, layer) {
    	layer.on({
	      click: function (e) {
	        bataskecamatan.bindPopup("Kec. "+feature.properties.KECAMATAN);
	      },
	    });
    }
  });
	$.getJSON("data/bataskecamatan.geojson", function (data) {
    bataskecamatan.addData(data);
    // map.addLayer(bataskecamatan);
  });

	/* Landslide Point Layer */
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
						var content = "<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
			      	"<thead class='thead-dark'>" +
								"<tr>" +
									"<th colspan='2' class='text-center'>Lokasi Longsor</th>" +
								"</tr>" +
							"</thead>" +
							"<tbody>" +
				      	"<tr><td>Surveyor</td><td>"+ feature.properties.enumerator +"</td></tr>"+
				      	"<tr><td>Dusun</td><td>"+ feature.properties.dusun +"</td></tr>"+
				      	"<tr><td>Desa</td><td>"+ feature.properties.desa +"</td></tr>"+
				      	"<tr><td>Kecamatan</td><td>"+ feature.properties.kecamatan +"</td></tr>"+
				      	"<tr><td>Kabupaten</td><td>"+ feature.properties.kabkot +"</td></tr>"+
				      	"<tr>" +
									"<td class=''>Koordinat</td>" +
									"<td class=''>"+feature.geometry.coordinates[0]+", "+feature.geometry.coordinates[1]+"</td>" +
								"</tr>" +
				      	"<tr><td>Informasi Lokasi</td><td>"+ feature.properties.koordinat_info +"</td></tr>"+
				      	"<tr><td>Ketinggian</td><td>"+ feature.properties.ketinggian +" mdpal</td></tr>"+
				      	"<tr><td>Foto</td><td><img src='./upload/"+ feature.properties.foto_nama +"' width='200' alt='" + feature.properties.foto_nama + "'></td></tr>"+
				      	"<tr><td>Arah Hadap Foto</td><td>"+ feature.properties.foto_arahhadap +"&#176;</td></tr>"+
				      	"<tr><td>Informasi Foto</td><td>"+ feature.properties.foto_info +"</td></tr>"+
				      	"<tr><td>Tanggal Kejadian</td><td>"+ feature.properties.tanggal_kejadian +"</td></tr>"+
				      	"<tr><td>Jam Kejadian</td><td>"+ feature.properties.jam_kejadian +"</td></tr>"+
				      	"<tr><td>Hari Pasaran</td><td>"+ feature.properties.hari_pasaran +"</td></tr>"+
				      	"<tr>" +
									"<td class=''>Navigasi</td>" +
									"<td class=''><a class='btn btn-primary btn-sm' href='https://www.google.com/maps/dir/?api=1&destination=" + feature.geometry.coordinates[1] + "," + feature.geometry.coordinates[0] + "&travelmode=driving' role='button' target='_blank'>Buat rute</a></td>" +
								"</tr>" +
							"</tbody>" +
							"<caption><small><div class='row' style='color: #55ACEE;'>" +
						    "<div class='col-6'>Tanggal Input Data</div>" +
						    "<div class='col-6 text-right'>Update Data Terakhir</div>" +
						    "<div class='w-100'></div>" +
						    "<div class='col-6'>" + feature.properties.tanggal_input + "</div>" +
						    "<div class='col-6 text-right'>" + feature.properties.tanggal_update + "</div>" +
						  "</div></small></caption>" +
			      	"</table>";
			      $("#app_modal_body").empty();
						$("#app_modal_body").removeClass().addClass('modal-body');
						$("#app_modal_size").removeClass().addClass('modal-dialog');
						$("#app_modal_body").html(content);
						$("#app_modal_label").html("ID " + feature.properties.id);
						
						$("#modalbox").modal('show');
					}
				});
			}
		}
	});
	promisePoint.then(function (data) {
		pointObjects.addData(data);
		map.addLayer(pointObjects);
	});
	
	/* Landslide Polygon Layer */
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
						var content = "<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
									"<thead class='thead-dark'>" +
										"<tr>" +
											"<th colspan='2' class='text-center'>Tipologi Longsor</th>" +
										"</tr>" +
									"</thead>" +
									"<tbody>" +
										"<tr>" +
											"<td class=''>Surveyor</td>" +
											"<td class=''>"+feature.properties.enumerator+"</td>" +
										"</tr>" +
										"<tr>" +
											"<td class=''>Material</td>" +
											"<td class=''>"+feature.properties.material_longsor+"</td>" +
										"</tr>" +
										"<tr>" +
											"<td class=''>Jenis/Tipe Batuan</td>" +
											"<td class=''>"+ feature.properties.tipe_batuan +"</td>" +
										"</tr>" +
										"<tr>" +
											"<td class=''>Proses</td>" +
											"<td class=''>"+ feature.properties.proses_longsor +"</td>" +
										"</tr>" +
										"<tr>" +
											"<td class=''>Kecepatan</td>" +
											"<td class=''>"+ feature.properties.kecepatan_luncuran +"</td>" +
										"</tr>" +
										"<tr>" +
											"<td class=''>Kemiringan Lereng</td>" +
											"<td class=''>"+ feature.properties.kemiringan_lereng +"&#176;</td>" +
										"</tr>" +
										"<tr>" +
											"<td class=''>Penggunaan Lahan</td>" +
											"<td class=''>"+ feature.properties.penggunaanlahan +"</td>" +
										"</tr>" +
										"<tr>" +
											"<td class=''>Jenis/Tipe Vegetasi</td>" +
											"<td class=''>"+ feature.properties.tipe_vegetasi +"</td>" +
										"</tr>" +
										"<tr>" +
											"<td class=''>Penyebab Longsor</td>" +
											"<td class=''>"+ feature.properties.penyebab_longsor +"</td>" +
										"</tr>" +
									"</tbody>" +
									"<thead class='thead-dark'>" +
										"<tr>" +
											"<th colspan='2' class='text-center'>Geometri Longsor</th>" +
										"</tr>" +
									"</thead>" +
									"<tbody>" +
										"<tr>" +
											"<td class=''>Panjang</td>" +
											"<td class=''>"+ feature.properties.panjang_m_longsor + " m</td>" +
										"</tr>" +
										"<tr>" +
											"<td class=''>Lebar</td>" +
											"<td class=''>"+ feature.properties.lebar_m_longsor + " m</td>" +
										"</tr>" +
										"<tr>" +
											"<td class=''>Kedalaman</td>" +
											"<td class=''>"+ feature.properties.kedalaman_m_longsor +" m</td>" +
										"</tr>" +
										"<tr>" +
											"<td class=''>Luas Area</td>" +
											"<td class=''>"+ feature.properties.luas_meter2 +" m<sup>2</sup></td>" +
										"</tr>" +
										"<tr>" +
											"<td class=''>Volume <small>(1/6 &pi; L W D)</small></td>" +
											"<td class=''>"+ feature.properties.volume_m3 + " m<sup>3</sup></td>" +
										"</tr>" +
									"</tbody>" +
									"<caption><small><div class='row' style='color: #55ACEE;'>" +
								    "<div class='col-6'>Tanggal Input Data</div>" +
								    "<div class='col-6 text-right'>Update Data Terakhir</div>" +
								    "<div class='w-100'></div>" +
								    "<div class='col-6'>" + feature.properties.tanggal_input + "</div>" +
								    "<div class='col-6 text-right'>" + feature.properties.tanggal_update + "</div>" +
								  "</div></small></caption>" +
								"</table>";
			      $("#app_modal_body").empty();
						$("#app_modal_body").removeClass().addClass('modal-body');
						$("#app_modal_size").removeClass().addClass('modal-dialog');
						$("#app_modal_body").html(content);
						$("#app_modal_label").html("ID " + feature.properties.id);
						
						$("#modalbox").modal('show');
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

	/* Basemap */
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
		layers: [Google_Satellite],
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
		"Lokasi": pointObjects,
		"Area": polygonObjects,
		"Batas Kecamatan": bataskecamatan,
	};
	
	var layerControl = L.control.layers(baseLayers, overlayLayers,  {
		collapsed: isCollapsed
	}).addTo(map);

	/* Scale Bar */
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
      maxZoom: 20,
      watch: true,
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 10000
    },
  }).addTo(map);

  /* Measure Tool */
  var measureControl = new L.Control.Measure({
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'hectares',
		position: 'bottomright'
  });
  measureControl.addTo(map);
	
	/* Digitize Function */
	var drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);
	
	var drawControl = new L.Control.Draw({
		position: 'bottomleft',
		draw: {
			polyline: false,
			polygon: true,
			rectangle: false,
			circle: false,
			marker: true,
			circlemarker: false
		},
		edit: false
	});
	
	map.addControl(drawControl);
	
	map.on('draw:created', function (e) {
		var type = e.layerType, 
			layer = e.layer;
			
		var drawnJSONObject = layer.toGeoJSON();
		var objectGeometry = Terraformer.WKT.convert(drawnJSONObject.geometry);
		
		if (type === 'polygon') {
			_buildDigitiseModalBoxPolygon('modalform','POLYGON',objectGeometry);
		} else if (type === 'marker') {
			_buildDigitiseModalBoxPoint('modalform','POINT',objectGeometry);
		} else {
			console.log('__undefined__');
		}
		drawnItems.addLayer(layer);
	});
	
	$("#modalform").on('shown.bs.modal', function(){
		_activateFeatureSave();
	});
	
}