function _displayMapDelete (divtarget) {
	divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
	document.getElementById(divtarget).innerHTML = "<div id='map' class='map-wrapper'></div>";
	
	var map, isCollapsed, openStreetMaps, Google_Terrain, Google_Satellite;
	
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
						var featureGid = feature.properties.gid;
						var deleteConfirmation = confirm("Feature Point ID " + feature.properties.id + " yang dibuat " + feature.properties.enumerator + " akan dihapus dari basisdata!");
						if (deleteConfirmation == true) {
							$.ajax({
								url: "./dataservice/delete_point.php",
								method: "GET",
								dataType: "json",
								data: {command:"DELETE",gid:featureGid},
								success: function (data) {
									if (data.response=="200") {
										map.off();
										map.remove();
										_displayMapDelete('app');
									} else {
										console.log('Failed to delete.');
									}
								},
								username: null,
								password: null
							});
						} else {
							console.log('Delete feature is cancelled.');
						}
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
						var featureGid = feature.properties.gid;
						var deleteConfirmation = confirm("Feature Polygon ID " + feature.properties.id + " akan dihapus dari basisdata!");
						if (deleteConfirmation == true) {
							$.ajax({
								url: "./dataservice/delete_polygon.php",
								method: "GET",
								dataType: "json",
								data: {command:"DELETE",gid:featureGid},
								success: function (data) {
									if (data.response=="200") {
										map.off();
										map.remove();
										_displayMapDelete('app');
									} else {
										console.log('Failed to delete.');
									}
								},
								username: null,
								password: null
							});
						} else {
							console.log('Delete feature is cancelled.');
						}
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
		"Lokasi": pointObjects,
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