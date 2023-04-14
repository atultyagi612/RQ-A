import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
  
const GoogleMapComponent = (props) => {
    console.log(props.markers)
    const mapStyles = {
        width: '100%',
        height: '100%'
    };
    let onMarkerDragEnd = (coord, index, markers) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        props.ismarkerchange(true)
        document.getElementById('map_canvas_location').innerHTML = '<p>Marker dropped: Current Lat: ' + lat.toFixed(3) + ' Current Lng: ' + lng.toFixed(3) + '</p>';
        markers[index] = { lat, lng };
        props.setMarkers(markers); 
        
    }

    let myMarkers = props.markers && Object.entries(props.markers).map(([key, val]) => (
        <Marker key={key} id={key} position={{
            lat: val.lat,
            lng: val.lng
        }}
            onClick={() => console.log("Clicked")}
            draggable={true}
            onDragend={(t, map, coord) => onMarkerDragEnd(coord, key, props.markers)}
        />
    ))
    return (
        <>
                    <Map
                        google={props.google}
                        zoom={14}
                        style={mapStyles}
                        center={
                            props.markers[0]
                        }
                        
                    >
                        {myMarkers}
                    </Map>
                
        </>
    );
}


export default GoogleApiWrapper({
    // apiKey: 'AIzaSyBBLyWj-3FWtCbCXGW3ysEiI2fDfrv2v0Q'
    // apiKey: "AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso",
    // AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo
})(GoogleMapComponent);


