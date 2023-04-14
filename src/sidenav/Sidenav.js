import React,{useState,useEffect} from 'react'
import './sidenav.css'
import Phoneverification from './Phoneverification';
import {useNavigate } from "react-router-dom";
import { UseUserAuth } from '../context/UserAuthContext'
import Mapcord from '../components/Dashboard/Mapdata'
import Map  from '../components/Dashboard/Heatmap';
import { HeatMap } from "google-maps-react";
const Sidenav = (props) => {
  const {hmcenter,heatmp,setcenter,setheatmp,gradient,setmapdata} =Mapcord()
  const [mapheatmap,setmapheatmap]=useState()
  const [pagett, setpagee] = useState(props.Explore);
  const { logOut,user} = UseUserAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    document.getElementById('appcontainer').style.paddingTop=document.getElementsByClassName('home-content')[0].offsetHeight+"px"
  },[])
    const handleLogout = async () => {
        try {
          await logOut();
          navigate("/");
        } catch (error) {
          console.log(error.message);
        }
      };

 
    function openNav() {
  
        if (document.querySelector(".sidebar").style.width ==='260px'){
          document.querySelector(".sidebar").style.width='0px'
          document.body.style['overflow-y'] = 'scroll'
          document.querySelector(".sidebarbutton").style.width='0%'
        }
        else{
          document.querySelector(".sidebar").style.width='260px'
          document.querySelector(".sidebarbutton").style.width='100%'
          document.body.style['overflow-y'] = 'hidden'
        }
      }
      
  return (
    <>
    <Phoneverification/>
    {/* heat map modal */}
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
<div className='sidebarbutton' onClick={openNav}></div>
  <div className="sidebar">
    <div className="logo-details">
      <span className="logo_name">RQ-A</span>

    </div>
    <ul className="nav-links">
      <li onClick={()=>{setpagee(props.dashboard)}}>
        <a href="#!" onClick={openNav}>
          <i className='bx bx-grid-alt' ></i>
          <span className="link_name">Dashboard</span>
        </a>
        <ul className="sub-menu blank">
          <li><a className="link_name" href="#!">Category</a></li>
        </ul>
      </li>

     

      <li onClick={()=>{setpagee(props.services)}}>
        <a href="#!" onClick={openNav}>
          <i className='bx bx-grid-alt' ></i>
          <span className="link_name">Record</span>
        </a>
        <ul className="sub-menu blank">
          <li><a className="link_name" href="#!">Category</a></li>
        </ul>
      </li>

      <li onClick={()=>{setpagee(props.pictorial)}}>
        <a href="#!" onClick={openNav}>
          <i className='bx bx-grid-alt' ></i>
          <span className="link_name">Upload</span>
        </a>
        <ul className="sub-menu blank">
          <li><a className="link_name" href="#!">Category</a></li>
        </ul>
      </li>
      <li onClick={()=>{setpagee(props.Uploadvideo)}}>
        <a href="#!" onClick={openNav}>
          <i className='bx bx-grid-alt' ></i>
          <span className="link_name">Upload&nbsp;Video</span>
        </a>
        <ul className="sub-menu blank">
          <li><a className="link_name" href="#!">Category</a></li>
        </ul>
      </li>

      <li onClick={()=>{setpagee(props.Explore)}}>
        <a href="#!" onClick={openNav}>
          <i className='bx bx-compass' ></i>
          <span className="link_name">Explore</span>
        </a>
        <ul className="sub-menu blank">
          <li><a className="link_name" href="#!">Category</a></li>
        </ul>
      </li>



      <li>
    <div className="profile-details">
      <div className="profile-content">

      </div>
      <div className="name-job">
        <div className="profile_name">{user.displayName}</div>
        <div className="job">{user.email}</div>
      </div>
      <i className='bx bx-log-out' onClick={handleLogout}></i>
    </div>
  </li>
</ul>
  </div>
  
  
  <section className="home-section">
    <div className="home-content">
      <i className='bx bx-menu' onClick={openNav}></i>
      <span className="text"><a href="#!" className="underlinetitle">R Q - A</a></span>
      <p className="fw-light fst-italic" id='recordvideotxt' style={{margin: "0px" ,marginBottom: "-9px",marginLeft: "13px", display:"none"}}>/Record Video</p>
      
    </div>
    <div id='appcontainer'>
    {pagett}
    </div>
  </section>
  

    </>
  )
}

export default Sidenav