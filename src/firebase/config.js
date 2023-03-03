import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDate } from "../helper";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyA30fudY1w42qcgA1seDA5cKrhb4kgfLdg",
  authDomain: "ecommerce-4515a.firebaseapp.com",
  projectId: "ecommerce-4515a",
  storageBucket: "ecommerce-4515a.appspot.com",
  messagingSenderId: "313476785260",
  appId: "1:313476785260:web:64c16da8108885c9dda449",
});

// sign up
export const signUp = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential)=>{
    const user = userCredential.user;
    console.log("User " + user.email + " has been created");
  }).catch((err) => {
    console.log("sign up unsuccessful");
    console.error(err.code, err.message);
  });
};

// sign in
export const signIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
    const user = userCredential.user;
    console.log(user.email + " has signed in.");
    return true;
  }).catch((err) => {
    console.log("sign in unsuccessful");
    console.error(err.code, err.message);
    return false;
  })
}

export default firebaseConfig;
