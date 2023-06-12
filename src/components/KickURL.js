import React from 'react'
import {db} from "../firebase"
import { toast, Toaster } from "react-hot-toast";
import {getDoc,doc} from 'firebase/firestore';
const KickURL =async(key)=> {
    const docRef = doc(db, "url", "hypLkTbxFG21zm8jZDXp");
    const docSnap = await getDoc(docRef);
    const apiurl=docSnap.data().URL
    
    const response = await fetch(apiurl+"/id/"+key, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
    let responseText = await response.json();
    console.log(responseText)
    if(responseText.rsp_type==='error'){
      toast.error(responseText.rsp_message)
    }
    else if (responseText.rsp_type==='success'){
      toast.success(responseText.rsp_message)
    }
}

export default KickURL