import { createTheme } from '@mui/material/';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

const whiteSmoke = "#F4F4F4";
const neutral700 = "#404040";
const neutral400 = "#A3A3A3";
const emerald500 = "#10B981";
const eerieBlack = "#191919";

export const textTheme = createTheme({
  palette: {
    text: {
      primary: whiteSmoke,
    },
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
      },
    },
  },
});

export const textFieldTheme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        focused: true,
      },
      styleOverrides: {
        root: {
          width: '400px',
          '& label.Mui-focused': {
            // Must be under MuiTextField to work
            color: neutral400,
          },
          '& .MuiInputBase-root': {
            color: whiteSmoke
          }
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: neutral700,
          },
          // Placeholder has the correct whitesmoke color when opacity = 1
          '& input::placeholder': {
            opacity: 1
          },
          '& textarea::placeholder': {
            opacity: 1
          },
        },
        input: {
          '&:-webkit-autofill': {
            // Keeps background from changing on autocomplete option hover
            WebkitBoxShadow: '0 0 0 100px ' + eerieBlack + ' inset',
            WebkitTextFillColor: whiteSmoke,
          },
          // TODO: Figure out how to prevent autocomplete from changing the font on hover
        }
      },
    },
  },
});

export const checkboxTheme = createTheme({
  components: {
    MuiFormControlLabel: {
      defaultProps: {
        className: "pt-3"
      },
      styleOverrides: {
        root: {
          color: neutral400,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: neutral700,
        },
      },
    },
  },
});

export const squareButtonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: emerald500,
          '&:hover': {
            // Prevents default MUI button behavior
            backgroundColor: emerald500,
          },
          color: whiteSmoke,
        },
      },
    },
  },
});
