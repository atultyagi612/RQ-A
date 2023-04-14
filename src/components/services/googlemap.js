import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

navigator.geolocation.getCurrentPosition((position)=> {
    const p=position.coords;
    sessionStorage.markedlat=p.latitude
  sessionStorage.markedlong=p.longitude
  })

  

  
const GoogleMapComponent = (props) => {
    
    let markersList = [
        { lat: sessionStorage.markedlat, lng: sessionStorage.markedlong },
    ]
    let [markers, setMarkers] = useState(markersList);
    const mapStyles = {
        width: '100%',
        height: '100%'
    };

    let onMarkerDragEnd = (coord, index, markers) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        sessionStorage.markedlat=lat
        sessionStorage.markedlong=lng
        document.getElementById('map_canvas_location').innerHTML = '<p>Marker dropped: Current Lat: ' + lat.toFixed(3) + ' Current Lng: ' + lng.toFixed(3) + '</p>';
        markers[index] = { lat, lng };
        setMarkers(markers); 
        
    }

    let myMarkers = markers && Object.entries(markers).map(([key, val]) => (
        <Marker key={key} id={key} position={{
            lat: val.lat,
            lng: val.lng
        }}
            onClick={() => console.log("Clicked")}
            draggable={true}
            onDragend={(t, map, coord) => onMarkerDragEnd(coord, key, markers)}
        />
    ))
    return (
        <>

                    <Map
                        google={props.google}
                        zoom={14}
                        style={mapStyles}
                        center={
                            {
                                lat: sessionStorage.markedlat,
                                lng: sessionStorage.markedlong
                            }
                        }
                        
                    >
                        {myMarkers}
                    </Map>
                
        </>
    );
}


export default GoogleApiWrapper({
    // apiKey: 'AIzaSyBBLyWj-3FWtCbCXGW3ysEiI2fDfrv2v0Q'
})(GoogleMapComponent);


