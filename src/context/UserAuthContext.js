import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import React from 'react';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  
  const [user, setUser] = useState({});
  const [authenticationdone , setauthenticationdone] = useState(false);
  // console.log('called' , authenticationdone)

  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log("Auth", currentuser);
      setUser(currentuser);
      setauthenticationdone(true);
  //     setUser({displayName: "xyz xyz" , email: "you.already.know.my.email.id@gmail.com",photoURL: 
  // "https://lh3.googleusercontent.com/a/AEdFTp73DTfQqc6MbN_y2q7hjgoDzfWoJllpGW5BSv1p=s96-c"});
  // setauthenticationdone(true);
      
    });
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <userAuthContext.Provider
      value={{logOut, googleSignIn,user ,authenticationdone}}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function UseUserAuth() {
  return useContext(userAuthContext);
}
