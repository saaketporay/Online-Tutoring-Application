import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Link as RouterLink, Form, useActionData } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import {
  squareButtonTheme,
  checkboxTheme,
  textFieldTheme,
} from "../utils/theme";
import { axiosInstance } from "../utils/axios";
import MultifactorAuth from "../components/MultifactorAuth";

const theme = createTheme(textFieldTheme, checkboxTheme, squareButtonTheme);

type authError = {
  error: string;
};

const EmailSignin = () => {
  const data = useActionData() as authError;
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userInfo = Object.fromEntries(formData.entries());
    // Ensure the email is a string before setting the state
    const emailValue = userInfo.email;

    if (typeof emailValue === "string" && !emailValue.includes("@")) {
      // Update your state or UI to show the email format error
      return; // Stop further processing
    }

    if (typeof emailValue === "string") {
      setUserEmail(emailValue);
    }

    try {
      const axios = axiosInstance();
      const response = await axios.post("/user/login", userInfo);
      if (response.status === 200) {
        setShow2FAModal(true); // Show TOTP modal for further verification
      } else {
        // Handle failed login attempt
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      {!show2FAModal && 
        <Box className="grid justify-center bg-[#191919]">
          <Form className="grid" method="post" onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              className="mt-24 mb-12 justify-self-center"
            >
              Sign in
            </Typography>
            {data && data.error && (
              <ul className="mt-0">
                <li className="text-red-500">{data.error}</li>
              </ul>
            )}
            <ThemeProvider theme={theme}>
              <TextField
                required
                id="email"
                name="email"
                label="Required"
                placeholder="Email Address"
                autoComplete="off"
                className="w-[410px] mb-10"
              />
              <TextField
                required
                id="password"
                name="password"
                label="Required"
                placeholder="Password"
                type="password"
                className="w-[410px] mb-4"
              />
              <Button className="mt-8 py-2" type="submit">
                SIGN IN
              </Button>
              <div className="flex justify-between">
                <Link
                  to="/password-reset"
                  component={RouterLink}
                  className="mt-2"
                  color="#A3A3A3"
                  fontSize={14}
                >
                  Forgot Password?
                </Link>
                <Link
                  to="/signup"
                  component={RouterLink}
                  className="mt-2"
                  color="#A3A3A3"
                  fontSize={14}
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </ThemeProvider>
          </Form>
        </Box>
      }
      {show2FAModal && <MultifactorAuth email={userEmail} />}
    </>
  );
};

export default EmailSignin;
