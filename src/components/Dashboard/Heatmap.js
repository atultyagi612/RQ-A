import React from "react";
import { Map, GoogleApiWrapper} from "google-maps-react";
const GoogleMapComponent = (props) => {
    return (
      <div className="map-container" style={{height:"80vh" , width:"100%"   ,  position: "relative"}}>
        <Map
          google={props.google}
          className={"map"}
          zoom={13}
          center={{lat:props.center.lat , lng:props.center.lng}}
          onReady={props.handleMapReady}
        >
          {props.heatmp}
        </Map>
      </div>
    );
  }

export default GoogleApiWrapper({
  apiKey: "AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso",
  libraries: ["visualization"]
})(GoogleMapComponent);
