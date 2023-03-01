import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { AuthContext, AuthProvider } from "./authentication/auth";

function App() {
  return (
    <AuthProvider>
      {/* <Router>
        <Routes>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Routes>
      </Router> */}
      {/* <Home /> */}
      <Login />
    </AuthProvider>
    // <AuthContext
    // <Home />
  );
}

export default App;
