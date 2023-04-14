navigator.geolocation.getCurrentPosition((position)=> {
  const p=position.coords;
  sessionStorage.markedlat=p.latitude
sessionStorage.markedlong=p.longitude
initializemap(sessionStorage.markedlat,sessionStorage.markedlong)
})
initializemap(sessionStorage.markedlat,sessionStorage.markedlong)
document.getElementById('map_canvas')
 
function initializemap(lat,long){
var map = new 
google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 14,
    center: new google.maps.LatLng(lat,long),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});
var myMarker = new google.maps.Marker({
    position: new google.maps.LatLng(lat,long),
    draggable: true
});
// funcName(lat,long)

// document.getElementById('map_canvas_location').innerHTML = '<p>Marker dropped: Current Lat: ' + lat.toFixed(3) + ' Current Lng: ' + long.toFixed(3) + '</p>';
google.maps.event.addListener(myMarker, 'dragend', function (evt) {
    document.getElementById('map_canvas_location').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
sessionStorage.markedlat=evt.latLng.lat()
sessionStorage.markedlong=evt.latLng.lng()
funcName(evt.latLng.lat(),evt.latLng.lng())
  
});
google.maps.event.addListener(myMarker, 'dragstart', function (evt) {
    document.getElementById('map_canvas_location').innerHTML = '<p>Currently dragging marker...</p>';
});
map.setCenter(myMarker.position);
myMarker.setMap(map);
}


async function funcName(lat,long){
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`);
    var data = await response.json();
    console.log(data)
    console.log(data.address)
    console.log(data.address.village)
    }

    


