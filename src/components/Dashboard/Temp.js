import { Loader } from '@googlemaps/js-api-loader';
import React from 'react'
const loader = new Loader({
    apiKey: "AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso",
    version: "weekly",
    libraries: ["visualization"]
  });
var map;
var heatmap;
const Temp =()=>{
    loader
    .load()
    .then((google) => {
      var heatMapData = [
        {location: new google.maps.LatLng(37.782, -122.447), weight: 50},
        new google.maps.LatLng(37.782, -122.445),
        {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
        {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
        {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
        new google.maps.LatLng(37.782, -122.437),
        {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},
      
        {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
        {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
        new google.maps.LatLng(37.785, -122.443),
        {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
        new google.maps.LatLng(37.785, -122.439),
        {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
        {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
      ];
      
      var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
      
      map = new google.maps.Map(document.getElementById('mappper'), {
        center: sanFrancisco,
        zoom: 13,
        mapTypeId: 'satellite'
      });
      heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
      });
      heatmap.setMap(map);
}).catch(e => {
    console.log("not loadede")
  });

      return(
        <>
        <div id='mappper' style={{height:"500px" , width:"100%"}}></div>
        </>
      )
  }
  export default Temp;
