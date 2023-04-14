import React , {useEffect,useState} from 'react'
import {useLocation} from "react-router-dom";
import {db} from "../../firebase"
import {useNavigate } from "react-router-dom";
import Video from "yet-another-react-lightbox/plugins/video";
import Lightbox from "yet-another-react-lightbox";
import ReactPlayer from 'react-player/lazy';
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import {collection,getDoc,doc} from 'firebase/firestore';
import Viewlocationmodal from './Viewlocationmodal'
import Viewuser from './Viewuser'
import { RWebShare } from "react-web-share";
import Likes from './Likes'
import Comments from './Comments'
import Bar_chart from '../Dashboard/Bar_chart'
import { MDBTooltip } from 'mdb-react-ui-kit';
import Mapcord from '../Dashboard/Mapdata'
import Map  from '../Dashboard/Heatmap';
import { HeatMap } from "google-maps-react";
const Share = () => {
  const navigate = useNavigate();
  const {hmcenter,heatmp,setcenter,setheatmp,gradient,setmapdata} =Mapcord()
  const [mapheatmap,setmapheatmap]=useState()
    const { search } = useLocation();
    const [markerlocation,setmarkerlocation]=useState()
    const [id,setid]=useState()
    const [data,setdata]=useState()
    const [sharehtml,sethtml]=useState(<div></div>)
    const  usercollectionref=collection(db,"user");
    const [slides,setslide]=useState([])
    const [openn, setOpen] = useState(false);
    const[ openvideo,setOpenvideo]=useState(false)


    const fetchBlogs=async(id)=>{
      const docRef = doc(db, "user", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data=docSnap.data()
        setht(data,id)
        setmarkerlocation({lat:data.location.lat , lng:data.location.lng})
      } else {
        navigate('/error')
      }
  }

  useEffect(()=>{
    const urlParams = Object.fromEntries([...new URLSearchParams(search)]);
    setid(urlParams['id']);
    fetchBlogs(urlParams['id'])
  },[])



function outputgenerator(temp23 , tempid){
  try {
    if (temp23.isdone===true && temp23.isvideo===true && temp23.isgeocord===false){
      return(<>
      <div>Condition : &nbsp;<span className={"badge badge-"+ temp23.status["1"]}>{temp23.status["0"]}</span>&nbsp;
        <MDBTooltip  tag='span'title={temp23.status["2"]}>
        <a type="button" style={{color:"#727272"}} className="fas fa-info-circle infobuttontooltip" href="#!"></a>
      </MDBTooltip>
      
      </div>

{/* <div> */}
      <button type="button" className={"btn btn-sm btn-light btn-outline-secondary mt-2"} data-mdb-toggle="modal" data-mdb-target={"#exampleModaloptiono"+tempid}><i className="fas fa-search"></i> View Report</button>
      {/* modal  */}


      <div className="modal top fade" id={"exampleModaloptiono"+tempid} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
<div className="modal-dialog  modal-dialog-centered">
  <div className="modal-content">
  <div className="modal-header">
    <div >REPORT</div>
      <button type="button"  className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
    <div className="modal-body">
      
      
      
      

    <div className={"note note-"+temp23.status["1"]+" mb-3"}>
<strong>Note :</strong>{temp23.status["2"]}
</div>

<div className="list-group list-group-light list-group-small">
  <div aria-current="true" className="list-group-item list-group-item-action px-3 border-0 ripple d-flex justify-content-between align-items-center" style={{cursor: "context-menu"}}>ADPF : {temp23.ADPF} 
        <MDBTooltip  tag='span'title='ADPF : Average of No. of Objects per Frame.'>
        <a type="button" style={{color:"#727272"}} className="fas fa-info-circle infobuttontooltip" href="#!"></a>
      </MDBTooltip>
  </div>
  <div aria-current="true" className="list-group-item list-group-item-action px-3 border-0 ripple d-flex justify-content-between align-items-center" style={{cursor: "context-menu"}}>DPV : {temp23.DPV} 
        <MDBTooltip  tag='span'title='DPV : Total Number of Defects per Video.'>
        <a type="button" style={{color:"#727272"}} className="fas fa-info-circle infobuttontooltip" href="#!"></a>
      </MDBTooltip>
  </div>


  <div aria-current="true" className="list-group-item list-group-item-action px-3 border-0 ripple d-flex justify-content-between align-items-center" style={{cursor: "context-menu"}}>Video Length : {temp23.video_length} 
        <MDBTooltip  tag='span'title='Length of Video in sec.'>
        <a type="button" style={{color:"#727272"}} className="fas fa-info-circle infobuttontooltip" href="#!"></a>
      </MDBTooltip>
  </div>
<button type="button" className="btn btn-outline-primary" data-mdb-toggle="modal" data-mdb-target={"#exampleModaloptionomap"+tempid}
data-mdb-dismiss="modal" aria-label="Close"
>
VIEW BAR-CHART
</button>



</div>





    </div>
  </div>
</div>
</div>  

<div className="modal top fade" id={"exampleModaloptionomap"+tempid} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="static" data-mdb-keyboard="true">
<div className="modal-dialog  modal-xl modal-dialog-centered">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">BAR - CHART</h5>
      <button type="button" className="btn-close" data-mdb-dismiss="modal" data-mdb-toggle="modal" data-mdb-target={"#exampleModaloptiono"+tempid} aria-label="Close"></button>
    </div>
    <div className="modal-body"><Bar_chart data={temp23.DPS}/></div>
  </div>
</div>
</div>
</>

      )
    }
    else if (temp23.isdone===true && temp23.isvideo===false){
      return(<>
      <div>Condition : &nbsp;<span className={"badge  badge-"+ temp23.status["1"]}>{temp23.status["0"]}</span> &nbsp;
      
        <MDBTooltip  tag='span'title={temp23.status["2"]}>
        <a type="button" style={{color:"#727272"}} className="fas fa-info-circle infobuttontooltip" href="#!"></a>
      </MDBTooltip>
      </div>
      <div>
      <button type="button" className={"btn btn-sm btn-light btn-outline-secondary mt-2"} data-mdb-toggle="modal" data-mdb-target="#exampleModaloptiononclick"><i className="fas fa-search"></i> View Report</button>
      {/* modal  */}
      <div className="modal top fade" id="exampleModaloptiononclick" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
<div className="modal-dialog  modal-dialog-centered">
  <div className="modal-content">
  <div className="modal-header">
    <div >REPORT</div>
      <button type="button"  className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
    <div className="modal-body">
      
      
      
      

    <div className={"note note-"+temp23.status["1"]+" mb-3"}>
<strong>Note :</strong>{temp23.status["2"]}
</div>

<div className="list-group list-group-light list-group-small">
  <div aria-current="true" className="list-group-item list-group-item-action px-3 border-0 ripple d-flex justify-content-between align-items-center" style={{cursor: "context-menu"}}>IOU : &nbsp; {temp23.IOU} 
        <MDBTooltip  tag='span'title='IOU : Percentage of Area covered by defects.'>
        <a type="button" style={{color:"#727272"}} className="fas fa-info-circle infobuttontooltip" href="#!"></a>
      </MDBTooltip>
  </div>
  <div aria-current="true" className="list-group-item list-group-item-action px-3 border-0 ripple d-flex justify-content-between align-items-center" style={{cursor: "context-menu"}}>NOD : &nbsp; {temp23.NOD}
        <MDBTooltip  tag='span'title='NOD : Number of Defects present in all images.'>
        <a type="button" style={{color:"#727272"}} className="fas fa-info-circle infobuttontooltip" href="#!"></a>
      </MDBTooltip>
  </div>
  <div aria-current="true" className="list-group-item list-group-item-action px-3 border-0 ripple d-flex justify-content-between align-items-center" style={{cursor: "context-menu"}}>NDI : &nbsp; {(temp23.NOD/temp23.outimages.length).toFixed(2)}
        <MDBTooltip  tag='span'title='NDI : Number of Defects present per images. (average)'>
        <a type="button" style={{color:"#727272"}} className="fas fa-info-circle infobuttontooltip" href="#!"></a>
      </MDBTooltip>
  </div>
  <div aria-current="true" className="list-group-item list-group-item-action px-3 border-0 ripple d-flex justify-content-between align-items-center" style={{cursor: "context-menu"}}> No. of Images: &nbsp; {temp23.outimages.length}</div>
  <div aria-current="true" className="list-group-item list-group-item-action px-3 border-0 ripple" style={{cursor: "context-menu"}}>
  <div>TYPES OF DEFECTS <i className="fas fa-long-arrow-alt-right me-2"></i></div>
  <ul>
    <li className="mb-1"><i className="fas fa-dot-circle me-2"></i> Potholes : {temp23.output[3]}</li>
    <li className="mb-1"><i className="fas fa-dot-circle me-2"></i> Cracks : {temp23.output[0]+temp23.output[1]+temp23.output[2]}</li>
  </ul>
  </div>
</div>





    </div>
  </div>
</div>
</div>
        </div>  
      </>)
    }
    else if (temp23.isdone===true && temp23.isvideo===true && temp23.isgeocord===true){
      return(<>
      <div>Condition : &nbsp;<span className={"badge badge-"+ temp23.status["1"]}>{temp23.status["0"]}</span>&nbsp;
      <MDBTooltip  tag='span'title={temp23.status["2"]}>
        <a type="button" style={{color:"#727272"}} className="fas fa-info-circle infobuttontooltip" href="#!"></a>
      </MDBTooltip>
      </div>

{/* <div> */}
      <button type="button" className={"btn btn-sm btn-light btn-outline-secondary mt-2"} data-mdb-toggle="modal" data-mdb-target={"#exampleModaloptiono"+tempid}><i className="fas fa-search"></i> View Report</button>
      {/* modal  */}


      <div className="modal top fade" id={"exampleModaloptiono"+tempid} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
<div className="modal-dialog  modal-dialog-centered">
  <div className="modal-content">
  <div className="modal-header">
    <div >REPORT</div>
      <button type="button"  className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
    <div className="modal-body">
      
      
      
      

    <div className={"note note-"+temp23.status["1"]+" mb-3"}>
<strong>Note :</strong>{temp23.status["2"]}
</div>

<div className="list-group list-group-light list-group-small">
  <div aria-current="true" className="list-group-item list-group-item-action px-3 border-0 ripple d-flex justify-content-between align-items-center" style={{cursor: "context-menu"}}>ADPF : {temp23.ADPF} 
        <MDBTooltip  tag='span'title='ADPF : Average of No. of Objects per Frame.'>
        <a type="button" style={{color:"#727272"}} className="fas fa-info-circle infobuttontooltip" href="#!"></a>
      </MDBTooltip>
  </div>
  <div aria-current="true" className="list-group-item list-group-item-action px-3 border-0 ripple d-flex justify-content-between align-items-center" style={{cursor: "context-menu"}}>DPV : {temp23.DPV} 
        <MDBTooltip  tag='span'title='DPV : Total Number of Defects per Video.'>
        <a type="button" style={{color:"#727272"}} className="fas fa-info-circle infobuttontooltip" href="#!"></a>
      </MDBTooltip>
  </div>


  <div aria-current="true" className="list-group-item list-group-item-action px-3 border-0 ripple d-flex justify-content-between align-items-center" style={{cursor: "context-menu"}}>Video Length : {temp23.video_length} 
        <MDBTooltip  tag='span'title='Length of Video in sec.'>
        <a type="button" style={{color:"#727272"}} className="fas fa-info-circle infobuttontooltip" href="#!"></a>
      </MDBTooltip>
  </div>
<button type="button" className="btn btn-outline-primary" data-mdb-toggle="modal" data-mdb-target={"#exampleModaloptionomap"+tempid}
data-mdb-dismiss="modal" aria-label="Close"
>
VIEW BAR-CHART
</button>

<button type="button" className="btn btn-outline-secondary"  data-mdb-toggle="modal" data-mdb-target="#heatmapmodal" onClick={()=>{updateheatmap(temp23,"#exampleModaloptiono"+tempid)}}> 
VIEW HEAT-MAP
</button>




</div>





    </div>
  </div>
</div>
</div>  

<div className="modal top fade" id={"exampleModaloptionomap"+tempid} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="static" data-mdb-keyboard="true">
<div className="modal-dialog  modal-xl modal-dialog-centered">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">BAR - CHART</h5>
      <button type="button" className="btn-close" data-mdb-dismiss="modal" data-mdb-toggle="modal" data-mdb-target={"#exampleModaloptiono"+tempid} aria-label="Close"></button>
    </div>
    <div className="modal-body"><Bar_chart data={temp23.DPS}/></div>
  </div>
</div>
</div>
      </>)
    }
  } catch (error) {
    
  }
}

function playfrontvideo(tempvideo){
  if (tempvideo.isvideo===true && tempvideo.isdone===true){
    return(<ReactPlayer id="myVedio"
  url={tempvideo.outputvideo}
  width='100%'
  height='100%'
  playing={true}
  loop={true}
  volume={0}
  progressInterval={5000}
  pip={true}
/>)
  }
  else if(tempvideo.isvideo===true){
    return(<ReactPlayer id="myVedio"
  url={tempvideo.videourl}
  width='100%'
  height='100%'
  playing={true}
  loop={true}
  volume={0}
  progressInterval={5000}
  pip={true}
/>)
  }
  else if(tempvideo.isdone) {
    return(<img src={tempvideo.outimages[0]} style={{objectFit:"cover" , height: "200px"}}
className="w-100" alt='alternate'/>)
  }
  else{
    return(
<img src={tempvideo.fileurl[0]} style={{objectFit:"cover" , height: "200px"}}
className="w-100" alt='alternate' />)
  }
  
}
const getdate=(timestamp)=>{
  var dateFormat = new Date(timestamp) 
          return ("Date: "+ dateFormat.getDate()+
     "/"+(dateFormat.getMonth()+1)+
     "/"+dateFormat.getFullYear()+
     " "+dateFormat.getHours()+
     ":"+dateFormat.getMinutes()+
     ":"+dateFormat.getSeconds())
}
function timeDiff(pdate) {
const curr=new Date()
const prev=new Date(pdate)
var ms_Min = 60 * 1000; 
var ms_Hour = ms_Min * 60;
var ms_Day = ms_Hour * 24;
var ms_Mon = ms_Day * 30; 
var ms_Yr = ms_Day * 365; 
var diff = curr - prev; 
if (diff < ms_Min) {
    return Math.round(diff / 1000) + ' seconds ago';
} else if (diff < ms_Hour) {
    return Math.round(diff / ms_Min) + ' minutes ago';
} else if (diff < ms_Day) {
    return Math.round(diff / ms_Hour) + ' hours ago';
} else if (diff < ms_Mon) {
    return 'Around ' + Math.round(diff / ms_Day) + ' days ago';
} else if (diff < ms_Yr) {
    return 'Around ' + Math.round(diff / ms_Mon) + ' months ago';
} else {
    return 'Around ' + Math.round(diff / ms_Yr) + ' years ago';
}
}
function updateheatmap(location,modalopen){
  sessionStorage.center =JSON.stringify(location.location);
  sessionStorage.hetmapdata=JSON.stringify(location.mapgeolocation)
  sessionStorage.openmodal=modalopen
  document.getElementById('removeheatmaplocation').click();
}
const returnmap=(data)=>{
  return(<Viewlocationmodal markerlocation={{lat:data.location.lat , lng:data.location.lng}}/>)
}
const setslides=(data)=>{
  if(data.isvideo===true && data.isdone){
    setslide([
      {
        type: "video",
        width: 1280,
        height: 720,
        autoPlay:true,
        sources: [
          {
            src: data.outputvideo,
            type: "video/mp4"
          }
        ]
      },
    ])
    setOpenvideo(true)
  }
  
  else if(data.isvideo===true){
    setslide([
      {
        type: "video",
        width: 1280,
        height: 720,
        autoPlay:true,
        sources: [
          {
            src: data.videourl,
            type: "video/mp4"
          }
        ]
      },
    ])
    setOpenvideo(true)
  }
  else if(data.isvideo===false && data.isdone){
    var files=[]
    data.outimages.map((i)=>{
      files.push({src:i})
    })
    setslide(files)
    setOpen(true)
  }
  else if(data.isvideo===false){
    var files=[]
    data.fileurl.map((i)=>{
      files.push({src:i})
    })
    setslide(files)
    setOpen(true)
  }
}
const setht=(data,id)=>{
sethtml(
  <>
  {returnmap(data)}
  
<div className="row justify-content-center mb-3" style={{height:"100vh" ,    alignContent: "center"}} >
<div className="col-md-12 col-xl-10">
  <div className="card shadow-0 border rounded-3" >
    <div className="card-body">
      <div className="row">
        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
          <div className="bg-image hover-zoom ripple rounded ripple-surface" style={{width:"100%", height: "195px"}}>
            
            {playfrontvideo(data)}
            <a href="#!"   onClick={()=>{setslides(data)}} >
              <div className="hover-overlay">
                <div className="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
              </div>
            </a>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6">
            
         <Viewuser item={data}/>
          
          <div >
            {outputgenerator(data , 1)}
          </div>
          <div className="mt-1 mb-0 text-muted small">
            <span>Address</span>
            <span className="text-primary"> : </span>
            <span>{data.address.OverAllAddress}</span>
            
          </div>
          <div className="mb-2 text-muted small">
            <span>Additional Info.</span>
            <span className="text-primary"> : </span>
            <span>{data.address.additionalInformation}</span>
            
          </div>
          <p className="text-truncate mb-4 mb-md-0">
            Message : {data.message ? data.message:"No Message" }
          </p>
        </div>
        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
          
          <h6 className=".text-black-50">{getdate(data.date)}</h6>
          <p className="text-muted updatetext">{data.updated?"Last Updated: "+timeDiff(data.updated):""}</p>
          {/* <h6 className=".text-black-50"></h6> */}
          <div className="d-flex flex-column ">
          <Likes id={id}/>
            <button className="btn btn-primary btn-sm mt-3" type="button" data-mdb-toggle="modal" data-mdb-target="#viewlocationmodal" >View Location &nbsp; <i className="fas fa-map-marker"></i></button>
            <Comments id={id} />
            <div class="btn-group shadow-0 mt-3" role="group" aria-label="Basic example"> 
            <RWebShare
    data={{
      text: "Road Quality Report - RQ-A",
      url: window.location.origin+"/view?id="+id,
      title: "RQ-A",
    }} 
  >
            <button type="button" className="btn btn-outline-secondary   btn-sm" data-mdb-ripple-color="#000000"> Share <i className="fas fa-share ms-1"></i></button>
  </RWebShare>
  <a type="button" className="btn btn-outline-secondary    btn-sm " href={window.location.origin+"/download?id="+id} target="_blank" style={{cursor:'pointer'}}><span className="far fa-circle-down ms-3 " ></span></a>
      </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>



</>
)

}
  return (
    <>
    {sharehtml}
    <Lightbox
        open={openn}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Thumbnails]}
      /> 

      <Lightbox
  plugins={[Video]}
  open={openvideo}
  close={() => setOpenvideo(false)}
  slides={slides}
/>

<section className="home-section">
    <div className="home-content"  >
      <span className="text" style={{paddingLeft:'30px'}} onClick={()=>{navigate('/app')}}><a href="#!" className="underlinetitle">R Q - A</a></span>
     </div>
  </section>
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
      </>
    
    
  )
}

export default Share