import React,{useState,useEffect} from 'react'
import { MDBTextArea,MDBInput } from 'mdb-react-ui-kit';
import { storage, db } from '../../firebase';
import {collection,getDoc,query,where,doc,updateDoc,getDocs} from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import Video from "yet-another-react-lightbox/plugins/video";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

export default function Resolved(props) {
    const [reopenmessage , setreopenmessage]=useState("")
    const [showmedia , setshowmedia]=useState(false)
    const [resolvemedia , setresolvemedia]=useState([])

    const getdate2=(timestamp)=>{
        var dateFormat = new Date(timestamp) 
        var outdate=dateFormat.getDate()+
        "/"+(dateFormat.getMonth()+1)+
        "/"+dateFormat.getFullYear()+
        " "+dateFormat.getHours()+
        ":"+dateFormat.getMinutes()
        
        return (outdate)
    }
    const reopenreport =async(id)=>{
        if(reopenmessage.length===0){
          toast.error("Empty Message")
        }
        else{
          const docreff=doc(db,"user",props.id)
          const updateobjt={reopen:true , reopenmessage:reopenmessage}
          updateobjt[`log.${Date.now()}`]="Reopen Report : "+reopenmessage
                  await updateDoc(docreff,updateobjt).then(()=>{
                          toast.success("Re-Open Report successfully")
                          document.getElementById('closemodalbutton').click()
                          props.reload()
                        })
        }
       }
  
      const getlogss=(dict)=>{
        var outtt=[]
        const keyss=Object.keys(dict).sort().reverse()
        // keyss.forEach((key)=>{
        //   outtt.push(<div style={{display:"flex"}}><p  style={{    whiteSpace: "nowrap"}}>{getdate2(parseInt(key))}</p>   :  
        //   <p className='ms-4 border-start p-2' style={{overflow: "auto"}}>{dict[key]}</p></div>)
        // })
        keyss.forEach((key)=>{
       outtt.push(<tr key={key}>
        <th style={{    whiteSpace: "nowrap"}} scope="row">{getdate2(parseInt(key))}</th>
        <td style={{overflow: "auto"}}><p>{dict[key]}</p></td>
      </tr>)})
        
      return outtt
      }
  return (
    <>
    {props.data.resolved?<Lightbox
  plugins={[Video,Thumbnails]}
  open={showmedia}
  close={() => setshowmedia(false)}
  slides={resolvemedia}
/>:<></>}
    {props.data.resolved?<div className="d-flex border-top justify-content-around align-items-center p-4 mt-2" style={{marginBottom: "calc(var(--mdb-card-spacer-y) * -0.5)", flexWrap: "wrap",gap: "20px"}}>
          <div>Resolved By:- <a href={props.data.ResolverAgencyURL} target="_blank">{props.data.ResolverAgencyName}</a></div>
              <a type="button" onClick={()=>{setshowmedia(true) , setresolvemedia([{
    type: "video",
    width: 1280,
    height: 720,
    autoPlay:true,
    sources: [
      {
        src: props.data.resolvevideo[0],
        type: "video/mp4"
      }
    ]
  }])}} className="btn btn-light    btn-sm" data-mdb-ripple-color="#ffffff"> View Media <i className="fas fa-circle-play ms-1"></i></a>
              <a type="button" href={props.data.resolvepdf} target="_blank" className="btn btn-light    btn-sm" data-mdb-ripple-color="#ffffff">  View Report <i className="fas fa-file-lines ms-1"></i></a>
              {props.reopen?<a type="button"  target="_blank" data-mdb-toggle="modal" data-mdb-target={"#reopen-reportmodal"+props.id} className="btn btn-outline-danger    btn-sm" data-mdb-ripple-color="#ffffff">  Re-Open it</a>:<></>}
              
              </div>:<></>}
              
              <div className="accordion-body">
        {props.data.resolved?<><div className="accordion accordion-flush mt-3" id={"accordionFlushExample"+props.id}>
  <div className="accordion-item">
    <h4 className="accordion-header" id={"flush-headingOne"+props.id}>
      <button
        className="accordion-button collapsed"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target={"#flush-collapseOne"+props.id}
        aria-expanded="false"
        aria-controls={"flush-collapseOne"+props.id}
        style={{    backgroundColor: "rgb(243 243 243 / 56%)",
          borderRadius: "8px" , padding: "0.6rem"}}
      >
        LOGS
      </button>
    </h4>
    <div
      id={"flush-collapseOne"+props.id}
      className="accordion-collapse collapse table-responsive"
      aria-labelledby={"flush-headingOne"+props.id}
      data-mdb-parent={"#accordionFlushExample"+props.id}
    >
      <table className="table table-striped table-hover table-borderless table-sm ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Message</th>
    </tr>
  </thead>
  <tbody>
  { getlogss(props.data.log)
  }
    
    
  </tbody>

</table>
      

      </div>
    </div>
  </div></>:<></>}
              
  
  </div>

  <div className="modal top fade" id={"reopen-reportmodal"+props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog   modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Re-Open Report</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>It appear you are not satisfied with the submitted report or with the repaired road condition. want to re-open this report?</p>
        <MDBTextArea label='Message' type="text"  value={reopenmessage} onChange={(e)=>{setreopenmessage(e.target.value)}}className="form-control"  />
        </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" id='closemodalbutton' data-mdb-dismiss="modal">
          Close
        </button>
        <button type="button" className="btn btn-primary" onClick={()=>{reopenreport(props.id)}}>Re-Open</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
