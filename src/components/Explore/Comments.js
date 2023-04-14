import React,{useState ,useEffect} from 'react'
import { UseUserAuth } from '../../context/UserAuthContext'
import {db} from "../../firebase"
import {collection,getDocs,query, orderBy ,doc,where,deleteDoc , addDoc,limit , startAfter , getCountFromServer } from 'firebase/firestore';
import Commentcard from './Commentcard';
import './scroll.css'
import { MDBTextArea } from 'mdb-react-ui-kit';

const Comments = (props) => {
    const [comment , setcomment]=useState()
    const [allcomments , setallcomments] =useState([])
    const [lastcomment , setlastcomment] = useState()
    const [totalcomment , settotalcomments] = useState()
    const { user} = UseUserAuth();
    const  usercollectionref=collection(db,"comment");
    
useEffect(()=>{
    getcomments()
    getcommentsize()
},[])
useEffect(()=>{
  
},[])

const getcomments=async()=>{
    setallcomments([])
    const snapshot = await getDocs(query(usercollectionref, where('id',"==",props.id), orderBy('date', "desc"), limit(2)))
        snapshot.forEach((item)=>{
            setallcomments(prevState => [...prevState, item])
        })
        setlastcomment(snapshot.docs[snapshot.docs.length-1])
    
}
const getnext2comments=async()=>{
    const snapshot = await getDocs(query(usercollectionref, where('id',"==",props.id), orderBy('date', "desc"),startAfter(lastcomment), limit(10)))
        snapshot.forEach((item)=>{
            setallcomments(prevState => [...prevState, item])
        })
        setlastcomment(snapshot.docs[snapshot.docs.length-1])
}
const getcommentsize=async()=>{
    const snapshot = await getCountFromServer(query(usercollectionref, where('id',"==",props.id) ))
    settotalcomments(snapshot.data().count)
}


    const uploadcomment=async()=>{
        addDoc(usercollectionref,{id:props.id , user:user.email , comment:comment , upvotes:0 , date:Date.now() , name:user.displayName , photourl:user.photoURL}).then(()=>{
            getcomments()
            getcommentsize()

        })
    }

const deletebutton=()=>{
  if(allcomments.length<totalcomment){
    return(<button type="button" style={{    width: "100%"}} className="btn btn-secondary mt-3" onClick={getnext2comments}>{"Load more ..."+ (totalcomment - allcomments.length)}</button>
    )
  }
}

const nocomments=()=>{
  if(totalcomment===0){
    return(<div className='mt-4 mb-4' style={{textAlign: "center"}}>No Comments....</div>)
  }
}
  return (
    <>
<button type="button" className="btn btn-secondary mt-2" data-mdb-toggle="modal" data-mdb-target={"#exampleModalcomment"+props.id}>
  Comments &nbsp; <i className="far fa-comment-alt"> &nbsp; {totalcomment}</i>
</button>

{/* modal  */}
<div className="modal top fade" id={"exampleModalcomment"+props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog modal-xl  modal-dialog-centered">
    <div className="modal-content" style={{    background: "transparent",boxShadow: "none !important"}}>
      <div className="">

      <section>
      
  <div className="container">
    <div className="row d-flex justify-content-center">
      
      <div className="col-md-12 col-lg-10 col-xl-8">
        
        <div className="card">
          
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" style={{        marginLeft: "auto",marginRight: "0",padding: "10px"}}></button>
            {/* comment  */}
        <div className="card-footer py-3 border-0" style={{backgroundColor: "#f8f9fa"}}>
            <div className="d-flex flex-start w-100">
              <img className="rounded-circle shadow-1-strong me-3"
                src={user.photoURL} alt="avatar" width="40"
                height="40" />
              {/* <div className="form-outline w-100"> */}
              <MDBTextArea label='Comment' id="textAreaExample" rows="4" value={comment}  onChange={(e)=>{setcomment(e.target.value)}}
                  />
              {/* </div> */}
            </div>
            <div className="float-end mt-2 pt-1">
              <button type="button" className="btn btn-primary btn-sm me-4" onClick={uploadcomment}>Post comment</button>
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={()=>{setcomment("")}}>Cancel</button>
            </div>
          </div>
          {/* single card  */}
          <div style={{maxHeight:"62vh" , overflow:"scroll"}} id="scroll23">

{
    allcomments.map((data,key)=>{
        return(<Commentcard data={data.data()} id={data.id} key={key} allcomments={allcomments}  setallcomments={setallcomments} getnext2comments={getnext2comments} totalcomment ={totalcomment} settotalcomments={settotalcomments} getcommentsize={getcommentsize}/>)
    })
}

{ nocomments()
}
          
          
{deletebutton()}
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

export default Comments