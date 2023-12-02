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
import { json } from "react-router-dom";
import { axiosInstance } from "../utils/axios";
import MultifactorAuth from "../components/MultifactorAuth";
import { store } from "../redux/store";
import { setEmail } from "../redux/authSlice";
import { setShowModal } from "../redux/modalSlice";
import { useAppSelector } from "../redux/hooks";

const StudentSignup = () => {
  const showTOTPModal = useAppSelector((state) => state.modal.showModal);
  const userEmail = useAppSelector((state) => state.auth.email);

  return (
    <>
      {!showTOTPModal && (
        <Form method="post">
          <Box className="grid justify-center bg-[#191919]">
            <Typography variant="h4" className="mt-12 mb-6 justify-self-center">
              Sign up
            </Typography>
            <GeneralSignupInfo userData={undefined}/>
            <ThemeProvider theme={squareButtonTheme}>
              <Button
                className="mt-4 py-2 px-44 place-self-center"
                type="submit"
              >
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
      )}
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
  if (!studentInfo.email.toString().includes("@")) {
    errors.push("Email address is invalid.");
  }
  if (studentInfo.password.toString().length < 9) {
    errors.push("Password must have at least 8 characters.");
  }
  if (studentInfo.password.toString().search(/[`~!@#%&-=_,.<>;]/g) === -1) {
    errors.push(
      "Password must contain one of the following special characters: `~!@#%&-=_,.<>;"
    );
  }

  // Return errors if any
  if (errors.length > 0) {
    return json({ errors: errors });
  }

  // Register the user
  const instance = axiosInstance();
  const response = await instance.post("/user/register", {
    ...studentInfo,
    user_type: "student",
  });

  // Handle any errors from the registration process
  if (response.status != 200) {
    return json({
      ...response.data,
      status: response.status,
    });
  }

  store.dispatch(setEmail(studentInfo.email as string));
  store.dispatch(setShowModal(true));

  // The response of this action is handled by the frontend
  // The frontend will show the TOTP modal based on this response
  return json({
    success: true,
    message: "Registration initiated. Please verify email.",
  });
};
