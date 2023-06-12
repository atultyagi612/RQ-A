import React,{useState ,useEffect} from 'react'
import { UseUserAuth } from '../../context/UserAuthContext'
import {db} from "../../firebase"
import {collection,getDocs,query, orderBy ,doc,where,deleteDoc,limit , startAfter , getCountFromServer } from 'firebase/firestore';
import Card from './Card'
import "./explore.css"
import { MDBTooltip } from 'mdb-react-ui-kit';
import Video from "yet-another-react-lightbox/plugins/video";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Viewlocationmodal from '../Dashboard/Viewlocationmodal'
import GoogleMapComponent from '../Uploadvideo/Googlemap';
 

const Explore = () => {
    const [data , setdata] =useState([])
    const [slides,setslide]=useState([])
    const [openn, setOpen] = useState(false);
    const[ openvideo,setOpenvideo]=useState(false)
    const [deleteverification,setdeleteverification]=useState()
    const [currdeleteid , setcurrdeleteid] = useState(null);
    const [updateid , setupdateid] = useState(null);
    const [markerlocation,setmarkerlocation]=useState({ lat: 22, lng: 77 })
    const [tpmarkerlocation,tpsetmarkerlocation]=useState([{ lat: 22, lng: 77 }])
    const [currlocationdata,setcurrlocationdata]=useState()
    const [firstmap,setfirstmap]=useState(true)
    const [currloctype,setclt]=useState()
    const [currlocvalue,setclv]=useState()
    const [advancesurrdata , setadvancecurrdata] = useState()
    const [adcurrloctype,adsetclt]=useState()
    const [adcurrlocvalue,adsetclv]=useState()
    const [totalreport , settotalreport]=useState(0)
    const [querytype , setquerytype]=useState()
    const { user} = UseUserAuth();
    const [currlocationmodalbody , setmodalbody]=useState()
    const [lastreport , setlastreport]=useState()
    const [diffuserdata,setdiffuserdata]=useState({})
    const [currsorttype,setcurrsorttype]=useState('Date, new to old')
    const [viewuserdata , setviewuserdata]=useState({})
    const [isresolvedview , setisresolvedview]=useState([true])
    var modalincrement=59
    const limitreportvalue=3
    const  usercollectionref=collection(db,"user");

    useEffect(() => {
        fetchBlogs();
        totalitems(query(usercollectionref, where('isdone',"==",true) , where('resolvestatus','==',false)));
        document.getElementById('recordvideotxt').innerText=''
      }, [])

      
      const fetchBlogs=async()=>{
        setdata([])
        var videopath=[]
        const querySnapshot = await getDocs(query(usercollectionref, where('isdone',"==",true), where('resolvestatus','==',false), orderBy('date', "desc"), limit(limitreportvalue) ))
    
        querySnapshot.forEach((item) => {
          if(item.data().isgeocord){
            item.data().Geolocation.forEach((loca)=>{
              videopath.push({lat:loca.latitude , lng:loca.longitude})
            })
          }
          setdata(prevState => [...prevState, item])
    }
    )
    setlastreport(querySnapshot.docs[querySnapshot.docs.length-1])
    setquerytype(1)
    }

    const isresolved=()=>{
      if(isresolvedview===true){
        setisresolvedview(!isresolvedview)
        document.getElementById('isresolvedicon').style.display='none'
      }
      else{
        setisresolvedview(!isresolvedview)
        document.getElementById('isresolvedicon').style.display='initial'
      }
    }
    const totalitems=async(qurey)=>{
      const snapshot = await getCountFromServer(qurey)
      settotalreport(snapshot.data().count)
    }

    const loadmorerecords=async()=>{
      if (querytype===1){
        var querytp=query(usercollectionref, orderBy('date', "desc"),where('resolvestatus','==',false),where('isdone',"==",true), limit(limitreportvalue)  ,startAfter(lastreport) )
      }
      else if (querytype===2){
        var querytp=query(usercollectionref,where('resolvestatus','==',false),where("address."+currloctype,"==",currlocvalue),where('isdone',"==",true), limit(limitreportvalue)  ,startAfter(lastreport) )
      }
      else if (querytype===3){
        var querytp=query(usercollectionref,where('resolvestatus','==',false), where('isdone',"==",true), orderBy('date', "desc"), limit(limitreportvalue)  ,startAfter(lastreport) )
      }
      else if (querytype===4){
        var querytp=query(usercollectionref,where('resolvestatus','==',false), where('isdone',"==",true), orderBy('date') , limit(limitreportvalue)  ,startAfter(lastreport))
      }
      else if (querytype===5){
        var querytp=query(usercollectionref,where('resolvestatus','==',false), where('isdone',"==",true), orderBy('ADPF', "desc"), limit(limitreportvalue)  ,startAfter(lastreport) )
      }
      else if (querytype===6){
        var querytp=query(usercollectionref, where('resolvestatus','in',isresolvedview),where("address."+adcurrloctype,"==",adcurrlocvalue) ,  where('isdone',"==",true), orderBy('date', "desc") , orderBy('ADPF', "desc"), limit(limitreportvalue)  ,startAfter(lastreport)  )
      }
      else if (querytype===7){
        var querytp=query(usercollectionref, where('resolvestatus','in',isresolvedview),where("address."+adcurrloctype,"==",adcurrlocvalue) ,  where('isdone',"==",true), orderBy('date', "desc"), limit(limitreportvalue)  ,startAfter(lastreport))
      }
      else if (querytype===8){
        var querytp=query(usercollectionref, where('resolvestatus','in',isresolvedview),where("address."+adcurrloctype,"==",adcurrlocvalue) ,  where('isdone',"==",true), orderBy('date') , orderBy('ADPF', "desc"), limit(limitreportvalue)  ,startAfter(lastreport)  )
      }
      else if (querytype===9){
        var querytp=query(usercollectionref, where('resolvestatus','in',isresolvedview),where("address."+adcurrloctype,"==",adcurrlocvalue) ,  where('isdone',"==",true), orderBy('date') , limit(limitreportvalue)  ,startAfter(lastreport) )
      }
        const querySnapshot = await getDocs(querytp)
        querySnapshot.forEach((item) => {
          setdata(prevState => [...prevState, item])
    }
    )
    setlastreport(querySnapshot.docs[querySnapshot.docs.length-1])
    }
    const deletedocpromp=(id)=>{
        setcurrdeleteid(id)
        document.getElementById('deltemodalbuttonid').click()
      }
      const deletedocument=()=>{
        
        const reffff=doc(db, 'user', currdeleteid)
        deleteDoc(reffff).then((idd)=>{
          alert('deleted succesfully')
          setdata(data.filter(item => item.id !== currdeleteid))
        })
        // you.already.know.my.email.id@gmail.com
      }
      function calcCrow(lat1, lon1, lat2, lon2) 
      {
        var R = 6371; // km
        var dLat = toRad(lat2-lat1);
        var dLon = toRad(lon2-lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);
  
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
      }
  
      
      function toRad(Value) 
      {
          return Value * Math.PI / 180;
      }

      const sortcurrlocation = async()=>{
        setdata([])
        const querySnapshot = await getDocs(query(usercollectionref,where('isdone',"==",true), where('resolvestatus','==',false),where("address."+currloctype,"==",currlocvalue), limit(limitreportvalue)) )
        querySnapshot.forEach((item) => {
          setdata(prevState => [...prevState, item])
    }
    )
    
    setcurrsorttype('Near you')
    setlastreport(querySnapshot.docs[querySnapshot.docs.length-1])
    setquerytype(2)
    totalitems(query(usercollectionref,where('isdone',"==",true),where("address."+currloctype,"==",currlocvalue), where('resolvestatus','==',false) ))
    
      }

      const sortbyselect= async(text)=>{
        document.getElementById('dropdownMenuButton29').innerText=text
          document.getElementById('loadingfirebasespinner').style.display='block'
          
        if(text==="Date, new to old" && text!==currsorttype){
          setdata([])
        const querySnapshot = await getDocs(query(usercollectionref, where('isdone',"==",true), where('resolvestatus','==',false), orderBy('date', "desc"), limit(limitreportvalue) ))
    
        querySnapshot.forEach((item) => {
          setdata(prevState => [...prevState, item])
    }
    )
    setcurrsorttype('Date, new to old')
    setlastreport(querySnapshot.docs[querySnapshot.docs.length-1])
    setquerytype(3)
    totalitems(query(usercollectionref, where('isdone',"==",true), orderBy('date', "desc"), where('resolvestatus','==',false)))
          }
        else if (text==="Date, old to new" && text!==currsorttype){
          setdata([])
        const querySnapshot = await getDocs(query(usercollectionref, where('resolvestatus','==',false), where('isdone',"==",true), orderBy('date'), limit(limitreportvalue) ))
        querySnapshot.forEach((item) => {
          setdata(prevState => [...prevState, item])
    }
    )
    setcurrsorttype('Date, old to new')
    setlastreport(querySnapshot.docs[querySnapshot.docs.length-1])
    setquerytype(4)
    totalitems(query(usercollectionref, where('isdone',"==",true), orderBy('date'), where('resolvestatus','==',false)))
        }
        else if(text==="Near you" ){
          if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(async function (position) {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              document.getElementById('currlocationmodalm').click()
              const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
              let data = await response.json();
              setcurrlocationdata(data)
              var tmplst=[]
              var options=[]
              if(data.address.village){
                options.push({key:"village",value:data.address.village})
              }
              if(data.address.county){
                options.push({key:"county",value:data.address.county})
              }
              if(data.address.state_district){
                options.push({key:"state_district",value:data.address.state_district})
              }
              if(data.address.state){
                options.push({key:"state",value:data.address.state})
              }
              if(data.address.country){
                options.push({key:"country",value:data.address.country})
              }
              setclv(options[0].value)
              setclt(options[0].key)
              options.map((i,key)=>{
                tmplst.push(<li key={key}><a  className="dropdown-item" href="#!"onClick={()=>{setclv(i.value) ; setclt(i.key)}}>{i.value +" : "+ modifydistic(i.key)}</a></li>)
              })
              
              setmodalbody(tmplst)
            });
          } else {
            alert("location unavailable")
          }

        }
        else if (text==="Hotest" && text!==currsorttype){
          setdata([])
        const querySnapshot = await getDocs(query(usercollectionref, where('resolvestatus','==',false), where('isdone',"==",true), orderBy('ADPF', "desc"), limit(limitreportvalue) ))
        querySnapshot.forEach((item) => {
          setdata(prevState => [...prevState, item])
    }
    )
    setcurrsorttype('Hotest')
    setlastreport(querySnapshot.docs[querySnapshot.docs.length-1])
    setquerytype(5)
    totalitems(query(usercollectionref, where('isdone',"==",true), orderBy('ADPF', "desc"), where('resolvestatus','==',false)))
        }
        document.getElementById('loadingfirebasespinner').style.display='none'
      }

      const locationadvancemodal=async()=>{
        const latitude=tpmarkerlocation[0].lat
        const longitude=tpmarkerlocation[0].lng
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
           let data = await response.json();
           
           setadvancecurrdata([])
           var tmplst=[]
           var options=[]
           if(data.address.village){
             options.push({key:"village",value:data.address.village})
           }
           if(data.address.county){
             options.push({key:"county",value:data.address.county})
           }
           if(data.address.state_district){
             options.push({key:"state_district",value:data.address.state_district})
           }
           if(data.address.state){
             options.push({key:"state",value:data.address.state})
           }
           if(data.address.country){
             options.push({key:"country",value:data.address.country})
           }
           adsetclv(options[0].value)
           adsetclt(options[0].key)
           options.map((i,key)=>{
             tmplst.push(<li key={key}><a className="dropdown-item" href="#!"onClick={()=>{adsetclv(i.value) ; adsetclt(i.key)}}>{i.value +" : "+ modifydistic(i.key)}</a></li>)
           })
           
           setadvancecurrdata(tmplst)
         

      }
      const modifydistic=(string)=>{
        if (string==="state_district"){
          return "District"
        }
        else{
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
      }
      const defaultlocationadvancemodal = async()=>{
        if (navigator.geolocation && firstmap) {
          navigator.geolocation.getCurrentPosition(async function (position) {
           const latitude = position.coords.latitude;
           const longitude = position.coords.longitude;
           const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
           let data = await response.json();
           setcurrlocationdata(data)
           var tmplst=[]
           var options=[]
           if(data.address.village){
             options.push({key:"village",value:data.address.village})
           }
           if(data.address.county){
             options.push({key:"county",value:data.address.county})
           }
           if(data.address.state_district){
             options.push({key:"state_district",value:data.address.state_district})
           }
           if(data.address.state){
             options.push({key:"state",value:data.address.state})
           }
           if(data.address.country){
             options.push({key:"country",value:data.address.country})
           }
           adsetclv(options[0].value)
           adsetclt(options[0].key)
           options.map((i,key)=>{
             tmplst.push(<li key={key}><a className="dropdown-item" href="#!"onClick={()=>{adsetclv(i.value) ; adsetclt(i.key)}}>{i.value +" : "+ modifydistic(i.key)}</a></li>)
           })
           
           setadvancecurrdata(tmplst)
           setfirstmap(false)
         });
       } else {
        setadvancecurrdata([<li><a  className="dropdown-item" href="#!"onClick={()=>{adsetclv('India') ; adsetclt('country')}}>India</a></li>])
       }
      }
      const advancesearchquery= async()=>{
        const isnewtoold=document.getElementById("sortnewtoold").checked
        const ishotest= document.getElementById("sorthotest").checked
        var sortresolved = document.getElementById("sortresolved").checked
        if(sortresolved===true){
          sortresolved=[true , false]
        }
        else{
          sortresolved=[sortresolved]
        }
        setisresolvedview(sortresolved)
        if (isnewtoold && ishotest){
          setdata([])
          const querySnapshot = await getDocs(query(usercollectionref, where('resolvestatus','in',sortresolved),where("address."+adcurrloctype,"==",adcurrlocvalue) ,  where('isdone',"==",true), orderBy('date', "desc") , orderBy('ADPF', "desc")  , limit(limitreportvalue)))
          querySnapshot.forEach((item) => {
            setdata(prevState => [...prevState, item])
      }
      )
      setlastreport(querySnapshot.docs[querySnapshot.docs.length-1])
      setquerytype(6)
      totalitems(query(usercollectionref,where("address."+adcurrloctype,"==",adcurrlocvalue) , where('resolvestatus','in',sortresolved),  where('isdone',"==",true), orderBy('date', "desc") , orderBy('ADPF', "desc")));
        }
        else if(isnewtoold){
          setdata([])
          const querySnapshot = await getDocs(query(usercollectionref, where('resolvestatus','in',sortresolved),where("address."+adcurrloctype,"==",adcurrlocvalue) ,  where('isdone',"==",true), orderBy('date', "desc"), limit(limitreportvalue)))
          querySnapshot.forEach((item) => {
            setdata(prevState => [...prevState, item])
      }
      )
      setlastreport(querySnapshot.docs[querySnapshot.docs.length-1])
      setquerytype(7)
      totalitems(query(usercollectionref, where('resolvestatus','in',sortresolved),where("address."+adcurrloctype,"==",adcurrlocvalue) , where('resolvestatus','==',false),  where('isdone',"==",true), orderBy('date', "desc")))

        }
        else if(ishotest){
          setdata([])
          const querySnapshot = await getDocs(query(usercollectionref, where('resolvestatus','in',sortresolved),where("address."+adcurrloctype,"==",adcurrlocvalue) ,  where('isdone',"==",true), orderBy('date') , orderBy('ADPF', "desc") , limit(limitreportvalue) ))
          querySnapshot.forEach((item) => {
            setdata(prevState => [...prevState, item])
      }
      )
      setlastreport(querySnapshot.docs[querySnapshot.docs.length-1])
      setquerytype(8)
      totalitems(query(usercollectionref,where("address."+adcurrloctype,"==",adcurrlocvalue), where('resolvestatus','in',sortresolved) ,  where('isdone',"==",true), orderBy('date') , orderBy('ADPF', "desc") ))
        }
        else{
          setdata([])
          const querySnapshot = await getDocs(query(usercollectionref, where('resolvestatus','in',sortresolved),where("address."+adcurrloctype,"==",adcurrlocvalue) ,  where('isdone',"==",true), orderBy('date')  , limit(limitreportvalue)))
          querySnapshot.forEach((item) => {
            setdata(prevState => [...prevState, item])
      }
      )
      setlastreport(querySnapshot.docs[querySnapshot.docs.length-1])
      setquerytype(9)
      totalitems(query(usercollectionref,where("address."+adcurrloctype,"==",adcurrlocvalue), where('resolvestatus','in',sortresolved) ,  where('isdone',"==",true), orderBy('date')))
        }

        setcurrsorttype('ADVANCE')
        document.getElementById('dropdownMenuButton29').innerText='ADVANCE'
        document.getElementById('advancesearchqueryclose').click()
        
      }

      const returnmorebutton=()=>{
        if(totalreport>data.length){
        return(<button type="button" onClick={loadmorerecords} className="btn btn-secondary">{"Load more.."+(totalreport-data.length)}</button>)
        }
      }

      const emptyreports=()=>{
        if(totalreport===0){
          return("No Report Found ...")
        }
        
      }

      const setslides=(data)=>{
        if(data.isvideo===true && data.isdone){
          setslide([
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
          ])
          setOpenvideo(true)
        }
        
        else if(data.isvideo===true){
          setslide([
            {
              type: "video",
              width: 1280,
              height: 720,
              autoPlay:true,
              sources: [
                {
                  src: data.videourl,
                  type: "video/mp4"
                }
              ]
            },
          ])
          setOpenvideo(true)
        }
        else if(data.isvideo===false && data.isdone){
          
          
          var files=[]
          data.outimages.map((i)=>{
            files.push({src:i})
          })
          setslide(files)
          setOpen(true)
          
        }
        else if(data.isvideo===false){
          var files=[]
          data.fileurl.map((i)=>{
            files.push({src:i})
          })
          setslide(files)
          setOpen(true)
        }
      }
  return (
    <>

    {/* view user  */}
    <div className="modal top fade" id="exampleModaluserview" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog modal-fullscreen   modal-dialog-centered">
    <div className="modal-content" style={{background: "transparent",boxShadow: "none"}}>
      <div className="modal-body">
      <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-md-9 col-lg-7 col-xl-5">
        <div className="card" style={{borderRadius: "15px"}}>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" style={{    position: "absolute",right: "0px",
    padding: "13px"}}></button>
          <div className="card-body p-4">
            <div className="d-flex text-black">
              <div className="flex-shrink-0">
                <img src={viewuserdata.photourl}
                  alt="Generic placeholder image" className="img-fluid"
                  style={{width: "180px", borderRadius: "10px"}}/>
              </div>
              <div className="flex-grow-1 ms-3" style={{    overflow: "overlay"}}>
                <h5 className="mb-1">{viewuserdata.name} &nbsp;
            <MDBTooltip  tooltipTag='span'  tag='span'title="Verified User">
            {viewuserdata.isverified}
            </MDBTooltip> </h5>
                <p className="mb-2 pb-1" style={{color: "#2b2a2a"}}>{viewuserdata.email}</p>
                <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                  style={{backgroundColor: "#efefef"}}>
                  <div>
                    <p className="small text-muted mb-1">Contribution</p>
                    <p className="mb-0">{viewuserdata.contribution}</p>
                  </div>
                  <div className="px-3">
                    <p className="small text-muted mb-1">Likes</p>
                    <p className="mb-0">{viewuserdata.likes}</p>
                  </div>
                  <div>
                    <p className="small text-muted mb-1">Comments</p>
                    <p className="mb-0">{viewuserdata.Comments}</p>
                  </div>
                </div>
                <div className="d-flex pt-1">
                  <a type="button" className="btn btn-outline-primary me-1 flex-grow-1" href = "mailto: abc@example.com">Email</a>
                  {/* <button type="button" className="btn btn-primary flex-grow-1">Follow</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      </div>
      
    </div>
  </div>
</div>

    {/* advance search query modal  */}
    <div className="modal top fade" id="advancesearchquerymodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog modal-lg  modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">ADVANCE SORT</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {/* location  */}
      <div className=" d-flex justify-content-evenly mt-4 ">
      <button type="button" className="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModalgetlocation">
  Select Location
