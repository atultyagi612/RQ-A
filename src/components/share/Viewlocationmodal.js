import React from 'react'
import Locationmarker  from './viewlocation'
const Viewlocationmodal = (props) => {
  return (
    <>
<div className="modal top fade" id="viewlocationmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
  <div className="modal-dialog modal-lg  modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body" style={{padding:"0px"}}>
        
<Locationmarker markerlocation={props.markerlocation}/>

      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Viewlocationmodal