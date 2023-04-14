import React,{useState,useEffect} from 'react'
import {db} from "../../firebase"
import {collection,getDocs,query, orderBy ,doc, addDoc,where,deleteDoc,getCountFromServer } from 'firebase/firestore';
import Isverified from '../Isverified';
import './viewusercss.css'
import { MDBTooltip } from 'mdb-react-ui-kit';
const Viewuser = (props) => {

    const [contribution , setcontribution]=useState(0)
    const  usercollectionref=collection(db,"upvokes");
    const  usercollectionref2=collection(db,"user");
    const [likes,setlikes]=useState(0)
    const [Comments , setcomments]=useState(0)
    useEffect(()=>{
        getlikes()
        getcontribution()
    },[])

    const getlikes=async()=>{
        const snapshot = await getCountFromServer(query(usercollectionref, where('user',"==",props.item.data.email) ))
        setlikes(snapshot.data().count)
    }
    const getcontribution =async()=>{
        const snapshot = await getCountFromServer(query(usercollectionref2, where('email',"==",props.item.data.email) ))
        setcontribution(snapshot.data().count)
    }

  return (
    <>

<div className='viewuserclass' data-mdb-toggle="modal" data-mdb-target="#exampleModaluserview" style={{cursor:"pointer"}}>
  <h5 style={{borderRadius:"5px"}} >
    <img src={props.item.data.photourl} className="rounded-circle shadow-1-strong me-3"
            width="30"
            height="30" alt="Avatar" loading="lazy"  />  {props.item.data.name} 
            &nbsp;
            <MDBTooltip  tooltipTag='span'  tag='span'title="Verified User">
            <Isverified email={props.item.data.email}/>
            </MDBTooltip>
            </h5> </div>


<div className="modal top fade" id="exampleModaluserview" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog modal-fullscreen   modal-dialog-centered">
    <div className="modal-content" style={{background: "transparent",boxShadow: "none"}}>
      
      <div className="modal-body">
      <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-md-9 col-lg-7 col-xl-5">
        <div className="card" style={{borderRadius: "15px"}}>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" style={{    position: "absolute",right: "0px",
    padding: "13px"}}></button>
          <div className="card-body p-4">
            <div className="d-flex text-black">
              <div className="flex-shrink-0">
                <img src={props.item.data.photourl}
                  alt="Generic placeholder image" className="img-fluid"
                  style={{width: "180px", borderRadius: "10px"}}/>
              </div>
              <div className="flex-grow-1 ms-3" style={{    overflow: "overlay"}}>
                <h5 className="mb-1">{props.item.data.name} &nbsp;
            <MDBTooltip  tooltipTag='span'  tag='span'title="Verified User">
            <Isverified email={props.item.data.email}/>
            </MDBTooltip> </h5>
                <p className="mb-2 pb-1" style={{color: "#2b2a2a"}}>{props.item.data.email}</p>
                <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                  style={{backgroundColor: "#efefef"}}>
                  <div>
                    <p className="small text-muted mb-1">Contribution</p>
                    <p className="mb-0">{contribution}</p>
                  </div>
                  <div className="px-3">
                    <p className="small text-muted mb-1">Likes</p>
                    <p className="mb-0">{likes}</p>
                  </div>
                  <div>
                    <p className="small text-muted mb-1">Comments</p>
                    <p className="mb-0">{Comments}</p>
                  </div>
                </div>
                <div className="d-flex pt-1">
                  <a type="button" className="btn btn-outline-primary me-1 flex-grow-1" href = "mailto: abc@example.com">Email</a>
                  {/* <button type="button" className="btn btn-primary flex-grow-1">Follow</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      </div>
      
    </div>
  </div>
</div>

            </>
  )
}

export default Viewuser