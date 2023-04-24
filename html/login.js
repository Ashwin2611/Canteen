import { auth,signInWithEmailAndPassword} from '../firebase.config.js'


const email = document.getElementById("email");
const password   = document.getElementById("password");

document.getElementById("loginForm").addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log("form accept")
    signInWithEmailAndPassword(auth,email.value,password.value)
    .then(()=>location.href = "./food.html")
    .catch(error=>alert(error))
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log("output error: ",errorCode,errorMessage)
        alert("Entered wrong credentials!!");
        loginForm.reset();
    });
})