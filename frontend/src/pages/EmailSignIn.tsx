import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { 
  Link as RouterLink,
  Form, useActionData,
  ActionFunction,
  json,
} from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import {
  squareButtonTheme,
  checkboxTheme,
  textFieldTheme,
} from "../utils/theme";
import { axiosInstance } from "../utils/axios";
import MultifactorAuth from "../components/MultifactorAuth";
import { store } from "../redux/store";
import { setEmail } from "../redux/authSlice";
import { useAppSelector } from "../redux/hooks";
import { setShowModal } from "../redux/modalSlice";
import { AxiosError } from "axios";

const theme = createTheme(textFieldTheme, checkboxTheme, squareButtonTheme);

type authError = {
  error: string;
};

const EmailSignin = () => {
  const data = useActionData() as authError;
  const show2FAModal = useAppSelector((state) => state.modal.showModal)
  const userEmail = useAppSelector((state) => state.auth.email);

  return (
    <>
      {!show2FAModal &&
        <Box className="grid justify-center bg-[#191919]">
          <Form className="grid" method="post" >
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
                {/* <Link
                  to="/password-reset"
                  component={RouterLink}
                  className="mt-2"
                  color="#A3A3A3"
                  fontSize={14}
                >
                  Forgot Password?
                </Link> */}
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

export const emailSigninAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const userInfo = Object.fromEntries(data);
  if (!userInfo.email.toString().includes('@')) {
    return json({ error: "Email address must have the '@' symbol." });
  }
  const instance = axiosInstance();
  try {
    await instance.post('/user/login', userInfo);
    store.dispatch(setEmail(userInfo.email as string));
    store.dispatch(setShowModal(true));
    return json({ status: 'Login initiated'})
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status == 400) {
        return json({
          error: err.response?.data,
        });
      } else {
        throw json({
          message: err.response?.data,
          status: err.response?.status,
        });
      }
    } else {
      throw json({
        message: "Unknown error occurred",
      });
    }
  }
};
