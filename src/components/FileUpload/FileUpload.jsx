import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './FileUpload.css'

const FileUpload = ({ files, setFiles, removeFile }) => {
    const uploadHandler = (event) => {
        var lstt=[...files]
        // console.log("getfiles",lstt)
        for (const [key, value] of Object.entries(event.target.files)) {

            if (lstt.some(item => item.name === value.name)){
                // console.log("already include")
            }else{
                const file = value
                file.isUploading = false;
                lstt.push(file)
            }
          }
          setFiles(lstt)
          document.getElementsByClassName('inputfileupload')[0].value=""
          
        // uploodfile(event.target.files[0])
        // uploodfile(event.target.files[1])
        
        // setFiles([...files, event.target.files[1]])
        // const file = event.target.files[0];
        // if(!file) return;
        // file.isUploading = true;
        // setFiles([...files, file])

        // // upload file
        //         file.isUploading = false;
        //         setFiles([...files, file])
            
    }


    return (
        <>
            <div className="file-card">
                

                <div className="file-inputs">
                    <input type="file" className='inputfileupload' onChange={uploadHandler} multiple="multiple" accept="image/*"/>
                    <button>
                        <i>
                            <FontAwesomeIcon icon={faPlus} />
                        </i>
                        Upload
                    </button>
                </div>

                <p className="main">Supported files</p>
                <p className="info">PDF, JPG, PNG</p>

                <div className="d-grid gap-2 col-6">
                <button type="button" className="btn btn-primary uploadbutton23" onClick={()=>{document.getElementById('uploadbutton').click()}}>
                Done <span className="badge badge-danger ms-2 no.of.files"></span>
  <span className="visually-hidden">unread messages</span>
                </button>
                </div>
            </div>
            
        </>
    )
}

export default FileUpload
