import { useForm } from "react-hook-form";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../authentication/auth";
import firebaseConfig from "../../firebaseConfig";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    try{
      firebaseConfig.auth().signInWithEmailAndPassword(data.email, data.password);
    } catch (err){
      console.log(err);
    }
  };

  const {currentUser} = useContext(AuthContext);
  if(currentUser) {
    console.log("next function -> navigate user to home page");
    // return <Navigate to="/home" />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* email */}
      <label htmlFor="Email">Email</label>
      <input
        name="email"
        type="email"
        placeholder="e.g. abc@gmail.com"
        {...register("email", {
          required: "Email is required",
          minLength: {
            value: 5,
            message: "Email must be more than 3 characters",
          },
          maxLength: {
            value: 100,
            message: "Email must not exceed more than 100 characters",
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid email address",
          },
        })}
      />
      {errors?.email?.type && <p className="errMsg">{errors.email.message}</p>}

      {/* password  */}
      <label htmlFor="Password">Password</label>
      <input
        name="password"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
        })}
      />
      {errors?.password?.type && (
        <>
          {console.log(errors.password.message)}
          {Array.isArray(errors.password.message) ? (
            <>
              <p className="errMsg">{errors.password.message[0]}</p>
              <ul>
                {errors.password.message.map(
                  (msg, idx) => idx !== 0 && <li className="errMsg">{msg}</li>
                )}
              </ul>
            </>
          ) : (
            <p className="errMsg">{errors.password.message}</p>
          )}
        </>
      )}
      <input name="login" type="submit" />
    </form>
  );
}
