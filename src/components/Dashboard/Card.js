import React from 'react'
import ReactPlayer from 'react-player/lazy';
import './dashboard.css'
import Bar_chart from './Bar_chart'
import { MDBTooltip } from 'mdb-react-ui-kit';
import { RWebShare } from "react-web-share";

const card = (item) => {
    var isfirst=true;
    var isfirstbutton=true;
    var incrslider=-1;

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
  function showbadge(tempbadge){
    // <p className={item.data.isdone?"text-success":"text-danger"}>{item.data.isdone?"Done":"Under Process"}</p>
    if (tempbadge.isdone){
    return(<>Status:&nbsp; <span className="badge rounded-pill badge-success">Success</span>
    
        <MDBTooltip tooltipTag='span'  tag='span'title="Share">
        <RWebShare
        data={{
          text: "Road Quality Report - RQ-A",
          url: window.location.origin+"/view?id="+item.id,
          title: "RQ-A",
        }}
      >
        <i className="fas fa-share ms-1" style={{cursor:'pointer'}}></i>
        </RWebShare>
      </MDBTooltip>
      <MDBTooltip tooltipTag='span'  tag='span'title="Download Report">
        <a className="far fa-circle-down ms-3 " href={window.location.origin+"/download?id="+item.id} target="_blank" style={{cursor:'pointer',color:"black"}}></a>
        
      </MDBTooltip>
                
      
      </>)
    }
    else{
    return(<>Status:&nbsp; <span className="badge rounded-pill badge-warning">Under Process</span></>)}
    

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

  return (
    <>
    <div className="row justify-content-center mb-3" >
    <div className="col-md-12 col-xl-10">
      <div className="card shadow-0 border rounded-3">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
              <div className="bg-image hover-zoom ripple rounded ripple-surface" style={{width:"100%", height: "195px"}}>
                
                {playfrontvideo(item.data)}
                
                <a href="#!"onClick={()=>{item.setslides(item.data)}}>
                  <div className="hover-overlay">
                    <div className="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
            {item.data.isvideo===true ?<h5>{" Video"}</h5>:<h5>{item.data.fileurl.length +" Images"}</h5>}
              
              <div >
                {outputgenerator(item.data , item.id)}
              </div>
              <div className="mt-1 mb-0 text-muted small">
                <span>Address</span>
                <span className="text-primary"> : </span>
                <span>{item.data.address.OverAllAddress}</span>
                
              </div>
              <div className="mb-2 text-muted small">
                <span>Additional Info.</span>
                <span className="text-primary"> : </span>
                <span>{item.data.address.additionalInformation}</span>
                
              </div>
              <p className="text-truncate mb-4 mb-md-0">
                Message : {item.data.message ? item.data.message:"No Message" }
              </p>
            </div>
            <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
              <div className="d-flex flex-row align-items-center mb-1">
              {showbadge(item.data)}
              </div>
              <h6 className=".text-black-50">{getdate(item.data.date)}</h6>
              <p className="text-muted updatetext">{item.data.updated?"Last Updated: "+timeDiff(item.data.updated):""}</p>
              {/* <h6 className=".text-black-50"></h6> */}
              <div className="d-flex flex-column mt-4">
            
                <button className="btn btn-primary btn-sm" type="button" data-mdb-toggle="modal" data-mdb-target="#viewlocationmodal" onClick={()=>{item.setmaplocation({lat:item.data.location.lat , lng:item.data.location.lng})}} >View Location &nbsp; <i className="fas fa-map-marker"></i></button>
                <button className="btn btn-outline-primary btn-sm mt-2" type="button" onClick={()=>{item.update(item); document.getElementById('updatemodalbuttonid').click()}}>
                  EDIT &nbsp;<i className="far fa-edit"></i>
                </button>
                <button className="btn  btn-danger btn-sm mt-2" type="button" onClick={()=>{item.deletedoc(item.id); }}>
                  DELETE
                </button>
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


export default card
