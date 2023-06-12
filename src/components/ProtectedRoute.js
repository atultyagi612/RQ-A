import React from 'react'
import { Navigate } from "react-router-dom";
import { UseUserAuth } from "../context/UserAuthContext";
const ProtectedRoute = ({ children }) => {
const {user,authenticationdone} = UseUserAuth();

//  show loading page until authnetication is in process
if(!authenticationdone) {
  return <div className="loader-wrap">
  <div className="loader">
      <span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span>
  </div>
</div>;
}
else{
  if (!user) {
    return <Navigate to="/" />;
  }
  else{
  return children;
  }
}
};

export default ProtectedRoute;