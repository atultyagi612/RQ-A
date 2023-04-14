import { initializeApp } from "firebase/app";
import { getAuth ,RecaptchaVerifier } from "firebase/auth";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDE2VOaN6EB2-PSA3iliVw-ROuU08C1E9Y",
  authDomain: "temp-fbe64.firebaseapp.com",
  projectId: "temp-fbe64",
  storageBucket: "temp-fbe64.appspot.com",
  messagingSenderId: "892252298878",
  appId: "1:892252298878:web:8e28b19175c78c3f9b422f",
  measurementId: "G-M9JJ3YQH2V"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyB94V8FQFH4_oI5jTruAa0ff0i8FFEKA6Y",
//   authDomain: "newprp-76220.firebaseapp.com",
//   projectId: "newprp-76220",
//   storageBucket: "newprp-76220.appspot.com",
//   messagingSenderId: "511209005848",
//   appId: "1:511209005848:web:1bef976eba08184b8c746d",
//   measurementId: "G-7L0T7FSYEH"
// };
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage =getStorage(app);
export const db = getFirestore(app);
export default app;
