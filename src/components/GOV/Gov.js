import React , {useEffect,useState} from 'react'
import {useLocation} from "react-router-dom";
import { storage, db } from '../../firebase';
import {ref, uploadBytes} from "firebase/storage"
import {useNavigate } from "react-router-dom";
import Video from "yet-another-react-lightbox/plugins/video";
import Lightbox from "yet-another-react-lightbox";
import ReactPlayer from 'react-player/lazy';
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import {collection,getDoc,query,where,doc,updateDoc,getDocs} from 'firebase/firestore';
import Viewlocationmodal from './Viewlocationmodal'
import Viewuser from './Viewuser'
import { RWebShare } from "react-web-share";
import { MDBTextArea,MDBInput } from 'mdb-react-ui-kit';
import Likes from './Likes'
import Comments from './Comments'
import Bar_chart from '../Dashboard/Bar_chart'
import { MDBTooltip } from 'mdb-react-ui-kit';
import Mapcord from '../Dashboard/Mapdata'
import Map  from '../Dashboard/Heatmap';
import { HeatMap } from "google-maps-react";
import { toast, Toaster } from "react-hot-toast";
import Resolve from '../Dashboard/Resolved'
const Gov = () => {
  const navigate = useNavigate();
  const {hmcenter,heatmp,setcenter,setheatmp,gradient,setmapdata} =Mapcord()
  const [mapheatmap,setmapheatmap]=useState()
    const { search } = useLocation();
    const [markerlocation,setmarkerlocation]=useState()
    const [id,setid]=useState()
    const [video,savevideo]=useState(null);
    const [data,setdata]=useState({})
    const [sharehtml,sethtml]=useState(<div></div>)
    const  usercollectionref=collection(db,"user");
    const  authoritiesref=collection(db,"authorities");
    const [slides,setslide]=useState([])
    const [openn, setOpen] = useState(false);
    const[ openvideo,setOpenvideo]=useState(false)
    const [videourl , setvideourl]=useState([])
    const [showcurrvideo , setshowcurrvideo]=useState(false)
    const[pdf,savepdf]=useState(null)
    const [pdfavailable,setpdfavailable]=useState(false)
    const [videoavailable,setvideoavailable]=useState(false)
    const [showmedia , setshowmedia]=useState(false)
    const [verifytoken , setverifytoken]=useState()
    const [verifyid , setverifyid]=useState()


    const fetchBlogs=async(id)=>{
      const docRef = doc(db, "user", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data=docSnap.data()
        setdata(data)
        console.log(data)
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



  useEffect(()=>{
    if(pdfavailable=== true && videoavailable===true){
      document.getElementsByClassName('uploadfinalreport')[0].disabled=false
      
    }
    else{
      try {
        document.getElementsByClassName('uploadfinalreport')[0].disabled=true
      } catch (error) {
        
      }
      
    }
  },[pdfavailable , videoavailable])
const uploadandverify= async()=>{
  const querySnapshot = await getDocs(query(authoritiesref, where('ID',"==",verifyid), where('TOKEN',"==",verifytoken) ))
  if(!querySnapshot.empty){
    try{
      const imageref=ref(storage,Date.now()+video.name)
          uploadBytes(imageref,video).then(async(videooutput)=>{
            toast.success("Video uploaded succefully")
            const videourl=`https://firebasestorage.googleapis.com/v0/b/temp-fbe64.appspot.com/o/${videooutput.metadata.fullPath}?alt=media&token=231ce46b-d69e-4919-9e19-18bff44cc50a`
            console.log(videourl)
            const pdfref=ref(storage,Date.now()+pdf.name)
            uploadBytes(pdfref,pdf).then(async(pdfoutput)=>{
              toast.success("pdf uploaded succefully")
            const pdfurl=`https://firebasestorage.googleapis.com/v0/b/temp-fbe64.appspot.com/o/${pdfoutput.metadata.fullPath}?alt=media&token=231ce46b-d69e-4919-9e19-18bff44cc50a`
            console.log(pdfurl)
            const docreff=doc(db,"user",id)
            const updateobjt={
              resolved:true ,reopen:false,resolvestatus:true, resolvevideo:[videourl] , reopen:false ,resolvepdf:pdfurl , ResolverAgencyName:querySnapshot.docs[0].data().name , ResolverAgencyURL:querySnapshot.docs[0].data().url
             }
             updateobjt[`log.${Date.now()}`]="Resolved :  Resolved by- " +querySnapshot.docs[0].data().name
            await updateDoc(docreff,updateobjt).then(()=>{
                    toast.success("Updated successfully")
                    console.log("updated successfully")
                  }) 
            })


  })
  }
  catch(e){
    toast.error(e.message)
  }
  document.getElementById('verifycredclosebutton').click()

}
  else{
    toast.error("Wrong Token or ID")
  }
}

  const resolvereport=()=>{
    console.log("uploading")
    document.getElementById("verifycredbutton").click()
   
  }
  const setfilevideo =(video)=>{
    
    if (video[0]!==undefined){
      savevideo(video[0])
      setvideoavailable(true)
      document.getElementsByClassName('videouploadtick')[0].style.display="unset"
      console.log(video)
      var media = URL.createObjectURL(video[0]);
      setvideourl([{
        type: "video",
        width: 1280,
        height: 720,
        autoPlay:true,
        sources: [
          {
            src: media,
            type: "video/mp4"
          }
        ]
      }])
      
    document.getElementById('videoname').innerText = ` Video file name :  ${video[0].name}`
    document.getElementById('alert-1').style.display=''
    }
    
}
const setpdffiles = (pdf)=>{
  if (pdf[0]!==undefined){
  savepdf(pdf[0])
  setpdfavailable(true)
  document.getElementsByClassName('reportuploadtick')[0].style.display="unset"
  document.getElementById('pdfname').innerText = ` PDF file name :  ${pdf[0].name}`
    document.getElementById('pdfalert-1').style.display=''
  console.log(pdf)
  }
}
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
const getdate2=(timestamp)=>{
  var dateFormat = new Date(timestamp) 
  var outdate=dateFormat.getDate()+
  "/"+(dateFormat.getMonth()+1)+
  "/"+dateFormat.getFullYear()+
  " "+dateFormat.getHours()+
  ":"+dateFormat.getMinutes()
  
  return (outdate)
}

const getlogss=(dict)=>{
  var outtt=[]
  const keyss=Object.keys(dict).sort().reverse()
  // keyss.forEach((key)=>{
  //   outtt.push(<div style={{display:"flex"}}><p  style={{    whiteSpace: "nowrap"}}>{getdate2(parseInt(key))}</p>   :  
  //   <p className='ms-4 border-start p-2' style={{overflow: "auto"}}>{dict[key]}</p></div>)
  // })
  keyss.forEach((key)=>{
 outtt.push(<tr>
  <th style={{    whiteSpace: "nowrap"}} scope="row">{getdate2(parseInt(key))}</th>
  <td style={{overflow: "auto"}}><p>{dict[key]}</p></td>
</tr>)})
  
console.log(outtt)
return outtt
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
  {data.resolved?data.reopen?<span className='badge  badge-danger w-100 p-2' >RE-OPENED</span>:<span className='badge  badge-success w-100 p-2' >RESOLVED</span>:<></>}
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
              <div className="btn-group shadow-0 mt-3" role="group" aria-label="Basic example"> 
              
              <button  data-mdb-toggle="collapse"
  href="#collapseExample"
  role="button"
  aria-expanded="false"
  aria-controls="collapseExample" type="button" className="btn btn-outline-danger   btn-sm" data-mdb-ripple-color="#000000" style={{borderRadius: "3px"}}> {data.resolved?"Update resolve":"Resolve Report"} <i className="far fa-calendar-minus ms-1"></i></button>

    <a type="button" className="btn btn-secondary    btn-sm ms-1"  data-mdb-ripple-color="#ffffff" href={window.location.origin+"/download?id="+id} target="_blank" style={{cursor:'pointer',borderRadius:"4px"}}><span className="far fa-circle-down" ></span></a>
        </div>
            </div>
          </div>
        </div>
        <Resolve id={id} data ={data}   reopen={false}/>
      </div>
       
    </div>
    <div className="collapse tmpstylecollapse" style={{backgroundColor: "#e8e5eb"}} id="collapseExample">
    <div className="h-100 d-flex justify-content-around align-items-center pt-3 pb-3">
    <button type="button" className="btn btn-outline-primary    " data-mdb-toggle="modal" data-mdb-target="#uploadmedia" data-mdb-ripple-color="#000000"> Upload Video <i className="fas fa-check videouploadtick" style={{display:"none"}}></i></button>
    <button type="button" className="btn btn-outline-primary    " data-mdb-toggle="modal" data-mdb-target="#uploadreport" data-mdb-ripple-color="#000000"> Upload Report <i className="fas fa-check reportuploadtick" style={{display:"none"}}></i></button>
    <button type="button" className="btn btn-outline-success  uploadfinalreport  " data-mdb-ripple-color="#000000"  onClick={()=>{resolvereport()}}> Upload </button>
</div>
</div>
  </div>
  
  </div>

  
  
  
  </>
  )
  
  }
  return (
    <>
    <Toaster toastOptions={{ duration: 3000 }} />
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
{data.resolved?<Lightbox
  plugins={[Video,Thumbnails]}
  open={showmedia}
  close={() => setshowmedia(false)}
  slides={[{
    type: "video",
    width: 1280,
    height: 720,
    autoPlay:true,
    sources: [
      {
        src: data.resolvevideo[0],
        type: "video/mp4"
      }
    ]
  }]}
/>:<></>}

<Lightbox
  plugins={[Video,Thumbnails]}
  open={showcurrvideo}
  close={() => setshowcurrvideo(false)}
  slides={videourl}
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

{/* Upload Video  */}

      

<div className="modal top fade" id="uploadmedia" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog modal-xl  modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Upload Video</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">



      <div id='onlycss' className='mt-3' style={{backgroundColor:"white",padding: "30px",margin: "auto",borderRadius: "4px", border: "var(--mdb-border-width) var(--mdb-border-style) var(--mdb-border-color)"}}>
    {/* <div className="title" style={{marginBottom: "1em"}}>Upload Video</div> */}
<div className="flex items-center justify-center w-full" style={{    flexFlow: "column"}}>
<div id="alert-1" style={{width: "100%",display:"none"}} className="marginzero flex p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
   <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
</svg>
  <span className="sr-only">Info</span>
  <div id='videoname' className="ml-3 text-sm font-medium">
    video link
    
  </div>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a id='playvideoinnewtab' className='font-semibold underline hover:no-underline' href="#!" onClick={()=>{setshowcurrvideo(true)}}>View this video.</a> 
</div>
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
            <p className="fst-italic text-xs text-gray-500 dark:text-gray-400">Supported files</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">MP4, WebM, WAV, MOV</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept="video/mp4,video/x-m4v,video/*" onChange={(e)=>{setfilevideo(e.target.files)}} />
    </label>
    <button type="button" id='uploadvideosubmitbutton' style={{display:"none"}} className="btn btn-primary uploadbutton23"  onClick={()=>{document.getElementById('uploadbutton').click()}}>
                Upload
                </button>
</div> 

</div>


      </div>
      
    </div>
  </div>
</div>
    

{/* upload report  */}
{/* uploadreport */}
<div className="modal top fade" id="uploadreport" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog modal-xl  modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Upload Report</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">


<p>Report should be in pdf format with all the necessary information.</p>
      <div id='onlycss' className='mt-3' style={{backgroundColor:"white",padding: "30px",margin: "auto",borderRadius: "4px", border: "var(--mdb-border-width) var(--mdb-border-style) var(--mdb-border-color)"}}>
    {/* <div className="title" style={{marginBottom: "1em"}}>Upload Video</div> */}
<div className="flex items-center justify-center w-full" style={{    flexFlow: "column"}}>
<div id="pdfalert-1" style={{width: "100%",display:"none"}} className="marginzero flex p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
   <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
</svg>
  <span className="sr-only">Info</span>
  <div id='pdfname' className="ml-3 text-sm font-medium">
    video link
    
  </div>
  &nbsp;&nbsp;&nbsp;&nbsp;
  
</div>
    <label htmlFor="dropzone-file2" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
            <p className="fst-italic text-xs text-gray-500 dark:text-gray-400">Supported files</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
        </div>
        <input id="dropzone-file2" type="file" className="hidden" accept="application/pdf" onChange={(e)=>{setpdffiles(e.target.files)}} />
    </label>
</div> 

</div>


      </div>
      
    </div>
  </div>
</div>


<button type="button" class="btn btn-primary" data-mdb-toggle="modal" id='verifycredbutton' data-mdb-target="#verifycred" style={{display:"none"}}>
  Launch demo modal
</button>


<div class="modal top fade" id="verifycred" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div class="modal-dialog   modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Verify Authenticity</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="form-outline mb-3">
<MDBInput label='ID' type="ID"  value={verifyid} onChange={(e)=>{setverifyid(e.target.value)}}className="form-control"  />
  
</div>
<div className="form-outline mb-3">
<MDBInput label='TOKEN' type="TOKEN"  value={verifytoken} onChange={(e)=>{setverifytoken(e.target.value)}}className="form-control"  />
  
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="verifycredclosebutton" data-mdb-dismiss="modal">
          Close
        </button>
        <button type="button" class="btn btn-primary" onClick={()=>{uploadandverify()}}>UPLOAD</button>
      </div>
    </div>
  </div>
</div>

</>
  )
}

export default Gov;