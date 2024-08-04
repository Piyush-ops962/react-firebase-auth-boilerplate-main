import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    // apiKey: "your_apiKey",
    // authDomain: "your_authDomain",
    // projectId: "your_projectId",
    // storageBucket: "your_storageBucket",
    // messagingSenderId: "your_messagingSenderId",
    // appId: "your_appId"
    apiKey: "AIvyQBIYBPCI",
    authDomain: "piyush-41bbe.firebaseapp.com",
    projectId: "piyush-41bbe",
    storageBucket: "piyush-41bbe.appspot.com",
    messagingSenderId: "844432244643",
    appId: "1:844432244643:web:ef66a05b05d98e74bf2416",
    measurementId: "G-J2HNL2K136"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
