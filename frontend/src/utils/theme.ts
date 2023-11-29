import { createTheme } from '@mui/material/';

const neutral100 = '#F5F5F5';
const neutral400 = '#A3A3A3';
const neutral700 = '#404040';
const emerald500 = '#10B981';
// const eerieBlack = "#191919";
const charlestonGreen = '#2D2D2D';

export const globalTheme = createTheme({
  palette: {
    text: {
      primary: neutral100,
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
          '&:disabled': {
            backgroundColor: neutral700,
          },
        },
      },
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
          // width: '400px',
          '& label.Mui-focused': {
            // Must be under MuiTextField to work
            color: neutral400,
          },
          '& .MuiInputBase-root': {
            color: neutral100,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: neutral700,
          },
          // Placeholder has the correct whitesmoke color when opacity = 1
          '& input::placeholder': {
            opacity: 1,
          },
          '& textarea::placeholder': {
            opacity: 1,
          },
        },
      },
    },
  },
});

export const checkboxTheme = createTheme({
  components: {
    MuiFormControlLabel: {
      defaultProps: {
        className: 'pt-3',
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
          color: neutral100,
          background: emerald500,
          '&:hover': {
            // Prevents default MUI button behavior
            backgroundColor: emerald500,
          },
          '&:disabled': {
            backgroundColor: neutral700,
          },
        },
      },
    },
  },
});

export const autocompleteTheme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiAutocomplete-endAdornment .MuiButtonBase-root .MuiSvgIcon-root':
            {
              color: neutral100,
            },
        },
        input: {
          color: neutral100,
        },
        paper: {
          backgroundColor: neutral700,
        },
        option: {
          color: neutral100,
        },
        noOptions: {
          color: neutral100,
        },
        tag: {
          color: neutral100,
          backgroundColor: neutral700,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#f5f5f5',
          },
          '& .MuiFormLabel-root': {
            color: '#f5f5f5',
          },
          '& label.Mui-focused': {
            color: '#f5f5f5',
          },
          // Normal/multiline TextField styles
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#404040',
          },
          '& .MuiOutlinedInput-root:hover fieldset': {
            borderColor: '#f5f5f5',
          },
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: '#f5f5f5',
          },
        },
      },
    },
  },
});

export const radioButtonGroupTheme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: neutral400,
          '&.Mui-focused': {
            color: neutral400,
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: neutral400,
        },
      },
    },
  },
});

export const cardTheme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: charlestonGreen,
          color: neutral100,
        },
      },
    },
  },
});

export const numberInputTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root input[type="number"] + fieldset': {
            borderColor: '#404040',
          },
          '& .MuiOutlinedInput-root input[type="number"]:hover + fieldset': {
            borderColor: '#f5f5f5',
          },
          '& .MuiOutlinedInput-root input[type="number"]:focus + fieldset': {
            borderColor: '#f5f5f5',
          },
        },
      },
    },
  },
});

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#191919',
  boxShadow: 24,
  p: 4,
};

export const datepickerTheme = createTheme({
  components: {
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          color: neutral100,
          borderColor: neutral400,
          backgroundColor: neutral700,
          '& .MuiPickersLayout-contentWrapper': {
            backgroundColor: neutral700,
          },
          '& .MuiDialogActions-root': {
            backgroundColor: neutral700,
            '& .MuiButtonBase-root': {
              color: neutral100,
            },
          },
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: neutral100,
          borderColor: neutral400,
          backgroundColor: neutral700,
          '& .MuiTypography-root': {
            color: neutral100,
          },
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          color: neutral100,
          borderColor: neutral400,
          backgroundColor: neutral700,
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          '& .MuiPickersArrowSwitcher-root .MuiButtonBase-root .MuiSvgIcon-root':
            {
              color: neutral100,
            },
        },
        switchViewIcon: {
          color: neutral100,
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: neutral100,
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: neutral100,
          borderColor: neutral400,
          backgroundColor: neutral700,
        },
      },
    },
  },
});
