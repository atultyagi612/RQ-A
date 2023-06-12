import React,{useState ,useEffect} from 'react'
import {db} from "../../firebase"
import {collection,getDocs,query, orderBy ,where,limit , startAfter , getCountFromServer } from 'firebase/firestore';
import Commentcard from './Commentcard';
import '../Explore/scroll.css'

const Comments = (props) => {
    const [comment , setcomment]=useState()
    const [allcomments , setallcomments] =useState([])
    const [lastcomment , setlastcomment] = useState()
    const [totalcomment , settotalcomments] = useState()
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
          <div className=' d-flex justify-content-between align-items-center' style={{padding:"10px"}}>
          <h4>Comments</h4>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" ></button>
        </div>
        <hr className="my-0"></hr>
          <div style={{maxHeight:"62vh" , overflow:"scroll"}} id="scroll23">

{
    allcomments.map((data,key)=>{
        return(<Commentcard data={data.data()} key={key} />)
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