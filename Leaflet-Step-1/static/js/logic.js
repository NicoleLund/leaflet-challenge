function createMap(earthquakes) {
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

  // Create mapbase object
  var mapbase = {
      "Light map": lightmap,
      "Dark map": darkmap
  };

  // Create overlays object
  var overlays = {
      "Earthquakes": earthquakes
  };

  // Create the map with the layers
  var myMap = L.map("mapid", {
      center: [41, -110],
      zoom: 6,
      layers: [lightmap, earthquakes]
  });

  // // Add tile layer to the map
  // lightmap.addTo(myMap);


  //Add control for layers
  L.control.layers(mapbase,overlays).addTo(myMap);

  // // Create a legend 
  // var legend = L.control({
  //     position: "bottomright"
  //   });

  // // Insert a legend div with the class of "legend"
  // legend.onAdd = function() {
  //     var div = L.DomUtil.create("div", "legend");
  //     return div;
  //   };
  //   // Add the legend to the map
  //   legend.addTo(myMap);
};

function createMarkers(response) {
  // Pull the "features" property off of response
  console.log(response.features);
  var data = response.features;

  // Initialize an array to hold markers
  var eathquakeMarkers = [];

  // Loop through the data array
  for (var i=0;i<data.length;i++) {

    // console.log([
    //   data[i].geometry.coordinates[1],
    //   data[i].geometry.coordinates[0]
    // ]);

    // Create marker for earthquake
    eathquakeMarkers.push(
      L.marker(
        [data[i].geometry.coordinates[1],
         data[i].geometry.coordinates[0]]
        , {
          markerColor: "green",
          shape: "circle"
        }
      )
      .bindPopup(
        "<h3>" + data[i].properties.place + 
        "</H3><hr>Date & Time: " + data[i].properties.time +
        "<br>Magnitude: " + data[i].properties.mag +
        "<br>Depth: " + data[i].geometry.coordinates[2]
      )
      );
  };


  // Create a layer group made from the markers array, pass it into the createMap function
  // console.log(eathquakeMarkers);
  createMap(L.layerGroup(eathquakeMarkers));
};


// Retrieve Earthquake data and add to map

// All earthquakes in last 7 days
// var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// All earthquakes in last hour
var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

d3.json(earthquake_url, createMarkers);