</button>

<div className="dropdown" style={{cursor:'pointer'}}>
  <div className="form-outline" style={{    minWidth: "200px"}}>
  <a
    className="form-control active dropdown-toggle"
    id="dropdownMenuButton299"
    data-mdb-toggle="dropdown"
    aria-expanded="false"
    style={{borderInline: "0px",
        borderTop: "0px",
        borderRadius: "0px",}}
  >
    {adcurrlocvalue}
  </a>
      <label className="form-label" htmlFor="dropdownMenuButton299" style={{background: "transparent"}}>NEAR :</label>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton299">

  {advancesurrdata}

  </ul>
</div>
  </div>
  </div>

  <div className="form-check mt-4">
  <input className="form-check-input" type="checkbox" value="" id="sortnewtoold" defaultChecked />
  <label className="form-check-label" htmlFor="sortnewtoold">SORT : Date, new to old ?</label>
</div>
<div className="form-check mt-4">
  <input className="form-check-input" type="checkbox" value="" id="sorthotest" defaultChecked />
  <label className="form-check-label" htmlFor="sorthotest">SORT : Hotest ?</label>
</div>

<div className="form-check mt-4">
  <input className="form-check-input" type="checkbox" value="" id="sortresolved" defaultChecked />
  <label className="form-check-label" htmlFor="sortresolved">Include RESOLVED ?</label>
