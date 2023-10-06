import { roundButtonTheme } from '../theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom'

function StudentDashboard() {
  return (
    <>
      <Box className="grid place-content-center bg-[#191919]">
        <ThemeProvider theme={roundButtonTheme}>
          <Button
            to='/new-appt'
            component={Link}
            className='my-16 py-3 px-20'
            style={{
              backgroundColor: '#B45309',
            }}>
            <Typography className="font-bold">
              Schedule appointment
            </Typography>
          </Button>
        </ThemeProvider>
      </Box>
    </>
  )
};

export default StudentDashboard;