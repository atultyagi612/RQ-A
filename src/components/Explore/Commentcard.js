import React ,{useState,useEffect} from 'react'
import { UseUserAuth } from '../../context/UserAuthContext'
import {db} from "../../firebase"
import {collection,getDocs,query, orderBy ,doc,where,deleteDoc , addDoc,increment,updateDoc,getCountFromServer } from 'firebase/firestore';

const Commentcard = (props) => {
    const { user} = UseUserAuth();
    const  usercollectionref=collection(db,"comment");
    const  usercollectionref2=collection(db,"commentupvote");
    const [commentcolor , setcommentcolor]=useState('black')
    const [isupvote,setisupvote] = useState(false)
    const [totalupvote,settotalupvote] = useState(0)

    const deletecomment=async()=>{
        deleteDoc(doc(db, 'comment', props.id)).then(()=>{
            props.setallcomments(props.allcomments.filter(file => file.id !== props.id))
            props.getcommentsize()
        })
        
    }

    useEffect(()=>{
      isuserupvotethis()
      totalupvotes()
    },[])
    const totalupvotes=async()=>{
      settotalupvote(props.data.upvotes)
    }
    const isuserupvotethis=async()=>{
      const snapshot = await getCountFromServer(query(usercollectionref2, where('id',"==",props.id), where('user',"==",user.email) ))
      
      if(snapshot.data().count>0){
        setisupvote(true)
        setcommentcolor('blue')
      }
      
    }
    const uploaduserupvote=async()=>{
      addDoc(usercollectionref2,{id:props.id , user:user.email}).then(()=>{setisupvote(true)
        setcommentcolor('blue')
        settotalupvote(totalupvote+1)})
    }
    const deleteuserupvote=async()=>{
      const snapshot = await getDocs(query(usercollectionref2, where('id',"==",props.id), where('user',"==",user.email) ))
      snapshot.forEach((i)=>{
        deleteDoc(doc(db, 'commentupvote', i.id))
      })

    }
    const upvotecomment=async()=>{
      if(isupvote===false){
        await updateDoc(doc(db, "comment", props.id), {
          upvotes: increment(1)
        }).then(()=>{
          uploaduserupvote()
          })
      }
      else{
        await updateDoc(doc(db, "comment", props.id), {
          upvotes: increment(-1)
        }).then(()=>{
          deleteuserupvote()
          setisupvote(false)
          setcommentcolor('black')
          settotalupvote(totalupvote-1)})
        
      }
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
    const generatedelete=()=>{
        if(props.data.user===user.email){
            return(<a href="#!" className="d-flex align-items-center me-3" role="button" onClick={()=>{deletecomment()}} >
            <i className="fas fa-trash me-1" style={{color:'red'}}></i>
              <p className="mb-0" onMouseOver={(e)=>{e.target.style.color="#bb5353"}} onMouseOut={(e)=>{e.target.style.color="#4f4848"}}>DELETE</p>
            </a>)
        }

        
    }

  return (
    <>
    <div className="card-body">
            <div className="d-flex flex-start align-items-center">
              <img className="rounded-circle shadow-1-strong me-3"
                src={props.data.photourl} alt="avatar" width="40"
                height="40" />
              <div>
                <h6 className="fw-bold text-primary mb-1">{props.data.name}</h6>
                <p className="text-muted small mb-0">
                  Shared publicly - {timeDiff(props.data.date)}
                </p>
              </div>
            </div>

            <p className="mt-3 mb-4 pb-2">
              {props.data.comment}
            </p>
            <div className="small d-flex justify-content-start">
            <a href="#!" className="d-flex flex-row align-items-center me-3" onClick={upvotecomment}>
                <p className="mb-0">Upvoted</p> &nbsp;
                <i className="fas fa-thumbs-up me-1" style={{marginTop: "-0.16rem", color:commentcolor}}></i>
                <p className="mb-0">{totalupvote}</p>
              </a>
              {generatedelete()}

              
            </div>
          </div>
          <hr className="my-0"></hr>
    </>
  )
}
export default Commentcard;