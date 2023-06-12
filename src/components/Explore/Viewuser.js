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
    const [verifies,setverifies]=useState()
    const [likes,setlikes]=useState(0)
    const [Comments , setcomments]=useState(0)

    String.prototype.hashCode = function() {
      var hash = 0,
        i, chr;
      if (this.length === 0) return hash;
      for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    }

    const userhash=props.item.data.email.hashCode()
    useEffect(()=>{
        getlikescontri()
    },[])

    const getlikescontri=async()=>{
      if(userhash in props.diffuserdata){
        setverifies(props.diffuserdata[userhash].isverified)
      }
      else{
        const snapshot = await getCountFromServer(query(usercollectionref, where('user',"==",props.item.data.email) ))
        setlikes(snapshot.data().count)
        const snapshot2 = await getCountFromServer(query(usercollectionref2, where('email',"==",props.item.data.email) ))
        setcontribution(snapshot2.data().count)
        const verified=<Isverified email={props.item.data.email}/>
        setverifies(verified)
        props.diffuserdata[userhash]={contribution:snapshot.data().count , likes:snapshot2.data().count , isverified:verified , photourl:props.item.data.photourl , name:props.item.data.name , email:props.item.data.email}
      }

    }

    const setviewuserdata=()=>{
      props.setviewuserdata(props.diffuserdata[userhash])
    }

  return (
    <>

<div className='viewuserclass' data-mdb-toggle="modal" data-mdb-target="#exampleModaluserview" onClick={setviewuserdata} style={{cursor:"pointer"}}>
  <h5 style={{borderRadius:"5px"}} >
    <img src={props.item.data.photourl} className="rounded-circle shadow-1-strong me-3"
            width="30"
            height="30" alt="Avatar" loading="lazy"  />  {props.item.data.name} 
            &nbsp;
            <MDBTooltip  tooltipTag='span'  tag='span'title="Verified User">
            {/* {verifies} */}
            </MDBTooltip>
            </h5> </div>
            </>
  )
}

export default Viewuser