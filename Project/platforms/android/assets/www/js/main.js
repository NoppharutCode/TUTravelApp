var map;
document.addEventListener("deviceready", function() {
  // Define a div tag with id="map_canvas"
  var mapDiv = document.getElementById("map_canvas");

  console.log(mapDiv);
  // Initialize the map plugin

  map = plugin.google.maps.Map.getMap(mapDiv);
 


  // You have to wait the MAP_READY event.
  map.on(plugin.google.maps.event.MAP_READY, onMapInit);

});

function onMapInit(map) {


	
  alert("My map");
  


}
