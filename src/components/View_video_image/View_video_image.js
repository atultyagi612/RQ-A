import React , {useEffect,useState} from 'react'
import {useLocation} from "react-router-dom";
import Video from "yet-another-react-lightbox/plugins/video";
import Lightbox from "yet-another-react-lightbox";
import ReactPlayer from 'react-player/lazy';
import {db} from "../../firebase"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import {collection,getDoc,doc} from 'firebase/firestore';

export default function View_video_image() {
    const { search } = useLocation();
    const [data,setdata]=useState()
    const [closewnd,setclosewnd]=useState(true)
    useEffect(()=>{
        const urlParams = Object.fromEntries([...new URLSearchParams(search)]);
        console.log(urlParams)
        fetchBlogs(urlParams['id'])
      },[])

      const fetchBlogs=async(id)=>{
        const docRef = doc(db, "user", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data=docSnap.data()
          if(data.isvideo===true){

            setdata(<Lightbox
                plugins={[Video]}
                open={true}
                slides={[
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
                  ]}
              />)
              setTimeout(() => {
                document.getElementsByClassName('yarl__toolbar')[0].style.display='none'
              }, 100);
          }else{
            var files=[]
    data.outimages.map((i)=>{
      files.push({src:i})
    })
            setdata(<Lightbox
                open={true}
                slides={files}
                plugins={[Thumbnails]}
              />)
              setTimeout(() => {
                document.getElementsByClassName('yarl__toolbar')[0].style.display='none'
              }, 100);
          }
          console.log(data)
        } else {
          navigate('/error')
        }
    }
  return (
    <>
    {data}
    </>
  )
}
