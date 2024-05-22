import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAodTQeYTCXN_uRAGITPbAqWwRLn8viA1Q",
  authDomain: "video-lib-9db85.firebaseapp.com",
  projectId: "video-lib-9db85",
  storageBucket: "video-lib-9db85.appspot.com",
  messagingSenderId: "841523191031",
  appId: "1:841523191031:web:9828e022a4d948e1b3c7f2",
  measurementId: "G-NWL83LYCD1"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)

export { app, auth, db }