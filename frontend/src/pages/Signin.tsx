import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiButton: {
        defaultProps: {
            variant: 'contained'
        },
        styleOverrides: {
            root: {
                borderRadius: 50,
                textTransform: 'none',
                fontSize: 16,
            }
        }
    },
    MuiSvgIcon: {
        defaultProps: {
            className: 'absolute left-4'
        }
    }
  }
})

function Signin() {
  return (
    <>
      <Box className="grid place-content-center bg-[#191919]">
        <Typography variant="h4" className="my-16">Sign in to Tutoring Scheduler</Typography>
        <Stack spacing={3}>
          <ThemeProvider theme={theme}>
            <Button sx={{ backgroundColor: '#10B981' }}>
              Sign in with Email
            </Button>
            <Button sx={{ backgroundColor: '#3B82F6' }}>Sign in with Google</Button>
            <Button sx={{ backgroundColor: '#0284C7' }}>Sign in with Facebook</Button>
            <Button sx={{ backgroundColor: '#F5F5F5' }} className="text-[#191919]">Sign in with Apple</Button>
          </ThemeProvider>
        </Stack>
      </Box>
    </>
  )
}

export default Signin;
