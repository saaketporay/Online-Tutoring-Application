import { createTheme } from '@mui/material';

export const textTheme = createTheme({
  palette: {
    text: {
      primary: 'white',
    }
  },
});

export const roundButtonTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
          fontSize: 18,
        }
      }
    },
    MuiSvgIcon: {
      defaultProps: {
        className: 'absolute left-5',
      }
    }
  }
});
