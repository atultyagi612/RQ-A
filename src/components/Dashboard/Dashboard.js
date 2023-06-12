import React,{useState ,useEffect} from 'react'
import { UseUserAuth } from '../../context/UserAuthContext'
import { toast, Toaster } from "react-hot-toast";
import {db} from "../../firebase"
import {collection,getDocs,query, orderBy ,doc,where,deleteDoc } from 'firebase/firestore';
import Card from './Card'
import EditCard from './EditCard';
import Viewlocationmodal from './Viewlocationmodal'
import Video from "yet-another-react-lightbox/plugins/video";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { MDBInput} from 'mdb-react-ui-kit';
import { MDBTooltip } from 'mdb-react-ui-kit';
const Dashboard = () => {
  const [data , setdata] =useState([])
  const [deleteverification,setdeleteverification]=useState()
  const [currdeleteid , setcurrdeleteid] = useState(null);
  const [updateid , setupdateid] = useState(null);
  const [markerlocation,setmarkerlocation]=useState({ lat: -24.9923319, lng: 115.2252427 })
  const { user} = UseUserAuth();
  var modalincrement=59
  const  usercollectionref=collection(db,"user");
  const [slides,setslide]=useState([])
  const [openn, setOpen] = useState(false);
  const[ openvideo,setOpenvideo]=useState(false)
  
  const [emptyreport,setemptyreport]=useState()
 

  useEffect(() => {
    fetchBlogs();
    document.getElementById('recordvideotxt').innerText=''
  }, [])
  useEffect(()=>{
    if(user.email===deleteverification){
      document.getElementById('deltebuttonconfirmid').disabled=false
    }
    else{
      document.getElementById('deltebuttonconfirmid').disabled=true
    }
  },[deleteverification])
  const fetchBlogs=async()=>{
    setdata([])
    var videopath=[]
    const querySnapshot = await getDocs(query(usercollectionref, where('email',"==",user.email), orderBy('date', "desc") ))

    querySnapshot.forEach((item) => {
      if(item.data().isgeocord){
        item.data().Geolocation.forEach((loca)=>{
          videopath.push({lat:loca.latitude , lng:loca.longitude})
        })
      }
      setdata(prevState => [...prevState, item])

}
)

if (querySnapshot.docs.length===0){
  setemptyreport(<div style={{    display: "inline-block", 
  left: "50%",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",    position: "absolute"}}><div class="type">NO REPORT UPLOADED BY YOU</div></div>)
}
}

const createmap=(lat,long)=>{
  setmarkerlocation({lat:lat , lng:long})
}

const deletedocpromp=(id)=>{
  setcurrdeleteid(id)
  document.getElementById('deltemodalbuttonid').click()
}
const deletedocument=()=>{
console.log('delete')
  const reffff=doc(db, 'user', currdeleteid)
  deleteDoc(reffff).then((idd)=>{
    toast.success('deleted succesfully')
    setdata(data.filter(item => item.id !== currdeleteid))
  }).catch((error)=>{
    toast.error(error.message)
  })
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
    
    console.log("done")
    var files=[]
    data.outimages.map((i)=>{
      files.push({src:i})
    })
    setslide(files)
    setOpen(true)
    console.log(files)
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
  return (
    <>
    <Toaster toastOptions={{ duration: 5000 }} />
<Viewlocationmodal markerlocation={markerlocation}/>


    <div className="container pt-3">
    <div style={{display:"flex"}}>
    <h5 style={{color:'black'   ,  flex: "0 1 100%"}} >DASHBOARD</h5>
    <MDBTooltip tooltipTag='span'  tag='span'title="Refresh">
    <a style={{color: "var(--darkblue)"}} href="#!" role="button" onClick={fetchBlogs}> 
  <i className="fas fa-redo"></i>
</a>
      </MDBTooltip>
                
  </div>
  
  </div>
  <hr className="my-1"></hr>
    <div>
<section style={{backgroundColor: "#eee"}}>



  <div className="container py-5">
{/* {div} */}
    
{data.map(item=>{
  
  modalincrement+=1
  return (<Card id={item.id}   setslides={setslides}   data={item.data()} key={item.id}  modalincrement={modalincrement}   setmaplocation={setmarkerlocation}  deletedoc={deletedocpromp} update={setupdateid} reload={fetchBlogs}/>)
})}




    {/* delete modal  */}
    <button type="button" id="deltemodalbuttonid" data-mdb-toggle="modal" data-mdb-target="#deletemodaliddd" style={{display :"none"}}>
</button>
<button type="button" id="videopathmodalbuttonid" data-mdb-toggle="modal" data-mdb-target="#videopathmodaliddd" style={{display :"none"}}></button>
{/* delete item modal  */}
<div className="modal top fade" tabIndex="-1" id='deletemodaliddd' aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">CONFIRM DELETE</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Confirm Your Email ID ..</p>
        <div className="form-outline">
  <MDBInput label="Email ID" type="text" className="form-control" id='docdeleteverification' value={deleteverification?deleteverification:""} onChange={(e)=>{setdeleteverification(e.target.value)}} />
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">CANCEL</button>
        <button type="button" className="btn btn btn-danger" id='deltebuttonconfirmid' data-mdb-dismiss="modal"  onClick={()=>{deletedocument()}}>DELETE</button>
      </div>
    </div>
  </div>
</div>


{/* show video path modal  */}
<div className="modal" tabIndex="-1" id='videopathmodaliddd'>
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal location</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <section>
        {/* <div id='map_canvas' style={{position:"relative"}}>{mappp}</div> */}
        <div id="map_canvas_location"></div>
    </section>
       
      </div>
    </div>
  </div>
</div>
    


  </div>
</section>
</div>
<EditCard updateid={updateid} updatecard={fetchBlogs} />
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
{emptyreport}
    </>
  )
}

export default Dashboard