</div>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" id='advancesearchqueryclose' data-mdb-dismiss="modal">
          Close
        </button>
        <button type="button" className="btn btn-primary"  onClick={advancesearchquery}>SORT</button>
      </div>
    </div>
  </div>
</div>

    {/* curr location modal  */}
<button type="button" className="btn btn-primary" id='currlocationmodalm' data-mdb-toggle="modal" style={{display:"none"}} data-mdb-target="#exampleModalcurrlocation">
</button>
<div className="modal top fade" id="exampleModalcurrlocation" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog   modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {/* body  */}
        <div className=" d-flex justify-content-center align-items-center">
          <h6>options are based on curr. location :- </h6>
        <div className="dropdown" style={{cursor:'pointer'}}>
  <div className="form-outline" style={{    minWidth: "200px"}}>
  <a
    className="form-control active dropdown-toggle"
    id="dropdownMenuButton299"
    data-mdb-toggle="dropdown"
    aria-expanded="false"
    style={{borderInline: "0px",
        borderTop: "0px",
        borderRadius: "0px",}}
  >
    {currlocvalue}
  </a>
      <label className="form-label" htmlFor="dropdownMenuButton299" style={{background: "transparent"}}>NEAR :</label>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton299">

  {currlocationmodalbody}

  </ul>
