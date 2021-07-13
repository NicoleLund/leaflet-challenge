// Create background map tiles
var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
  });

var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
  });

// Initialize LayerGroups
var layers = {
    Earthquakes: new L.LayerGroup(),
};

// Create the map with the layers
var myMap = L.map("mapid", {
    center: [41, -110],
    zoom: 6,
    layers: [lightmap, layers.Earthquakes]
});

// Add tile layer to the map
lightmap.addTo(myMap);

// Create mapbase object
var mapbase = {
    "Light map": lightmap,
    "Dark map": darkmap
};

// Create overlays object
var overlays = {
    "Earthquakes": layers.Earthquakes
};

//Add control for layers
L.control.layers(mapbase,overlays).addTo(myMap);

// Create a legend 
var legend = L.control({
    position: "bottomright"
  });

// Insert a legend div with the class of "legend"
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the legend to the map
  legend.addTo(myMap);
  