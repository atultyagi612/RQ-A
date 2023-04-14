import React,{useState,useEffect} from 'react'
import {storage} from "../../firebase"
import {ref,uploadBytesResumable} from "firebase/storage"
import {v4} from "uuid"
import { addDoc, collection} from 'firebase/firestore';
import {db} from "../../firebase"
import "./pictorial.css"
import "./services.css"
import FileUpload from '../FileUpload/FileUpload';
import FileList from '../FileList/FileList';
import { UseUserAuth } from '../../context/UserAuthContext'
import Submitmodal from '../Uploadvideo/Submitmodal';
import { toast, Toaster } from "react-hot-toast";
import Loader from '../Loader';

const Pictorial = () => {

  const { user} = UseUserAuth();

  const [files, setFiles] = useState([])
  const  usercollectionref=collection(db,"user");
  const  needdetection=collection(db,"needdetection");
  const [message , setmessage]=useState('')
  const [address,setaddress]=useState({})
  const [geolocation,setgeolocation]=useState()
  const [loaded, setLoaded] = useState(false);



  

  useEffect(()=>{
    if (files.length>0){
      document.getElementsByClassName('uploadbutton23')[0].style.visibility='Visible'
      document.getElementsByClassName('no.of.files')[0].textContent=files.length
    }
    else{
      document.getElementsByClassName('uploadbutton23')[0].style.visibility='hidden'
      document.getElementsByClassName('no.of.files')[0].textContent=files.length
    }
  },[files])

  useEffect(()=>{
    document.getElementById('recordvideotxt').innerText='/Upload Images'
  },[])

  const  uploaddata =()=>{
    var folderpath=`images/`
    var fileurl=[]
    setLoaded(true)
    
    const promises = []
        files.map((file) => {
          var filenam=file.name+v4()
            // console.log('loop');
            const sotrageRef=ref(storage,`${folderpath}${filenam}`)
            const uploadTask = uploadBytesResumable(sotrageRef, file);
            promises.push(uploadTask)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 90
                    );
                    
                    document.getElementsByClassName('fileuploadprogress')[0].style.width=`${prog}%`
                    // removeFile(file.name)
                },
                (error) => console.log(error),
                async () => {
                  fileurl.push(`https://firebasestorage.googleapis.com/v0/b/temp-fbe64.appspot.com/o/images%2F${filenam}?alt=media&token=6a686b83-3756-4ecf-af91-33f502b65a32`)
                    // await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                    //   fileurl.push(downloadURLs)
                    // });
                }
            );
            
        })
        Promise.all(promises)
            .then( async() => {
            
            const docRef = await addDoc(usercollectionref,{name:user.displayName , email:user.email , photourl:user.photoURL , 
               date:Date.now(),fileurl:fileurl  ,isvideo:false,isgeocord:false, address:address ,message:message? message:null  , location:geolocation});
               
              addDoc(needdetection,{docid:docRef.id,fileurl:fileurl,isvideo:false , islive:false}).then(()=>{
                setLoaded(false)
                toast.success('All images uploaded Successfully!')
                setFiles([])
                document.getElementsByClassName('fileuploadprogress')[0].style.width=`100%`
              })
              
          }
            )
            .catch(err => {setLoaded(false),toast.error(err.message)})

  }
  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }

  return (
    <>
<Loader loader={loaded}/>
<Toaster toastOptions={{ duration: 3000 }} />
<div className='fileuploaddiv'>
<div className="Appupload mt-3" style={{backgroundColor:"white"  ,height:"100%",   padding: "30px", borderRadius: "4px"}} >
      <div className="title">Upload file</div>

      <div className="progress" style={{marginBottom: "-4px"}}>
  <div className="progress-bar bg-success fileuploadprogress" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div>

      
      <FileUpload files={files} setFiles={setFiles} removeFile={removeFile} />
      <FileList files={files} removeFile={removeFile} />
    </div>
    </div>



    <Submitmodal address={address}  setaddress={setaddress} setgeolocation={setgeolocation} setmessage={setmessage}  message={message} Submit={uploaddata}/>
    </>
  )
}

export default Pictorial