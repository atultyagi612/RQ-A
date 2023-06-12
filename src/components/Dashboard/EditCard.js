import GoogleMapComponent from '../Uploadvideo/Googlemap';
import React,{useState,useEffect} from 'react'
import {doc,updateDoc} from 'firebase/firestore';
import {db} from "../../firebase"
import { MDBInput ,MDBTextArea} from 'mdb-react-ui-kit';
import { toast, Toaster } from "react-hot-toast";
const EditCard = (props) => {
    const [userid,setuserid]=useState()
    const [message , setmessage]=useState()  
    const [state_district , setstate_district]=useState();
    const [state,setstate] = useState();
    const [county , setcounty]=useState();
    const [country , setcountry] = useState();
    const [postcode , setpostcode] = useState();
    const [village , setvillage] = useState();
    const [OverAllAddress , setOverAllAddress] = useState();
    const [additionalInformation , setadditionalInformation] = useState();
    const [markers, setMarkers] = useState([])
    const [proxymarker,setproxymarker]=useState([])
    const [map,setmap]=useState()
    useEffect(()=>{
        if(props.updateid!==null){
            setuserid(props.updateid.id)
            setmessage(props.updateid.data.message)
            setstate_district(props.updateid.data.address.state_district)
            setstate(props.updateid.data.address.state)
            setcounty(props.updateid.data.address.county)
            setcountry(props.updateid.data.address.country)
            setpostcode(props.updateid.data.address.postcode)
            setvillage(props.updateid.data.address.village)
            setOverAllAddress(props.updateid.data.address.OverAllAddress)
            setMarkers([
                { lat: props.updateid.data.location.lat, lng: props.updateid.data.location.lng },
            ]);
            setproxymarker([
              { lat: props.updateid.data.location.lat, lng: props.updateid.data.location.lng },
          ])
        }
    },[props.updateid])
useEffect(()=>{
  if(markers.length===1){
  setmap(<GoogleMapComponent markers={markers} setMarkers={setMarkers} />)}
},[markers])

useEffect(()=>{
  if (document.getElementById('messageid').value!==''){
    document.getElementById('messageid').classList.add('active')
  }
},[message])


const showalert=(alertmessage)=>{
  toast.error(alertmessage)
}
const submitbutton=()=>{
  if(OverAllAddress===null){showalert('Overall address is missing is empty')}
  else if(country===null){showalert('Country  is empty')}
  else if(county===null){showalert('County is empty')}
  else if(postcode===null){showalert('postcode is empty')}
  else if(state===null){showalert('state is empty')}
  else if(state_district===null){showalert('Distict is empty')}
  else if (message.trim().length===0){
    showalert("emty message")
  }
  else{
    uploaddata()
    document.getElementById('removeupdatemodal').click()
  }
}

    const  uploaddata =async()=>{
      toast.loading((t) => (<span>Udating ...<button style={{display:"none"}} id='loadingtoaster' onClick={() => toast.dismiss(t.id)} ></button></span>), {duration: 100000});
      
                const address={
                  village:village ? village : null,
                  state:state ? state : null,
                  state_district: state_district ? state_district :null,
                  country:country ? country :null,
                  county:county ? county:null,
                  postcode:postcode ?postcode :null,
                  OverAllAddress:OverAllAddress ? OverAllAddress:null,
                  additionalInformation:additionalInformation ? additionalInformation :null
                }
                const geolocation={lat:markers[0].lat , lng:markers[0].lng}
                
                   const docreff=doc(db,"user",userid)
                   await updateDoc(docreff,{
                    updated:Date.now() , address:address ,message:message? message:null  , location:geolocation
                   }).then(()=>{
                    props.updatecard()
                    document.getElementById('loadingtoaster').click()
                    toast.success("Updated successfully")
                  })
      }
      
    
    
    
    
        
        
        
        const setactive=()=>{
          let typeTextoverall =document.getElementById('typeTextoverall')
           let typeTextcounty  =document.getElementById('typeTextcounty')
           let typeTextcountry = document.getElementById('typeTextcountry')
           let  typeTextdistic = document.getElementById('typeTextdistict')
           let  typeTextstate  = document.getElementById('typeTextstate')
           let  typeTextpostcode = document.getElementById('typeTextpostcode')
           let typeTextvillage = document.getElementById('typeTextvillage')
           let typemessage = document.getElementById('messageid')
      
           if (typeTextvillage.value!==''){
            typeTextvillage.classList.add('active')
          }
          if (typeTextoverall.value!==''){
            typeTextoverall.classList.add('active')
          }
          if (typeTextcounty.value!==''){
            typeTextcounty.classList.add('active')
          }
          if (typeTextcountry.value!==''){
            typeTextcountry.classList.add('active')
          }
          if (typeTextdistic.value!==''){
            typeTextdistic.classList.add('active')
          }
          if (typeTextstate.value!==''){
            typeTextstate.classList.add('active')
          }
          if (typeTextpostcode.value!==''){
            typeTextpostcode.classList.add('active')
          }
          if (typemessage.value!==''){
            typemessage.classList.add('active')
          }
          
        }
        async function autoaddress(){
          if (proxymarker[0].lat!==markers[0].lat){
            console.log("location changed")
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${markers[0].lat}&lon=${markers[0].lng}&zoom=18&addressdetails=1`);
            var data = await response.json();
            setvillage(data.address.village)
            setstate(data.address.state)
            setstate_district(data.address.state_district)
            setcountry(data.address.country)
            setpostcode(data.address.postcode)

            setcounty(data.address.county)
            setOverAllAddress(data.display_name)
            setactive()
          }
          }
    
  return (
    <>
    <Toaster toastOptions={{ duration: 5000 }} />
    <button type="button" id='updatemodalbuttonid' style={{display:"none"}} data-mdb-toggle="modal" data-mdb-target="#exampleModalupload" >
                </button>
    
{/* <!-- main Modal --> */}
<div className="modal fade " id="exampleModalupload" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Report</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="d-grid gap-2 d-md-block mb-4">

        <button className="btn btn-primary   me-3"   data-mdb-target="#exampleModalToggle22" data-mdb-toggle="modal" data-mdb-dismiss="modal" title="Tooltip on top">
   
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/>
</svg>  Location
          </button>
        
        
        <button className="btn btn-primary "  data-mdb-target="#exampleModalToggle23" onClick={()=>{setactive()}} data-mdb-toggle="modal" data-mdb-dismiss="modal">
Address
          </button>
          </div>

        
        
          
          



<div className="form-outline mb-4">
            <MDBTextArea label='Message' className="form-control" value={message || ""} onChange={(e)=>{setmessage(e.target.value)}} id="messageid" rows="4"></MDBTextArea>
          </div>
      
        
        
       </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
        <button style={{display:"none"}} id="removeupdatemodal" data-mdb-dismiss="modal"></button>
        <button type="button" className="btn btn-primary"  onClick={submitbutton}  >Update</button>
      </div>
    </div>
  </div>
</div>




{/* <!-- map modal dialog --> */}
<div className="modal fade" id="exampleModalToggle22" aria-hidden="true" aria-labelledby="exampleModalToggleLabel22" tabIndex="-1">
  <div className="modal-dialog modal-xl modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalToggleLabel22">Choose  Location</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal"
                data-mdb-toggle="modal" data-mdb-target="#exampleModalupload"
                onClick={autoaddress}
                aria-label="Close"></button>
      </div>
      <div className="modal-body" style={{padding:"0px"}}>

      

     <section>
        <div id='map_canvas' style={{position:"relative"}}>
        {map}
          </div>
         
    </section>
        
      </div>
    </div>
  </div>
</div>
      





{/* <!-- Address modal dialog --> */}
<div className="modal fade" id="exampleModalToggle23" aria-hidden="true" aria-labelledby="exampleModalToggleLabel23" tabIndex="-1">
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalToggleLabel22">Address</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal"
                data-mdb-toggle="modal" data-mdb-target="#exampleModalupload"
                
                aria-label="Close"></button>
      </div>
      <div className="modal-body">
        

      <div className="form-outline mb-3">
  <MDBInput label="Full Address" type="text" id="typeTextoverall"value={OverAllAddress || ""} onChange={(e)=>{setOverAllAddress(e.target.value)}}className="form-control" />
</div>
        


<div className="form-outline mb-3">
  <MDBInput label="Country"type="text" id="typeTextcountry" value={country || ""} onChange={(e)=>{setcountry(e.target.value)}}className="form-control" />
</div>

<div className="form-outline mb-3">
  <MDBInput label="Distict"type="text" id="typeTextdistict"value={state_district || ""} onChange={(e)=>{setstate_district(e.target.value)}} className="form-control" />

</div>

<div className="row mb-4">
            <div className="col">
            <div className="form-outline mb-3">
  <MDBInput label="Village"type="text" id="typeTextvillage"value={village || ""}  onChange={(e)=>{setvillage(e.target.value)}}className="form-control" />

  <div className="form-helper">Let it empty if not available</div>
</div>


            </div>
            <div className="col">
            <div className="form-outline mb-3">
  <MDBInput label="County"type="text" id="typeTextcounty"value={county || ""}  onChange={(e)=>{setcounty(e.target.value)}}className="form-control" />

</div>
            </div>
          </div>

<div className="form-outline mb-3">
  <MDBInput label="State"type="text" id="typeTextstate"value={state || ""}  onChange={(e)=>{setstate(e.target.value)}}className="form-control" />

</div>
        
<div className="form-outline mb-3">
  <MDBInput label="PostCode"type="text" id="typeTextpostcode"value={postcode || ""} onChange={(e)=>{setpostcode(e.target.value)}} className="form-control" />

</div>



          <div className="form-outline mb-4">
            <MDBTextArea label='Additional information' className="form-control" value={additionalInformation || ""} onChange={(e)=>{setadditionalInformation(e.target.value)}} id="form7Example7" rows="4"></MDBTextArea>
          </div>

      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default EditCard