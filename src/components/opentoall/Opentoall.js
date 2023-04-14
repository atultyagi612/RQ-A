import React , {useEffect,useState} from 'react'
import {useNavigate } from "react-router-dom";
import Explore from './Explore';
import Mapcord from '../Dashboard/Mapdata'
import Map  from '../Dashboard/Heatmap';
import { HeatMap } from "google-maps-react";
export const Opentoall = () => {
    const navigate = useNavigate();
    const {hmcenter,heatmp,setcenter,setheatmp,gradient,setmapdata} =Mapcord()
    const [mapheatmap,setmapheatmap]=useState()
    useEffect(()=>{
        document.getElementById('appcontainer').style.paddingTop=document.getElementsByClassName('home-content')[0].offsetHeight+"px"
      },[])
  return (
    <>
    <section className="home-section">
    <div className="home-content"  >
      <span className="text" style={{paddingLeft:'30px'}} onClick={()=>{navigate('/app')}}><a href="#!" className="underlinetitle">R Q - A</a></span>
     </div>
     <div id='appcontainer'>
     <Explore/>
     </div>
  </section>
  <div className="modal top fade" id="heatmapmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="static" data-mdb-keyboard="true">
  <div className="modal-dialog modal-xl  modal-dialog-centered">
    <div className="modal-content">
    <div className="spinner-grow text-primary heatmapspinner" role="status" style={{ width: "3rem", height: "3rem",   position: "absolute",zIndex: "10" ,right: "50%",top: "50%"}}>
  <span className="visually-hidden">Loading...</span>
</div>
      <div className="modal-header">
       
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" data-mdb-target={sessionStorage.openmodal} data-mdb-toggle="modal" onClick={()=>{
          setTimeout(function () {
            document.getElementsByClassName('heatmapspinner')[0].style.display=''
            document.getElementById('heatmapmodalbody').style.pointerEvents='none'
            document.getElementById('heatmapmodalbody').style.filter='blur(1px)'
          }, 100)
        }}></button>
      </div>
      <div className="modal-body" id='heatmapmodalbody' style={{pointerEvents: "none",
    filter: "blur(1px)",padding:"0px"}}>
        {/* add heatmap button  */}
        <button id='updateheatmaplocation' style={{display:"none"}} onClick={(e)=>{
        // setcenter(JSON.parse(sessionStorage.center));
        setmapheatmap(<HeatMap
          gradient={gradient}
          positions={JSON.parse(sessionStorage.hetmapdata)}
          opacity={1}
          radius={20}
        />)
        setTimeout(function () {
          document.getElementsByClassName('heatmapspinner')[0].style.display='none'
          document.getElementById('heatmapmodalbody').style.pointerEvents='auto'
          document.getElementById('heatmapmodalbody').style.filter='none'
        }, 100)
        
        }}>change center</button>
<button id='removeheatmaplocation'
        onClick={() => {
          setmapheatmap();
          setTimeout(function () {
            document.getElementById('updateheatmaplocation').click()
          }, 1000)
        }}
        style={{display:"none"}}
      >
        remove
      </button>
        <Map center={sessionStorage.hetmapdata?JSON.parse(sessionStorage.hetmapdata)[0]:[]} 
        heatmp={mapheatmap}/>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
