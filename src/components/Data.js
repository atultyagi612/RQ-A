import React,{useState} from "react";


export default function Data() {
    const [verifieduser,setverifieduser]=useState([])
    const [nonverifieduser,setnonverifieduser]=useState([])
    return {verifieduser,setverifieduser,nonverifieduser,setnonverifieduser}
}
