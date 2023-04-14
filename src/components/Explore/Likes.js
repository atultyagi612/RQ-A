import React, {useState,useEffect} from 'react'
import {db} from "../../firebase"
import {collection,getDocs,query, orderBy ,doc, addDoc,where,deleteDoc,getCountFromServer } from 'firebase/firestore';
import { UseUserAuth } from '../../context/UserAuthContext'
const Likes = (props) => {
    const  usercollectionref=collection(db,"upvokes");
    const [like,setlike]=useState(false)
    const [totallike,settotallike] = useState(0)
    const [color1,setcolor]=useState('black')
    const [likeid,setlikeid]=useState([])
    const { user} = UseUserAuth();


    useEffect(()=>{
        getlikes()
        getuserlike()
        
    },[])
    const getlikes=async()=>{
        const snapshot = await getCountFromServer(query(usercollectionref, where('id',"==",props.id) ))
        settotallike(snapshot.data().count)
    }
    const getuserlike=async()=>{
        const snapshot = await getDocs(query(usercollectionref, where('id',"==",props.id), where('user',"==",user.email) ))
        var tmplst=[]
        snapshot.forEach((dd)=>{
            tmplst.push(dd.id)
        })
        setlikeid(tmplst)
        if (tmplst.length >0){
            setlike(true)
            setcolor('blue')
        }
        // delete extral likes 
        if(tmplst>1){
            tmplst.slice(1).forEach((id)=>{
                deleteDoc(doc(db, 'upvokes', id))
            })
        }
        
    }
    const likethis=async()=>{
        if (like===false){
            setlike(true)
            setcolor('blue')
            settotallike(totallike+1)
            addDoc(usercollectionref,{id:props.id , user:user.email}).then((e)=>{
                setlikeid([e.id])
            })
        }
        else{
            likeid.forEach((id)=>{
                deleteDoc(doc(db, 'upvokes', id)).then(()=>{
            setlike(false)
            setcolor('black')
            settotallike(totallike-1)
                })
            })
        }
    }
  return (
    <>

    <div className=" d-flex justify-content-around align-items-center mt-1">
        <p className='small text-muted mb-0'>
  <a href="#!"  style={{color:"black"}} onClick={likethis}>Upvote? <i className="far fa-thumbs-up" style={{color:color1}}></i> {totallike}</a>
  </p>
</div>
    </>
  )
}

export default Likes