import React,{useState,useEffect} from 'react'
import { UseUserAuth } from '../context/UserAuthContext'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import {db} from "../firebase"
import axios from 'axios';
import OtpInput from "otp-input-react";
import { toast, Toaster } from "react-hot-toast";
import {collection,query,where,addDoc,getCountFromServer } from 'firebase/firestore';
const Phoneverification = () => {
    const  phoneref=collection(db,"isphone");
    const [otp, setOtp] = useState("");
    const { user} = UseUserAuth();
    const [ph, setPh] = useState("");
    const [isphoneverify,setphoneverify]=useState()
    const [randomotp,setrandomopt]=useState()
    useEffect(()=>{
        isverify()
    },[])
    const isverify=async()=>{
        const snapshot = await getCountFromServer(query(phoneref, where('user',"==",user.email)))
        if (snapshot.data().count>0){
            setphoneverify(true)
            
        }
        else{
            setphoneverify(false)
            
            setTimeout(() => {
                toast((t) => (
                    <span>
                      Your Phone Number is <b>NOT</b> Verified ...
                      <button type="button" data-mdb-toggle="modal" data-mdb-target="#exampleModalphoneverification" className="btn btn-secondary" onClick={() => toast.dismiss(t.id)}>Verify It</button>
                   
                    </span>
                  ));
            }, 1000);
        }
    }
    const verifyphone=async()=>{
        const phoneno="+"+ph
        const randomotp=Math.floor(100000 + Math.random() * 900000)
        setrandomopt(randomotp)
        const response = await axios.post(
          'https://api.twilio.com/2010-04-01/Accounts/AC2d8209c25be19fde25371fa26546ec0e/Messages.json',
          new URLSearchParams({
            'To': phoneno,
            'MessagingServiceSid': 'MGe0d7ffbba5bca659bccda71d5b800199',
            'Body': 'Your OTP for RQ-A is: '+randomotp
          }),
          {
            auth: {
              username: 'AC2d8209c25be19fde25371fa26546ec0e',
              password: 'f547ab43320e17a713764045f3c1c541'
            }
          }
        );
        if(response.statusText==='Created'){
          toast.success("OTP succesfull send")
          document.getElementById('otpsendbutton').innerText='Send Again..'
          document.getElementById('otpinput').style.display='block'
        }else{
          toast.error(response.statusText)
        }
    }


    function onOTPVerify() {
      if(otp.toString()===randomotp.toString() && isphoneverify===false){
        addDoc(phoneref, {user:user.email , phone:"+"+ph}).then(()=>{
          setphoneverify(true)
          document.getElementById('phoneverificationmmodal').click()
          toast.success('Successfully Authenticated!')
        })
      }
      else{
        toast.error("Wrong OTP!")
      }
      }
  return (
    <>
    <Toaster toastOptions={{ duration: 4000 }} />
<button type="button" className="btn btn-primary" id='phoneverificationmmodal' data-mdb-toggle="modal" data-mdb-target="#exampleModalphoneverification" style={{display:"none"}}>
</button>

<div className="modal top fade" id="exampleModalphoneverification" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog modal-lg  modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel" >Verify Phone</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Enter Your Phone Number ..</p>

<div id='inputphone'>
        <PhoneInput 
        enableLongNumbers={false}
        countryCodeEditable={false}
        country={"in"} value={ph} onChange={setPh} />
        </div>

        <div id="recaptcha-container"></div>
        <button type="button" className="btn btn-success mt-3" id='otpsendbutton' onClick={()=>{verifyphone()}}>Verify Phone No.</button>

        <div id='otpinput' className='mt-2' style={{display:"none"}}>
<p>Enter OTP..</p>
<OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button type="button" className="btn btn-outline-success mt-1" id='verifyphonebutton' data-mdb-ripple-color="dark" onClick={()=>{onOTPVerify()}}>Verify OTP</button>
                
                </div>
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default Phoneverification