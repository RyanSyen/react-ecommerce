import styled from "styled-components";
import { Box, TextField } from "@mui/material";

export const Form = styled.form`
  background: rgba(99, 229, 255, 0.5);
  padding: 10px 15px;
  margin: 0 20px;
`;

export const Label = styled.label`
  line-height: 2;
  text-align: left;
  display: block;
  margin: 20px 0 5px 0;
  color: #011627;
  font-size: 18px;
  font-weight: 500;
`;

export const FormTitle = styled.h1`
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(79, 98, 148);
  font-size: 2em;
  font-weight: 700;
  color: #011627;
`;

export const ErrMsg = styled.p`
  color: #bf1650;
  font-weight: 600;
  margin: 10px 0;

  &::before {
    display: inline;
    content: "⚠ ";
  }
`;

export const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 15px 15px;
  margin-bottom: 10px;
  font-size: 16px;

  &:focus {
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 10px #719ece;
    transition: 0.3s all;
  }
`;

export const SubmitBtn = styled.input`
  background: #f9f9f9;
  color: #011627;
  text-transform: uppercase;
  border: 1.5px solid #011929;
  margin-top: 40px;
  padding: 20px;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 10px;
  width: 100%;
  cursor: pointer;

  &:active {
    // button like transition and animation when clicked
    transition: 0.3s all;
    transform: translateY(3px);
  }

  &:hover{
    background: #011929;
    color: #f9f9f9;
  }
`;
