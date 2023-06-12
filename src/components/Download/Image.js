import React , {useEffect,useState} from 'react'
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import axios from "axios";
import Loader from './Loader';
export default function Image(props) {
    const container = React.useRef(null);
    const [profilepic,setprofile]=useState("");
  const pdfExportComponent = React.useRef(null);

  useEffect(()=>{
    autodownload()
    
  },[])
  const autodownload=async()=>{
     exportPDFWithComponent()
    document.body.style['overflow-y'] = 'hidden';
    // setTimeout(() => {
    //   window.close();
    // }, 5000);
  }
    const exportPDFWithMethod = () => {
        let element = container.current || document.body;
        savePDF(element, {
          paperSize: "auto",
          margin: 40,
          fileName: `Report for ${new Date().getFullYear()}`
        });
      };
      const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
          pdfExportComponent.current.save()
        }
      };
      const getdate=(timestamp)=>{
        var dateFormat = new Date(timestamp) 
                return ("Date: "+ dateFormat.getDate()+
           "/"+(dateFormat.getMonth()+1)+
           "/"+dateFormat.getFullYear())
      }

    return (
      
        <div>
          <Loader loader={true} />
          <div className="example-config">
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={exportPDFWithComponent}
            >
              Export with component
            </button>
            &nbsp;
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={exportPDFWithMethod}
            >
              Export with method
            </button>
          </div>
          <div className="border rounded p-2">
            <PDFExport
              ref={pdfExportComponent}
              paperSize="auto"
              margin={40}
              fileName={`Report: ${props.id}`}
              author="RQ-A"
            >
                <div
                  style={{
                    margin: 0,
                    padding: 0,
                    backgroundColor: "transparent",
                    display: "flex",
                    justifyContent: "center"
                  }}
                  // bgcolor="#eaeced"
                >
                  <div ref={container}
                    style={{
                      width: "700px",
                      minHeight: "500px",
                      backgroundColor: "white",
                      display: "flex",
                      alignSelf: "center",
                      flexDirection: "column",
                      padding: "30px"
                    }}
                  >
                    <div className="h-100 mb-4 mt-3 d-flex justify-content-between align-items-center">
                      <span className="text ms-4">
                        <a style={{"color":"#11101d","fontSize":"26px","fontWeight":"600"}}
                          href="https://rq-a.netlify.app"
                          className="underlinetitle" target="_blank"
                        >
                          R Q - A
                        </a>
                      </span>
                      <div className=" d-flex flex-column justify-content-between align-items-center">
                        <h5 className="me-4" style={{ color: "black" }}>
                          REPORT
                        </h5>
                        <p className="text-muted">
                          <em>{getdate(props.data.date)}</em>
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className=" d-flex mt-5 justify-content-between align-items-center">
                        <h6 style={{ borderRadius: "5px" }}>
                          <img
                            src={props.data.photourl}
                            className="rounded-circle shadow-1-strong me-3"
                            width={30}
                            height={30}
                            alt="Avatar"
                            loading="lazy"
                          />
                          {props.data.name} <a href={"mailto:"+props.data.email}  style={{color:"grey" , backgroundColor: "#b6b6dc21",
    padding: "3px",
    borderRadius: "5px"}} target="_blank"> {props.data.email} </a>
                        </h6>
                        <div>
                          Condition : &nbsp;
                          <span className={"badge badge-"+props.data.status[1]}>{props.data.status[0]}</span>
                        </div>
                      </div>
                      <div className={"mt-3 note note-"+props.data.status[1]+" mb-3"}>
                        <strong>STATUS : &nbsp;</strong> {props.data.status[2]}
                      </div>
                      <p>Message from User :- {props.data.message}</p>
                      <div className="border p-3 mt-4">
                        <h5 className="mt-1">STATS:</h5>
                        <hr className="my-3" />
                        <dl className="row">
                          <dt className="col-sm-3">NOD : </dt>
                          <dd className="col-sm-9">
                            <dl className="row">
                              <dt className="col-sm-4">{props.data.NOD}</dt>
                              <dd className="col-sm-8 text-muted">
                                Total number of Defect
                              </dd>
                            </dl>
                          </dd>
                          <dt className="col-sm-3">NDI : </dt>
                          <dd className="col-sm-9">
                            <dl className="row">
                              <dt className="col-sm-4">{Number((props.data.outimages.length/props.data.NOD).toFixed(2))}</dt>
                              <dd className="col-sm-8 text-muted">
                                Number of Defects per image.
                              </dd>
                            </dl>
                          </dd>
                          <dt className="col-sm-3">IOU : </dt>
                          <dd className="col-sm-9">
                            <dl className="row">
                              <dt className="col-sm-4">{props.data.IOU}</dt>
                              <dd className="col-sm-8 text-muted">
                                Percentage of Area covered by Defects.
                              </dd>
                            </dl>
                          </dd>
                          <dt className="col-sm-3">ANOMALIES:</dt>
                          <dd className="col-sm-9">{"Total "+props.data.output[3]+" Potholes and "+(props.data.output[1]+props.data.output[2]+props.data.output[0])+" Cracks."}
                            
                          </dd>
                        </dl>
                      </div>
                      <div className="border p-3 mt-4">
                        <div className=" d-flex justify-content-between align-items-center">
                          <h5 className="mt-1">Address:</h5>
                          <a
                          href={"http://maps.google.com/maps?q=loc:"+props.data.location.lat+","+props.data.location.lng} target="_blank"
                            type="button"
                            className="btn btn-outline-secondary    "
                            data-mdb-ripple-color="#000000"
                          >
                            
                            View on MAP
                          </a>
                        </div>
                        <hr className="my-3" />
                        <dl className="row">
                          <dt className="col-sm-3">OverAllAddress : </dt>
                          <dd className="col-sm-9">
                            <dl className="row">
                              <dd className="col-sm-8 text-muted">
                              {props.data.address.OverAllAddress}
                              </dd>
                            </dl>
                          </dd>
                          <dt className="col-sm-3">state : </dt>
                          <dd className="col-sm-9">
                            <dl className="row">
                              <dd className="col-sm-8 text-muted">{props.data.address.state}</dd>
                            </dl>
                          </dd>
                          <dt className="col-sm-3">postcode : </dt>
                          <dd className="col-sm-9">
                            <dl className="row">
                              <dd className="col-sm-8 text-muted">{props.data.address.postcode}</dd>
                            </dl>
                          </dd>
                          <dt className="col-sm-3">Country:</dt>
                          <dd className="col-sm-9 text-muted">{props.data.address.country}</dd>
                          {props.data.address.additionalInformation?<><dt className="col-sm-3">Additional Info :</dt>
                          <dd className="col-sm-9 text-muted">{props.data.address.country}</dd></>:null}
                          
                        </dl>
                      </div>
                      <h4 className="mt-4 mb-4">Visual output</h4>
                      <div>
                        {/* {props.data.outimages.map((img , key)=>{
                          return(<img key={key}
                            src={img}
                            className="img-fluid"
                            alt="Wild Landscape"
                          />)
                        })} */}
                        <a  href={window.location.origin+"/view_media?id="+props.id} target="_blank" type="button" class="btn btn-outline-secondary   btn-block btn-sm" data-mdb-ripple-color="#000000" > View Images </a>
                        
                       
                      </div>
                    </div>
                  </div>
                </div>
              
            </PDFExport>
          </div>
        </div>
      );
}
