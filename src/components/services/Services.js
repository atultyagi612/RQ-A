import React, { useState , useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storage, db } from '../../firebase';
import {ref, uploadBytes} from "firebase/storage"
import { addDoc, collection} from 'firebase/firestore';
import VideoRecorder from 'react-video-recorder'
import './services.css'
import { UseUserAuth } from '../../context/UserAuthContext'
import Submitmodal from '../Uploadvideo/Submitmodal';
import { toast, Toaster } from "react-hot-toast";
import Loader from '../Loader';

const Services = () => {
  const { user} = UseUserAuth();
  const [video,savevideo]=useState(null);
  const [location,storelocationArray]=useState([]);
  const [startlocation , addstartlocation] = useState(null);
  const  usercollectionref=collection(db,"user");
  const  needdetection=collection(db,"needdetection");
  const [message , setmessage]=useState('')
  const [address,setaddress]=useState({})
  const [geolocation,setgeolocation]=useState()
  const [loaded, setLoaded] = useState(false);

 
  useEffect(()=>{
    document.getElementById('recordvideotxt').innerText='/Record Video'
  },[])


  const save_video=(video)=>{
    console.log(video)
    const file = new File([video], `${uuidv4()}.webm`);
    savevideo(file)
  }


  const Submit = ()=>{
    setLoaded(true)
      const imageref=ref(storage,video.name)
          uploadBytes(imageref,video).then( async(outtt)=>{
            const videourl=`https://firebasestorage.googleapis.com/v0/b/temp-fbe64.appspot.com/o/${outtt.metadata.fullPath}?alt=media&token=231ce46b-d69e-4919-9e19-18bff44cc50a`

            await addDoc(usercollectionref,{name:user.displayName , email:user.email , photourl:user.photoURL , videourl: videourl,
              address:address ,message:message,isvideo:true,date:Date.now(),isgeocord:true, Geolocation:location , location:geolocation })
              .then((refff)=>{
                addDoc(needdetection,{docid:refff.id,isvideo:true , islive:true,fileurl:videourl}).then(()=>{
                  setLoaded(false)
                  toast.success('Done uploading')
                }).catch(err => {setLoaded(false),toast.error(err.message)})
              })
              
              
          })
      
    
  }


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(Date.now())
        storelocationArray(current => [...current, {date:Date.now(), lat:latitude , lng:longitude}]);
      });
    } else {
      storelocationArray(current => [...current, 'no location'])
    }
  }

  return (
    <>
<Loader loader={loaded}/>
<Toaster toastOptions={{ duration: 3000 }} />



<div className='mt-3' id="recordvideo" style={{ height: "90vh", width: "85%",margin: "auto",padding: "30px", backgroundColor:"white"  ,   border: "var(--mdb-border-width) var(--mdb-border-style) var(--mdb-border-color)",
    borderRadius: "4px"}}>
      <div className="title">Record Video</div>
      <div id='cameradiv' style={{height:"85%"}}>
<VideoRecorder
  onStartRecording={()=>{
    console.log("recording started")
    storelocationArray([])
    addstartlocation(setInterval(getLocation, 1000));
  }}
  onStopRecording={()=>{
    console.log("recording stoped")
    clearInterval(startlocation)
    console.log(location)
  }}
    onRecordingComplete={(videoBlob) => {
      document.getElementById('uploadbutton').style.visibility="visible"
      save_video(videoBlob)
    }}/>
    </div>
<button type="button" id='uploadbutton' className="btn btn-block btn-primary" style={{visibility:"hidden"}} data-mdb-toggle="modal" data-mdb-target="#exampleModal">DONE</button>

</div>
    




	
<Submitmodal address={address}  setaddress={setaddress} setgeolocation={setgeolocation} setmessage={setmessage}  message={message} Submit={Submit}/>



  
    
 
    </>
  )
}

export default Services

