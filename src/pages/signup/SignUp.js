import { React, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../../firebaseConfig";
import "./SignUp.styles.css";

export default function SignUp() {
  const [signUpDone, setsignUpDone] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // watch password value
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    console.log(data);
    try {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
        setsignUpDone(true);
    } catch (err) {
      alert(err);
    }
  };

  if(signUpDone){
    console.log("next function -> navigate user to login page");
    // return <Redirect to="/login" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* username */}
      <label htmlFor="username">Username</label>
      <input
        name="username"
        type="text"
        placeholder="e.g. bob"
        // implement validation
        {...register("username", {
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username must be more than 3 characters",
          },
          maxLength: {
            value: 100,
            message: "Username must not exceed more than 100 characters",
          },
          validate: {
            defaultVal: (value) =>
              value !== "Lorem" || "Lorem is not your name",
          },
        })}
      />
      {/* display error msg */}
      {errors?.username?.type && (
        <p className="errMsg">{errors.username.message}</p>
      )}

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
          //   validate: {
          //     defaultVal: (value) =>
          //       value !== `${intialValues.email}` ||
          //       `${intialValues.email} is not your email`
          //   }
        })}
      />
      {errors?.email?.type && <p className="errMsg">{errors.email.message}</p>}

      {/* phone number */}
      <label htmlFor="PhoneNumber">Phone Number</label>
      <input
        name="phone"
        type="phone"
        placeholder="012-23453674"
        {...register("phoneNumber", {
          required: "Phone Number is required",
          pattern: {
            value: /^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/,
            message: "Invalid phone number",
          },
          //   validate: {
          //     defaultVal: (value) =>
          //       value !== `${intialValues.phoneNumber}` ||
          //       `${intialValues.phoneNumber} is not your phone number`
          //   }
        })}
      />
      {errors?.phoneNumber?.type && (
        <p className="errMsg">{errors.phoneNumber.message}</p>
      )}

      {/* password  */}
      <label htmlFor="Password">Password</label>
      <input
        name="password"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
            message: [
              "Password must consist at least:",
              "1 Uppercase Character",
              "1 Lowercase Character",
              "1 Digit",
              "1 Special Character",
              "Minimum length of 8",
            ],
          },
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

      {/* confirm password */}
      <label htmlFor="Confirm Password">Confirm Password</label>
      <input
        name="confirm_password"
        type="password"
        placeholder="Confirm Password"
        {...register("ConfirmPassword", {
          required: "Confirm Password is required",
          validate: {
            match: (value) =>
              value === password.current || "Password does not match",
          },
        })}
      />

      {errors?.ConfirmPassword?.type && (
        <p className="errMsg">{errors.ConfirmPassword.message}</p>
      )}

      <input type="submit" />
    </form>
  );
}
