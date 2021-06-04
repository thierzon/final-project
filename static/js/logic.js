// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [-31.95, 115.86],
  zoom: 10
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Colouring function parameters
function chooseColor(rating) {
  var color = "";
  if  (parseInt(rating) >= 0.9 && parseInt(rating) <= 1.1) {
      color = "green";
  }
  else if (parseInt(rating) >= 0.75 && parseInt(rating) < 0.9 && parseInt(rating) > 1.1 && parseInt(rating) <= 1.25) {
      color = "orange";
  }
  else if (parseInt(rating) < 0.75 && parseInt(rating) > 1.25) {
    color = "red";
  }
  else {
      color = "";
  }
  return color;
}

// Store our API endpoint inside queryUrl
var geoData = "static/geojson/suburb-10-wa.geojson";

var geojson;

// Grabbing our GeoJSON data..
d3.json(geoData, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "black",
        fillColor: "green",
        fillOpacity: 0.0,
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
            fillOpacity: 0.7
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.0
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<p>" + feature.properties.wa_local_2 + "</p>");

    }
  }).addTo(myMap);

  // d3.json("/send", function(data) {
  //   console.log(data)
  //     var suburbs=[]

  //     for (var i=0; i < data.length; i++) {
  //       if (!suburbs.contains(data.suburb[i])) {
  //         suburbs.push(data.suburb[i]);
  //       }
  //     };
  //     console.log(suburbs)
      // for (var i=0; i < data.length; i++) {
      //   var suburbs = Object.assign({}, )
      // }

  //   // Create a new choropleth layer
  //   geojson = L.choropleth(data, {

  //     // Define what property in the features to use
  //     valueProperty: "",

  //     // Set color scale
  //     scale: ["#09ff00", "#b10026"],

  //     // Number of breaks in step range
  //     steps: 10,

  //     // q for quartile, e for equidistant, k for k-means
  //     mode: "q",
  //     style: {
  //       // Border color
  //       color: "#fff",
  //       weight: 1,
  //       fillOpacity: 0.8
  //     },

  //     // Binding a pop-up to each layer
  //     onEachFeature: function(feature, layer) {
  //       layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br># of hits<br>" + feature.properties.MHI2016);
  //     }
  //   }).addTo(myMap);

  //   // Set up the legend
  //   var legend = L.control({ position: "bottomright" });
  //   legend.onAdd = function() {
  //     var div = L.DomUtil.create("div", "info legend");
  //     var limits = geojson.options.limits;
  //     var colors = geojson.options.colors;
  //     var labels = [];

  //     // Add min & max
  //     var legendInfo = "<h1>Median Income</h1>" +
  //       "<div class=\"labels\">" +
  //         "<div class=\"min\">" + limits[0] + "</div>" +
  //         "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  //       "</div>";

  //     div.innerHTML = legendInfo;

  //     limits.forEach(function(limit, index) {
  //       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  //     });

  //     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  //     return div;
  //   };

  //   // Adding legend to the map
  //   legend.addTo(myMap);
  // });
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropdown')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var stock = d3.select("#stockInput").node().value;
  console.log(stock);

  // clear the input value
  d3.select("#stockInput").node().value = "";

  // Build the plot with the new stock
  buildPlot(stock);
}

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