</div>
  </div>
  </div>
        

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
          Close
        </button>
        <button type="button" className="btn btn-primary" data-mdb-dismiss="modal" onClick={sortcurrlocation}>SORT</button>
      </div>
    </div>
  </div>
</div>

    {/* get location modal  */}
<div className="modal top fade" id="exampleModalgetlocation" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog modal-xl  modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" data-mdb-toggle="modal" data-mdb-target="#advancesearchquerymodal" onClick={locationadvancemodal}></button>
      </div>
      <div className="modal-body" style={{padding:"0px"}}>

     <section>
        <div id='map_canvas' style={{position:"relative"}}>
      <GoogleMapComponent markers={tpmarkerlocation} setMarkers={tpsetmarkerlocation} />
      </div>
    </section>
      </div>
    </div>
  </div>
</div>
    <Viewlocationmodal markerlocation={markerlocation}/>

    
    <div className="container pt-3">
        <div style={{display:"flex"}}>
        <h4 style={{color:'black'   ,  flex: "0 1 100%"}}>Explore</h4>
        <div className="dropdown" >
  <div className="form-outline">
  <a
    className="form-control active dropdown-toggle"
    id="dropdownMenuButton29"
    data-mdb-toggle="dropdown"
    aria-expanded="false"
    style={{borderInline: "0px",
        borderTop: "0px",
        borderRadius: "0px",}}
  >
    Date, new to old
  </a>
      <label className="form-label" htmlFor="dropdownMenuButton" style={{background: "transparent"}}>SORT BY:</label>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton29">
    <li><a className="dropdown-item" href="#!"onClick={()=>{sortbyselect("Date, new to old")}}>Date, new to old</a></li>
    <li><a className="dropdown-item" href="#!"onClick={()=>{sortbyselect("Date, old to new")}}>Date, old to new</a></li>
    <li><a className="dropdown-item" href="#!"onClick={()=>{sortbyselect("Hotest")}}>Hotest</a></li>
    <li><a className="dropdown-item" href="#!"onClick={()=>{sortbyselect("Near you")}}>Near you</a></li>
    <li><hr className="dropdown-divider" /></li>
    <li><a className="dropdown-item" href="#!"data-mdb-toggle="modal" data-mdb-target="#advancesearchquerymodal" onClick={defaultlocationadvancemodal}>ADVANCE</a></li>
    
    
  </ul>
