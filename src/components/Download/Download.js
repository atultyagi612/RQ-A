import React , {useEffect,useState} from 'react'
import {collection,getDoc,doc} from 'firebase/firestore';
import {useLocation} from "react-router-dom";
import {db} from "../../firebase"
import Image from './Image';
import Video from './Video'
function Download() {
    const { search } = useLocation();
    const [id,setid]=useState()
    const [data,setdata]=useState()
    const [webpage,setwebpage]=useState()
    useEffect(()=>{
        const urlParams = Object.fromEntries([...new URLSearchParams(search)]);
        setid(urlParams['id']);
        fetchBlogs(urlParams['id'])
      },[])

      const fetchBlogs=async(id)=>{
        const docRef = doc(db, "user", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data=docSnap.data()
          setdata(data)
          redirect(data , id)
        } else {
          navigate('/error')
        }
    }

    const redirect=(data ,id)=>{
        console.log(data)
        if(data.isvideo===false){
            setwebpage(<Image data={data} id={id}/>)
        }
        else{
          setwebpage(<Video data={data} id={id}/>)
        }
    }
  return (
    <>
    {webpage}
    {/* <Image/> */}
    </>
  )
}

export default Download