import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
  
const GoogleMapComponent = (props) => {
    // console.log(props.markers)
    const mapStyles = {
        width: '100%',
        height: '100%'
    };
    let onMarkerDragEnd = (coord, index, markers) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        markers[index] = { lat, lng };
        props.setMarkers(markers);         
    }

    var myMarkers = props.markers && Object.entries(props.markers).map(([key, val]) => (
        <Marker key={key} id={key} position={{
            lat: val.lat,
            lng: val.lng
        }}
            draggable={true}
            onDragend={(t, map, coord) => onMarkerDragEnd(coord, key, props.markers)}
        />
    ))
    
    return (
        <>
                    <Map
                        google={props.google}
                        zoom={6}
                        style={mapStyles}
                        center={
                            {lng:props.markers[0].lng , lat:props.markers[0].lat}
                        }
                        onClick={(t, map, c) =>  props.setMarkers([{lat:c.latLng.lat(),lng:c.latLng.lng()}]) }
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


