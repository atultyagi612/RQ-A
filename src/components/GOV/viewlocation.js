import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const Locationmarker = (props) => {
    
    const mapStyles = {
        width: '100%',
        height: '100%'
    };
    console.log(props.markerlocation)
    let myMarker = <Marker key={Math.random().toString(16).slice(2)} id={Math.random().toString(16).slice(2)} position={{
            lat: props.markerlocation.lat,
            lng: props.markerlocation.lng
        }}  
        />
    return (
        <>
        <div className="map-container" style={{height:"500px" , width:"100%"   ,  position: "relative"}}>
                    <Map
                        google={props.google}
                        zoom={10}
                        style={mapStyles}
                        initialCenter={{lat:props.markerlocation.lat,lng:props.markerlocation.lng}}
                    >
                        {myMarker}
                    </Map></div>
                
        </>
    );
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyBBLyWj-3FWtCbCXGW3ysEiI2fDfrv2v0Q'
})(Locationmarker);


