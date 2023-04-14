import React,{useState} from "react";
import { HeatMap } from "google-maps-react";

export default function Mapcord () {
  const[temp1,settemp1]=useState()
  const [mapdata,setmapdata]=useState([
    { lat: 37.782551, lng: -122.44536800000003, weight: 200},
    { lat: 37.784577, lng: -122.399948 },
    { lat: 37.765532, lng: -122.41312499999998 },
    { lat: 37.751266, lng: -122.40335500000003 }
  ])
  const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)"
  ];

  const [heatmp,setheatmp]=useState(<HeatMap
    gradient={gradient}
    positions={mapdata}
    opacity={1}
    radius={20}
  />)
  const [hmcenter,sethmcenter]=useState({})
  const setcenter=(inp)=>{
    sethmcenter(inp)
  }

    return {mapdata,gradient,heatmp,setheatmp,hmcenter,setcenter,temp1,settemp1,setmapdata}
  
  }