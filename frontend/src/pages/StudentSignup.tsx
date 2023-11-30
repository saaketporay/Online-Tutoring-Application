import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Form } from "react-router-dom";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import GeneralSignupInfo from "../components/GeneralSignupInfo";
import { squareButtonTheme } from "../utils/theme";
import { ThemeProvider } from "@emotion/react";
import type { ActionFunction } from "react-router-dom";
import { redirect, json } from "react-router-dom";
import { store } from "../redux/store";
import { setToken, setExpiration, setUserType } from "../redux/authSlice";
import { axiosInstance } from "../utils/axios";
import React, { useState } from "react";
import MultifactorAuth from "../components/MultifactorAuth";

const StudentSignup = () => {
  const [showTOTPModal, setShowTOTPModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userInfo = Object.fromEntries(formData.entries()) as Record<string, string>;
    setUserEmail(userInfo.email); // Store the email for TOTP verification

    const axios = axiosInstance();
    const response = await axios.post("/user/register", userInfo);
    if (response.status === 200) {
      setShowTOTPModal(true); // Show TOTP modal for verification
    } else {
      // Handle registration error
      console.error("Registration failed:", response.data);
    }
  };

  return (
    <>
      <Form method="post" onSubmit={handleSubmit}>
        <Box className="grid justify-center bg-[#191919]">
          <Typography variant="h4" className="mt-12 mb-6 justify-self-center">
            Sign up
          </Typography>
          <GeneralSignupInfo />
          <ThemeProvider theme={squareButtonTheme}>
            <Button className="mt-4 py-2 px-44 place-self-center" type="submit">
              SIGN UP
            </Button>
            <Link
              to="/signin"
              component={RouterLink}
              className="mt-2 place-self-center"
              color="#A3A3A3"
              fontSize={14}
            >
              Already have an account? Sign in
            </Link>
          </ThemeProvider>
        </Box>
      </Form>
      {showTOTPModal && <MultifactorAuth email={userEmail} />}
    </>
  );
};

export default StudentSignup;

export const userSignupAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const studentInfo = Object.fromEntries(data);
  let errors = [];

  // Email and password validation
  if (!studentInfo.email.toString().includes('@')) {
    errors.push('Email address is invalid.');
  }
  if (studentInfo.password.toString().length < 9) {
    errors.push('Password must have at least 8 characters.');
  }
  if (studentInfo.password.toString().search(/[`~!@#%&-=_,.<>;]/g) === -1) {
    errors.push(
      'Password must contain one of the following special characters: `~!@#%&-=_,.<>;'
    );
  }

  // Return errors if any
  if (errors.length > 0) {
    return json({ errors: errors });
  }

  // Register the user
  console.log(studentInfo);
  const instance = axiosInstance();
  const response = await instance.post('/user/register', {
    ...studentInfo,
    user_type: 'student',
  });

  // Handle any errors from the registration process
  if (response.status != 200) {
    return json({
      ...response.data,
      status: response.status,
    });
  }

  // The response of this action is handled by the frontend
  // The frontend will show the TOTP modal based on this response
  return json({ success: true, message: 'Registration initiated. Please verify email.' });
};
