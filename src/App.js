import { Routes, Route } from "react-router-dom";
import Services from "./components/services/Services"
import Pictorial from "./components/services/Pictorial";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Site  from './components/mainsite/Site'
import Sidenav from "./sidenav/Sidenav";
import React from 'react';
import Uploadvideo from './components/Uploadvideo/Uploadvideo'
import Explore from "./components/Explore/Explore";
import Share from "./components/share/Share";
import Errorpage from "./components/Errorpage/Errorpage";
import { Opentoall } from "./components/opentoall/Opentoall";
import Download from "./components/Download/Download";
import View_video_image from "./components/View_video_image/View_video_image";
import Gov from "./components/GOV/Gov";

function App() {
  return (
    <>
    
          <UserAuthContextProvider>
            <Routes>
              <Route path="/app" element={ <ProtectedRoute><Sidenav dashboard={<Dashboard/>} pictorial={<Pictorial/>} Uploadvideo={<Uploadvideo/>} 
               services={<Services/>}  Explore={<Explore/>}  /></ProtectedRoute>}/>
               <Route path="/GOV" element={ <Gov />}/>
              <Route path="/" element={<Site/>} />
              <Route path="/view" element={<Share/>} />
              <Route path="/download" element={<Download/>} />
              <Route path="*" element={<Errorpage/>} />
              <Route path="/error" element={<Errorpage/>} />
              <Route path="/dashboard" element={<Opentoall/>} />
              <Route path="/view_media" element={<View_video_image/>} />
            </Routes>
            
          </UserAuthContextProvider>

    
    </>
  );
}

export default App;
