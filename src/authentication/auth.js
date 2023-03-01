import React, { useEffect, useState } from "react";
import firebaseConfig from "../firebaseConfig";

// share current user's status between components
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    // observer for changes to user's sign-in state
    // triggered when user sign in or sign out
    firebaseConfig.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log("user: ");
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading ... 🍃</p>;
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
