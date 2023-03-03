import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const db = firebase.firestore().collection("users");

// add user after sign up
export const addUser = async (name, email, phone) => {
  try {
    const user = {
        name,
        email,
        phone,
      };
    await db.doc(email).set(user);
    console.log("user added successfully!");
  } catch (err) {
    console.error("Failed to add user: " + err);
  }
};

// update sign out 
export const update_signOut = async (email, dateTime) => {
  const user = db.doc(email);
  try {
    await user.update({ lastSignOut: dateTime });
    console.log("sign out updated successfully!");
  } catch (err) {
    console.log("sign out update failed: ", err);
  }
};

// update sign in
export const update_signIn = async (email, dateTime) => {
    const user = db.doc(email);
    try{
        await user.update({ lastSignIn: dateTime });
        console.log("sign in updated successfully!");
    } catch (err){
        console.log("sign in update failed: ", err);
    }
};
