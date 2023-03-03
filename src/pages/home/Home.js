import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authentication/auth";
import firebaseConfig from "../../firebase/config";
import { update_signOut } from "../../firebase/users";
import { getDateTime } from "../../helper";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      firebaseConfig
        .auth()
        .signOut()
        .then(() => {
          console.log("signed out successfully.");
        })
        .catch((err) => {
          console.log("Failed to sign out. Please try again");
          console.error(err.code, err.message);
        });

      await update_signOut(currentUser.email, getDateTime());
    } catch (err) {
      console.log("Failed to sign out. Please try again");
      console.error(err.code, err.message);
    }
  };
  return (
    <>
      <h1>Home</h1>
      {currentUser ? (
        <>
          <p>Welcome ${currentUser.email}</p>
          <button onClick={() => handleSignOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <p>Welcome User</p>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Sign In</button>
        </>
      )}
    </>
  );
};

export default Home;
