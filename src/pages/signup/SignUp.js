import { React, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect, useNavigate } from "react-router-dom";
import { signUp } from "../../firebase/config";
import { addUser } from "../../firebase/users";
import {
  Form,
  Label,
  FormTitle,
  Input,
  SubmitBtn,
  ErrMsg,
} from "../auth.styles";
import { dblClick } from "@testing-library/user-event/dist/click";

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // watch password value
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await signUp(data.email, data.password);
      await addUser(data.username, data.email, data.phoneNumber);
      navigate("/login");
    } catch (err) {
      console.log("sign up unsuccessful");
      console.error(err.code, err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>Sign Up</FormTitle>
      {/* username */}
      <Label htmlFor="username">Username</Label>
      <Input
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
        <ErrMsg className="errMsg">{errors.username.message}</ErrMsg>
      )}

      {/* email */}
      <Label htmlFor="Email">Email</Label>
      <Input
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
      {errors?.email?.type && (
        <ErrMsg className="errMsg">{errors.email.message}</ErrMsg>
      )}

      {/* phone number */}
      <Label htmlFor="PhoneNumber">Phone Number</Label>
      <Input
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
        <ErrMsg className="errMsg">{errors.phoneNumber.message}</ErrMsg>
      )}

      {/* password  */}
      <Label htmlFor="Password">Password</Label>
      <Input
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
              <ErrMsg className="errMsg">{errors.password.message[0]}</ErrMsg>
              <ul>
                {errors.password.message.map(
                  (msg, idx) => idx !== 0 && <li className="errMsg">{msg}</li>
                )}
              </ul>
            </>
          ) : (
            <ErrMsg className="errMsg">{errors.password.message}</ErrMsg>
          )}
        </>
      )}

      {/* confirm password */}
      <Label htmlFor="Confirm Password">Confirm Password</Label>
      <Input
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
        <ErrMsg className="errMsg">{errors.ConfirmPassword.message}</ErrMsg>
      )}

      <SubmitBtn type="submit" />
    </Form>
  );
}
