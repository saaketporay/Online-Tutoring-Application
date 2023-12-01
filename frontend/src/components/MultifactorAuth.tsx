import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { axiosInstance } from "../utils/axios"; // Ensure you have this import
import { cardTheme, textFieldTheme, squareButtonTheme } from "../utils/theme";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { setToken, setExpiration, setUserType } from "../redux/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { setShowModal } from "../redux/modalSlice";

const theme = createTheme(cardTheme, textFieldTheme, squareButtonTheme);

function MultifactorAuth({ email }: { email: any }) {
  const [number, setNumber] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const verifyHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      const axios = axiosInstance();
      const response = await axios.post("/user/verify-totp", {
        email,
        totp: number,
      });

      if (response.status === 200) {
        const { token, user_type } = response.data;
        dispatch(setUserType(user_type));
        dispatch(setToken(token));
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 24);
        dispatch(setExpiration(expiration.toISOString()));
        dispatch(setShowModal(false));
        navigate("/dashboard"); // Redirect to dashboard on successful verification
      } else {
        console.error("Failed to verify TOTP:", response.data);
      }
    } catch (error) {
      console.error("Error during TOTP verification:", error);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box className="grid justify-center bg-[#191919]">
          <Card className="mt-16" sx={{ width: 500, height: 400 }}>
            <CardContent className="grid justify-items-center items-center">
              <form onSubmit={verifyHandler} className="grid items-center text-center gap-y-4 mt-10">
                <Typography variant="h4" component="div">
                  Check your email.
                </Typography>
                <Typography component="div" className="text-xs">
                  (You will receive a verification code shortly)
                </Typography>
                <Typography component="div" className="mt-10">Enter the code below:</Typography>
                <TextField
                  required
                  id="number"
                  name="number"
                  type="number"
                  className="mx-auto w-[200px] mt-1"
                  onChange={(e) => setNumber(e.target.value)}
                />
                <Button className="mt-5"type="submit">
                  Verify
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
    </>
  );
  
}

export default MultifactorAuth;
