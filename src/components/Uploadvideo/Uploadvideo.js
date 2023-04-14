import React, { useState,useEffect} from 'react';
import { storage, db } from '../../firebase';
import {ref, uploadBytes} from "firebase/storage"

import { addDoc, collection} from 'firebase/firestore';
import { UseUserAuth } from '../../context/UserAuthContext'
import Submitmodal from './Submitmodal';
import { toast, Toaster } from "react-hot-toast";
import Loader from '../Loader';
const Uploadvideo = () => {
  const { user} = UseUserAuth();
  const [video,savevideo]=useState(null);
  const [message , setmessage]=useState('')
  const [address,setaddress]=useState({})
  const [geolocation,setgeolocation]=useState()
  const  usercollectionref=collection(db,"user");
  const  needdetection=collection(db,"needdetection");
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    document.getElementById('recordvideotxt').innerText='/Upload Video'
  },[])

    const setfilevideo =(video)=>{
        savevideo(video[0])
        if (video[0]!==undefined){
          var media = URL.createObjectURL(video[0]);
        document.getElementById('videoname').innerText = ` Video file name :  ${video[0].name}`
        document.getElementById('alert-1').style.display=''
        document.getElementById('uploadbutton').style.visibility="visible"
        document.getElementById('uploadvideosubmitbutton').style.display='block'
        document.getElementById('embedvideoplay').src=media
        }
        
    }

     
    const Submit = ()=>{
      setLoaded(true)
      const meb=`<span class="spinner-border spinner-border-sm" style="border:var(--mdb-spinner-border-width) solid ; border-right-color: transparent" role="status" aria-hidden="true"></span> Loading`
      document.getElementById('uploadvideosubmitbutton').innerHTML=meb
      document.getElementById('uploadvideosubmitbutton').disabled=true
      try{
          const imageref=ref(storage,video.name)
              uploadBytes(imageref,video).then(async(videooutput)=>{
                const videourl=`https://firebasestorage.googleapis.com/v0/b/temp-fbe64.appspot.com/o/${videooutput.metadata.fullPath}?alt=media&token=231ce46b-d69e-4919-9e19-18bff44cc50a`
    
                await addDoc(usercollectionref,{name:user.displayName , email:user.email , photourl:user.photoURL , videourl: videourl,
                  address:address ,message:message,isvideo:true,isgeocord:false,date:Date.now(), location:geolocation }).then((refff)=>{
                    console.log(refff)
                    addDoc(needdetection,{docid:refff.id,isvideo:true , islive:false,fileurl:videourl}).then(()=>{
                      setLoaded(false)
                    toast.success("uploaded succefully")
                    document.getElementById('uploadvideosubmitbutton').innerHTML="Done"
                    document.getElementById('uploadvideosubmitbutton').disabled=false
                  })
              })
      })
      }
      catch(e){
        setLoaded(false)
        toast.error(e.message)
      }
    }
  return (
    <>
    <Loader loader={loaded}/>
    <Toaster toastOptions={{ duration: 3000 }} />
    <div id='onlycss' className='mt-3' style={{backgroundColor:"white",padding: "30px",    width: "85%",margin: "auto",borderRadius: "4px", border: "var(--mdb-border-width) var(--mdb-border-style) var(--mdb-border-color)"}}>
    <div className="title" style={{marginBottom: "1em"}}>Upload Video</div>
<div className="flex items-center justify-center w-full" style={{    flexFlow: "column"}}>
<div id="alert-1" style={{width: "100%",display:"none"}} className="marginzero flex p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
   <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
</svg>
  <span className="sr-only">Info</span>
  <div id='videoname' className="ml-3 text-sm font-medium">
    video link
    
  </div>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a id='playvideoinnewtab' className='font-semibold underline hover:no-underline' href="#!" onClick={()=>{document.getElementById('Modalplayvideo').click()}}>View this video.</a> 
</div>
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
            <p className="fst-italic text-xs text-gray-500 dark:text-gray-400">Supported files</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">MP4, WebM, WAV, MOV</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept="video/mp4,video/x-m4v,video/*" onChange={(e)=>{setfilevideo(e.target.files)}} />
    </label>
    <button type="button" id='uploadvideosubmitbutton' style={{display:"none"}} className="btn btn-primary uploadbutton23"  onClick={()=>{document.getElementById('uploadbutton').click()}}>
                Upload
                </button>
</div> 

</div>


<Submitmodal address={address}  setaddress={setaddress} setgeolocation={setgeolocation} setmessage={setmessage}  message={message} Submit={Submit}/>
    </>
  )
}

export default Uploadvideo