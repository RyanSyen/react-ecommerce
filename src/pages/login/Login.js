import { useForm } from "react-hook-form";
import React, { useContext } from "react";
import { Navigate, useNavigate, useNavigationType } from "react-router-dom";
import { AuthContext } from "../../authentication/auth";
import {signIn} from "../../firebase/config";
import { update_signIn } from "../../firebase/users";
import {
  Form,
  Label,
  FormTitle,
  Input,
  SubmitBtn,
  ErrMsg,
} from "../auth.styles";
import { getDateTime } from "../../helper";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await signIn(data.email, data.password, getDateTime());
      await update_signIn(data.email, getDateTime());
      console.log("signed in action done 1");
    } catch (err) {
      console.log("sign in unsuccessful");
      console.error(err.code, err.message);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    console.log("signed in action done 2");

    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>Login</FormTitle>
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
        })}
      />
      {errors?.email?.type && (
        <ErrMsg className="errMsg">{errors.email.message}</ErrMsg>
      )}

      {/* password  */}
      <Label htmlFor="Password">Password</Label>
      <Input
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
      <SubmitBtn name="login" type="submit" />
    </Form>
  );
}
