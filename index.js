import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: $API_KEY,
    authDomain: "codebuddy-4f58c.firebaseapp.com",
    projectId: "codebuddy-4f58c",
    storageBucket: "codebuddy-4f58c.appspot.com",
    messagingSenderId: "737471357174",
    appId: "1:737471357174:web:32b854502d6a4923b08cd7",
    measurementId: "G-XFN7ZKBZ7V"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);


var signUps = document.getElementsByClassName("signUpBar");
var signedUps = document.getElementsByClassName("signedUpBar");
var signUpInputs = document.getElementsByClassName("signUpInput");
var signUpError = document.getElementsByClassName("signUpError");
var subBtns = document.getElementsByClassName("subBtn");

signedUps[0].style.display = "none";
signedUps[1].style.display = "none";

subBtns[0].addEventListener("click", (e) => { OnSignUp(0, e) })
subBtns[1].addEventListener("click", (e) => { OnSignUp(1, e) })

async function OnSignUp(ind,e){
    e.preventDefault();
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    var email = signUpInputs[ind].value;
    
    if(regex.test(email)){
        signUps[0].style.display = "none";
        signUps[1].style.display = "none";
        signedUps[0].style.display = "flex";
        signedUps[1].style.display = "flex";

        signUpError[ind].innerHTML = "";

        const docRef = await addDoc(collection(db, "emails"), {
            email: email
        });
    }
    else{
        signUpError[ind].innerHTML = "*Enter a valid email";
        // signUpError[ind].style
    }
}

// function onReview(){
//     open("https://forms.gle/Hh5RgPBtBpgnA2iu9");
// }