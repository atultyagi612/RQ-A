import React, {useState,useEffect} from 'react'
import {db} from "../../firebase"
import {collection,query,where,getCountFromServer } from 'firebase/firestore';
const Likes = (props) => {
    const  usercollectionref=collection(db,"upvokes");
    const [totallike,settotallike] = useState(0)
    const [color1,setcolor]=useState('black')


    useEffect(()=>{
        getlikes()
    },[])
    const getlikes=async()=>{
        const snapshot = await getCountFromServer(query(usercollectionref, where('id',"==",props.id) ))
        settotallike(snapshot.data().count)
    }

  return (
    <>

    <div className=" d-flex justify-content-around align-items-center mt-1">
        <p className='small text-muted mb-0'>
  <a href="#!"  style={{color:"black"}} >Upvote? <i className="far fa-thumbs-up" style={{color:color1}}></i> {totallike}</a>
  </p>
</div>
    </>
  )
}

export default Likes