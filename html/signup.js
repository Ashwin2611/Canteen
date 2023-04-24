
//   // Import the functions you need from the SDKs you need
 
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
// import { getFirestore ,query,collection, where,getDoc,doc,setDoc,updateDoc,addDoc,arrayUnion,getDocs,arrayRemove } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

//   const firebaseConfig = {
//     apiKey: "AIzaSyAYDB9l-uuuIFDItv0UXe-F1TJrlEj1OUI",
//     authDomain: "foodordering-41768.firebaseapp.com",
//     databaseURL: "https://foodordering-41768-default-rtdb.asia-southeast1.firebasedatabase.app/",
//     projectId: "foodordering-41768",
//     storageBucket: "foodordering-41768.appspot.com",
//     messagingSenderId: "813600747716",
//     appId: "1:813600747716:web:7c79cd8bd346d60e3e5991"
//   };

//   // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)

//   const send=document.getElementById('btn');

//   const formHandler = (e) =>{
//       e.preventDefault();
//       let name=document.getElementById('name').value;
//       let email=document.getElementById('email').value;
//       let password=document.getElementById('password').value;
//       let number=document.getElementById('number').value;
//       console.log(name,email,password,number)
// }

// send.addEventListener('submit',formHandler)

    // const userId=push(child(ref(database),'users')).key;

    // set(ref(database,'user/' +userId){
    //     name:name,
    //     email:email,
    //     password:password,
    //     number:number,
    //     // user:user
    // })


// const signUpForm = document.querySelector('#signup-form');
// const messageElement=document.querySelector('#success-message');
// signUpForm.addEventListener('submit',async (e) => {
//   e.preventDefault();
//       let name=document.getElementById('name').value;
//       let email=document.getElementById('email').value;
//       let password=document.getElementById('password').value;
//       let number=document.getElementById('number').value;
//       const coll = collection(db,"users");
//       const que=query(coll,where("email","==",email));
//       const existingDocs=await getDocs(que);
//       if(!existingDocs.empty){
//         console.log("User already exists");
//         return;
//       }
//       addDoc(coll,{
//         name,
//         email,
//         password,
//         number
//       }).then(()=>{
//         console.log("user added successfully");
//         messageElement.textContent = "User added successfully";
//         messageElement.style.display = "flex";
//         messageElement.style.background = "#f0f9eb";
//         messageElement.style.border ="1px solid #b7e1cd"
//       }).catch(err=>console.log(err));
// });

import { auth,db,createUserWithEmailAndPassword ,doc,setDoc,updateProfile} from '../firebase.config.js'


const signUpForm = document.querySelector('#signup-form');
const messageElement=document.querySelector('#success-message');
signUpForm.addEventListener('submit',async (e) => {
  e.preventDefault();
      let name=document.getElementById('name').value;
      let email=document.getElementById('email').value;
      let password=document.getElementById('password').value;
      let number=document.getElementById('number').value;
  
     await createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
       setDoc(doc(db,"users",user.uid),{
          name,
          email,
          number
        })
        .then(()=>{
          updateProfile(user, {
            displayName: reg, photoURL: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          }).then(() => location.href  = "../food.html")
          .catch(error => console.log("auth profile error",error))
        })
        .catch(error=>alert(error))

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log("output error: ",errorCode,errorMessage)
        alert(errorCode);
        signUpForm.reset();
      });

});


