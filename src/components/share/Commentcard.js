import React ,{useState,useEffect} from 'react'
const Commentcard = (props) => {
    const [commentcolor , setcommentcolor]=useState('black')
    const [totalupvote,settotalupvote] = useState(0)


    useEffect(()=>{
      totalupvotes()
    },[])
    const totalupvotes=async()=>{
      settotalupvote(props.data.upvotes)
    }

    function timeDiff(pdate) {
        const curr=new Date()
        const prev=new Date(pdate)
        var ms_Min = 60 * 1000; 
        var ms_Hour = ms_Min * 60;
        var ms_Day = ms_Hour * 24;
        var ms_Mon = ms_Day * 30; 
        var ms_Yr = ms_Day * 365; 
        var diff = curr - prev; 
        if (diff < ms_Min) {
            return Math.round(diff / 1000) + ' seconds ago';
        } else if (diff < ms_Hour) {
            return Math.round(diff / ms_Min) + ' minutes ago';
        } else if (diff < ms_Day) {
            return Math.round(diff / ms_Hour) + ' hours ago';
        } else if (diff < ms_Mon) {
            return 'Around ' + Math.round(diff / ms_Day) + ' days ago';
        } else if (diff < ms_Yr) {
            return 'Around ' + Math.round(diff / ms_Mon) + ' months ago';
        } else {
            return 'Around ' + Math.round(diff / ms_Yr) + ' years ago';
        }
    }


  return (
    <>
    <div className="card-body">
            <div className="d-flex flex-start align-items-center">
              <img className="rounded-circle shadow-1-strong me-3"
                src={props.data.photourl} alt="avatar" width="40"
                height="40" />
              <div>
                <h6 className="fw-bold text-primary mb-1">{props.data.name}</h6>
                <p className="text-muted small mb-0">
                  Shared publicly - {timeDiff(props.data.date)}
                </p>
              </div>
            </div>

            <p className="mt-3 mb-4 pb-2">
              {props.data.comment}
            </p>
            <div className="small d-flex justify-content-start">
            <a href="#!" className="d-flex flex-row align-items-center me-3">
                <p className="mb-0">Upvoted</p> &nbsp;
                <i className="fas fa-thumbs-up me-1" style={{marginTop: "-0.16rem", color:commentcolor}}></i>
                <p className="mb-0">{totalupvote}</p>
              </a>
             

              
            </div>
          </div>
          <hr className="my-0"></hr>
    </>
  )
}
export default Commentcard;