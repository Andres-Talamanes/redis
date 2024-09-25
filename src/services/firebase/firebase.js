// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAPEcaeYk_YG4C0vNzQM7yKbw2WSzegwHU",
  authDomain: "dashboard-and-cloud-services.firebaseapp.com",
  projectId: "dashboard-and-cloud-services",
  storageBucket: "dashboard-and-cloud-services.appspot.com",
  messagingSenderId: "1049440382236",
  appId: "1:1049440382236:web:efa56c0d5a866e00731ed9",
  measurementId: "G-7HQVSNJSEL"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export {auth, signInWithEmailAndPassword};