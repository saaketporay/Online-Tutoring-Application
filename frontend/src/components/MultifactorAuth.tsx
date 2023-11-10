import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { cardTheme, textFieldTheme, squareButtonTheme } from "../utils/theme";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { createTheme } from "@mui/material";

const theme = createTheme(cardTheme, textFieldTheme, squareButtonTheme);

function MultifactorAuth() {
  const [number, setNumber] = useState<string>('');

  const verifyHandler = (
    e: React.FormEvent<EventTarget>
  ) => {
    e.preventDefault();
    console.log(number);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box className="grid justify-center bg-[#191919]">
          <Card
            className='mt-16'
            sx={{
              width: 500,
              height: 400
            }}
          >
            <CardContent className='grid justify-items-center'>
              <form onSubmit={verifyHandler} className="grid">
                <Typography variant='h5' className='mt-6'>Check your phone messages</Typography>
                <Typography className='mt-6'>You should be receiving a verification code shortly</Typography>
                <Typography className='mt-6'>Enter the code below</Typography>
                <TextField
                  required
                  id="number"
                  name="number"
                  type="number"
                  className="w-[200px] my-4"
                  onChange={e => setNumber(e.target.value)}
                />
                <Button
                  className='mt-6'
                  type='submit'
                >
                  Verify
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default MultifactorAuth;
