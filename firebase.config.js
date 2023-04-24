
// Import the functions you need from the SDKs you need
 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore ,collection,getDoc,doc,setDoc,updateDoc,addDoc,getDocs } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut,onAuthStateChanged,updateProfile} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyAYDB9l-uuuIFDItv0UXe-F1TJrlEj1OUI",
    authDomain: "foodordering-41768.firebaseapp.com",
    databaseURL: "https://foodordering-41768-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "foodordering-41768",
    storageBucket: "foodordering-41768.appspot.com",
    messagingSenderId: "813600747716",
    appId: "1:813600747716:web:7c79cd8bd346d60e3e5991"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { db,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,doc,setDoc,signOut,onAuthStateChanged,updateProfile}