</div>
  </div>



        </div>
    
  </div>
    <div>
    <hr className="my-1"></hr>

{/* loading page  */}
<div className='loadingfurebase'>
<div className="spinner-grow" id='loadingfirebasespinner' role="status" >
  <span className="visually-hidden">Loading...</span>
</div>
<section style={{backgroundColor: "#eee"}}>
  <div className="container py-5">
{data.map(item=>{

  modalincrement+=1
  return (<Card id={item.id} setviewuserdata={setviewuserdata} diffuserdata={diffuserdata} setdiffuserdata={setdiffuserdata} setslides={setslides}   data={item.data()} key={item.id}  modalincrement={modalincrement}   setmaplocation={setmarkerlocation}  deletedoc={deletedocpromp} update={setupdateid}/>)
  
})}

<div className="row justify-content-center mb-3" >
    <div className="col-md-12 col-xl-10">
      <div className="card shadow-0 border rounded-3">
        
{returnmorebutton()}
</div></div></div>
<div className="row justify-content-center mb-3" >
    <div className="col-md-12 col-xl-10">
      <div className="card shadow-0 border rounded-3" style={{alignItems: "center",background: "transparent"}}>
        
{emptyreports()}
</div></div></div>
    {/* delete modal  */}
    <button type="button" id="deltemodalbuttonid" data-mdb-toggle="modal" data-mdb-target="#deletemodaliddd" style={{display :"none"}}>
