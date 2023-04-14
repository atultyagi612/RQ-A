import React, { useState,useEffect } from 'react';
import GoogleMapComponent from './Googlemap';
import './alert.css'
import { MDBTextArea,MDBInput } from 'mdb-react-ui-kit';
import { toast, Toaster } from "react-hot-toast";
const Submitmodal = (props) => {
  var lat;
  var lng;
  const [state_district , setstate_district]=useState();
  const [state,setstate] = useState();
  const [county , setcounty]=useState();
  const [country , setcountry] = useState();
  const [postcode , setpostcode] = useState(131101);
  const [village , setvillage] = useState();
  const [OverAllAddress , setOverAllAddress] = useState();
  const [additionalInformation , setadditionalInformation] = useState();
  const [markers, setMarkers] = useState([{ lat: 22, lng: 77 }])
  const [isfirstsubmit , setisfirstsubmit]=useState(true)
  const [changelat , setchangelat]=useState()
  const setactive=()=>{
    let typeTextoverall =document.getElementById('typeTextoverall')
     let typeTextcounty  =document.getElementById('typeTextcounty')
     let typeTextcountry = document.getElementById('typeTextcountry')
     let  typeTextdistic = document.getElementById('typeTextdistict')
     let  typeTextstate  = document.getElementById('typeTextstate')
     let  typeTextpostcode = document.getElementById('typeTextpostcode')
     let typeTextvillage = document.getElementById('typeTextvillage')

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
    
  }
// useEffect(()=>{
// console.log("first click")
//   autoaddress()
// },[isfirstsubmit])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=> {
      const p=position.coords;
      setMarkers([{lat:p.latitude , lng:p.longitude}])
    }  ,  (error)=>{setMarkers([{ lat: 21.561, lng: 78.281 }]) ; alert ("Location error : Default location used")})
    
  }
  
  ,[])

  async function autoaddress(){
    try {
    if (changelat!==markers[0].lat){
        setchangelat(markers[0].lat)
      lat=markers[0].lat
      lng=markers[0].lng
      props.setgeolocation({lat:lat , lng:lng})
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      var data = await response.json();
      console.log(data)
      setvillage(data.address.village)
      setstate(data.address.state)
      setstate_district(data.address.state_district)
      setcountry(data.address.country)
      setpostcode(data.address.postcode)
      setcounty(data.address.county)
      setOverAllAddress(data.display_name)
      setTimeout(function() { setactive(); }, 1000);
    }
  } catch (error) {
  }
    }

    const setaddress=()=>{
        props.setaddress({
            village:village ? village : null,
                    state:state ? state : null,
                    state_district: state_district ? state_district :null,
                    country:country ? country :null,
                    county:county ? county:null,
                    postcode:postcode ?postcode :null,
                    OverAllAddress:OverAllAddress ? OverAllAddress:null,
                    additionalInformation:additionalInformation ? additionalInformation :null
          })
    }

    const showalert=(alertmessage)=>{
      toast.error(alertmessage)
      // document.getElementById('colapsealert').classList.remove('collapsetrue')
      // document.getElementById('collapsealerttext').innerHTML=`<span className="font-medium">Danger alert!</span>  ${alertmessage}.`
      // setTimeout(()=>{document.getElementById('colapsealert').classList.add('collapsetrue')}, 5000);
    }
    const submitbutton=()=>{
      console.log(props.address)
      if(Object.keys(props.address).length===0){showalert('address is empty')}
      else if(props.address.OverAllAddress===null){showalert('Overall address is missing is empty')}
      else if(props.address.country===null){showalert('Country  is empty')}
      else if(props.address.county===null){showalert('County is empty')}
      else if(props.address.postcode===null){showalert('postcode is empty')}
      else if(props.address.state===null){showalert('state is empty')}
      else if(props.address.state_district===null){showalert('Distict is empty')}
      else if (props.message.trim().length===0){
        showalert("emty message")
      }
      else{
        document.getElementById('dismissubmitmodal').click()
      }

      // props.Submit
    }

  return (
    <>
    <Toaster toastOptions={{ duration: 5000 }} />
    <button type="button" id='uploadbutton' className="btn btn-block btn-primary" onClick={()=>{setisfirstsubmit(false)}} style={{visibility:"hidden" , display:"none"}}  data-mdb-toggle="modal" data-mdb-target="#exampleModal">DONE</button>

{/* <!-- main Modal --> */}
<div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Upload Video</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

{/* alert  */}
      <div id="alert98">
  <div id='colapsealert' className="collapsetrue collapse flex mb-4 text-sm text-red-800  border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
  <span className="sr-only">Info</span>
  <div id='collapsealerttext'>
    <span className="font-medium">Danger alert!</span>Change a few things up and try submitting again.
  </div>
</div>
  </div>
  {/* alert end  */}
  
  


      <div className="d-grid gap-2 d-md-block mb-4">

        <button className="btn btn-primary   me-3"  data-mdb-target="#exampleModalToggle22" data-mdb-toggle="modal" data-mdb-dismiss="modal" title="Tooltip on top">
   
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/>
</svg>  Location
          </button>
        
        
        <button className="btn btn-primary "  data-mdb-target="#exampleModalToggle23" data-mdb-toggle="modal" data-mdb-dismiss="modal">
Address
          </button>
          </div>

        
        
          
          



<div className="form-outline mb-4">
<MDBTextArea label='Message' className="form-control" value={props.message || ""} onChange={(e)=>{props.setmessage(e.target.value)}} id="form7Examp" rows="4" />
            
          </div>
      
        
        
       </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary"  onClick={submitbutton}>Save changes</button>
        <button type="button" id='dismissubmitmodal'  data-mdb-dismiss="modal" style={{display:"none"}} onClick={props.Submit}></button>
      </div>
    </div>
  </div>
</div>




{/* <!-- map modal dialog --> */}
<div className="modal fade" id="exampleModalToggle22" aria-hidden="true" aria-labelledby="exampleModalToggleLabel22" data-mdb-backdrop="false" tabIndex="-1">
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalToggleLabel22">Choose the Location</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" onClick={autoaddress}
                data-mdb-toggle="modal" data-mdb-target="#exampleModal"
                
                aria-label="Close"></button>
      </div>
      <div className="modal-body">

     <section>
        <div id='map_canvas' style={{position:"relative"}}><GoogleMapComponent markers={markers} setMarkers={setMarkers} /></div>
        <div id="map_canvas_location"></div>
    </section>
        
      </div>
    </div>
  </div>
</div>
      





{/* <!-- Address modal dialog --> */}
<div className="modal fade" id="exampleModalToggle23" aria-hidden="true" aria-labelledby="exampleModalToggleLabel23" tabIndex="-1" data-mdb-backdrop="static">
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalToggleLabel22">Address</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" onClick={setaddress}
                data-mdb-toggle="modal" data-mdb-target="#exampleModal"
                
                aria-label="Close"></button>
      </div>
      <div className="modal-body">
        

      <div className="form-outline mb-3">
      <MDBInput label='Full Address'type="text" id="typeTextoverall"value={OverAllAddress || ""} onChange={(e)=>{setOverAllAddress(e.target.value)}}className="form-control"  />
</div>
        


<div className="form-outline mb-3">
<MDBInput label='Country' type="text" id="typeTextcountry" value={country || ""} onChange={(e)=>{setcountry(e.target.value)}}className="form-control"  />
  
</div>

<div className="form-outline mb-3">
  <MDBInput label="Distict" type="text" id="typeTextdistict"value={state_district || ""} onChange={(e)=>{setstate_district(e.target.value)}} className="form-control" />
</div>

<div className="row mb-4">
            <div className="col">
            <div className="form-outline mb-3">
  <MDBInput label="Village" type="text" id="typeTextvillage"value={village || ""}  onChange={(e)=>{setvillage(e.target.value)}}className="form-control" />
  <div className="form-helper">Let it empty if not available</div>
</div>


            </div>
            <div className="col">
            <div className="form-outline mb-3">
  <MDBInput label="County" type="text" id="typeTextcounty"value={county || ""}  onChange={(e)=>{setcounty(e.target.value)}}className="form-control" />
</div>
            </div>
          </div>

<div className="form-outline mb-3">
  <MDBInput label="State" type="text" id="typeTextstate"value={state || ""}  onChange={(e)=>{setstate(e.target.value)}}className="form-control" />
</div>
        
<div className="form-outline mb-3">
  <MDBInput label="PostCode" type="text" id="typeTextpostcode"value={postcode || ""} onChange={(e)=>{setpostcode(e.target.value)}} className="form-control" />
</div>



          <div className="form-outline mb-4">
          <MDBTextArea label='Additional information' className="form-control" value={additionalInformation || ""} onChange={(e)=>{setadditionalInformation(e.target.value)}} id="form7Example7" rows="4" />
           
          </div>
      </div>
    </div>
  </div>
</div>












{/* play video modal  */}

<button type="button"  data-mdb-toggle="modal" style={{display:"none"}} id='Modalplayvideo' data-mdb-target="#exampleModalplayvideo">
  Launch demo modal
</button>

<div className="modal top fade" id="exampleModalplayvideo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog modal-lg  modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="ratio ratio-16x9">
  <iframe id='embedvideoplay'
    title="video"
    allowFullScreen
  ></iframe>
</div>
      </div>
      
    </div>
  </div>
</div>

    </>
  )
}

export default Submitmodal