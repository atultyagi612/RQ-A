import { initializeApp } from "firebase/app";
import { getAuth ,RecaptchaVerifier } from "firebase/auth";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXX",
  measurementId: "XXXXXXXXXX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage =getStorage(app);
export const db = getFirestore(app);
export default app;
