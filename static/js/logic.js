// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [-31.948327517365193, 115.86365111894163],
  zoom: 13
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 10,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Colouring function parameters
function chooseColor(rating) {
  var color = "";
  if  (parseInt(rating) > 0.9 && parseInt(rating) < 1.1) {
      color = "green";
  }
  else if (parseInt(rating) > 0.75 && parseInt(rating) < 0.9 && parseInt(rating) > 1.1 && parseInt(rating) < 1.25) {
      color = "orange";
  }
  else {
      color = "red";
  }
  return color;
}

// Store our API endpoint inside queryUrl
var geoData = "/resources/suburb-10-wa.geojson";

var geojson;

// Grabbing our GeoJSON data..
d3.json(geoData, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "black",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.wa_local_2),
        fillOpacity: 0.25,
        weight: 0.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.25
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");

    }
  }).addTo(myMap);
});




// Create a new marker
// Pass in some initial options, and then add it to the map using the addTo method
var marker = L.marker([-32, 116], {
  draggable: true,
  title: "Output Marker"
}).addTo(myMap);

// Define arrays to hold created city and state markers
var suburbMarkers = [];

// Binding a pop-up to our marker
marker.bindPopup("Your new house in this suburb!");

