var styleURL = "kj19blue/ckrffsois0yi817k00rvowaqb";
var token = "pk.eyJ1Ijoia2oxOWJsdWUiLCJhIjoiY2txeTA2YzdnMTNwNDJ1bW5rdWR4em41aSJ9.0nXYtRwfjxFt66vN_FA8sA"

// Add a tile layer
var customMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/512/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: styleURL,
  accessToken: token
});

// Create Icon markers
const SummerIcon = L.icon({
  iconUrl: "static/Images/summer_marker.png",
  shadowUrl: "static/Images/shadow_marker.png",
  iconSize: [65, 111],
  shadowSize: [68,48],
  iconAnchor: [2, 111],
  shadowAnchor: [21, 49],
  popupAnchor: [32, -105]
});

const WinterIcon = L.icon({
  iconUrl: "static/Images/winter_marker.png",
  shadowUrl: "static/Images/shadow_marker.png",
  iconSize: [65, 111],
  shadowSize: [68,48],
  iconAnchor: [2, 111],
  shadowAnchor: [21, 49],
  popupAnchor: [32, -105]
});



// var hosts=JSON.parse("hostsData.json").data;
d3.json('hostsData.json').then((importedData) => {
  const hosts = importedData;

  var summerMarkers = [];
  var winterMarkers = [];

  // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
  for (var i = 0; i < hosts.length; i++) {
    if (hosts[i].season == "Summer") {
      summerMarkers.push (
        L.marker([hosts[i].lat, hosts[i].lng], {icon: SummerIcon}).bindPopup("<img src='static/Images/logo.svg' class=\"center\"><h3>" + hosts[i].city + "</h3> <hr> <h4>Opening Ceremony: " + hosts[i].opening_ceremony + "</h4><h4>Closing Ceremony: " + hosts[i].closing_ceremony + "</h4>")
        );
    }
    else {
      winterMarkers.push (
        L.marker([hosts[i].lat, hosts[i].lng], {icon: WinterIcon}).bindPopup("<img  src='static/Images/logo.svg' class=\"center\"><h3>" + hosts[i].city + "</h3> <hr> <h4>Opening Ceremony: " + hosts[i].opening_ceremony + "</h4><h4>Closing Ceremony: " + hosts[i].closing_ceremony + "</h4>")
        );
    }

  };
  
  // Create overlays
  var summer = L.layerGroup(summerMarkers);
  var winter = L.layerGroup(winterMarkers);

  var overlayMaps = {
    "Winter Olympics": winter,
    "Summer Olympics": summer
  };

  // Create a map object
  var myMap = L.map("map", {
    center: [40, -5],
    zoom: 2.5,
    zoomSnap: 0.25,
    layers: [customMap, winter, summer]
  });

  // Layer control
  L.control.layers(null, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  customMap.addTo(myMap);

});