</button>
<button type="button" id="videopathmodalbuttonid" data-mdb-toggle="modal" data-mdb-target="#videopathmodaliddd" style={{display :"none"}}></button>
{/* delete item modal  */}
<div className="modal" tabIndex="-1" id='deletemodaliddd'>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">CONFIRM DELETE</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Enter Email id to delete</p>
        <div className="form-outline">
  <input type="text" className="form-control" id='docdeleteverification' value={deleteverification?deleteverification:""} onChange={(e)=>{setdeleteverification(e.target.value)}} />
  <label className="form-label" htmlFor="form12" >Email ID</label>
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">CANCEL</button>
        <button type="button" className="btn btn btn-danger" id='deltebuttonconfirmid' data-mdb-dismiss="modal" onClick={deletedocument}>DELETE</button>
      </div>
    </div>
  </div>
</div>


{/* show video path modal  */}
<div className="modal" tabIndex="-1" id='videopathmodaliddd'>
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal location</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <section>
        {/* <div id='map_canvas' style={{position:"relative"}}>{mappp}</div> */}
        <div id="map_canvas_location"></div>
    </section>
       
      </div>
    </div>
  </div>
</div>
    


  </div>
</section>
</div></div>
<Lightbox
        open={openn}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Thumbnails]}
      /> 

      <Lightbox
  plugins={[Video]}
  open={openvideo}
  close={() => setOpenvideo(false)}
  slides={slides}
/>
    </>
  )
}

export default Explore