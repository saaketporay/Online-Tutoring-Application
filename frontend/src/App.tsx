import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'

function App() {
  return (
    <>
      <Box className="bg-auto bg-[#191919]">
        <AppBar position="sticky" sx={{ background: 'linear-gradient(56deg, #2E1065, #4F46E5 100%)' }}>
          <Toolbar>
            <Typography variant="h6" className="ml-10">Tutoring Scheduler</Typography>
            <div className="ms-auto">
              <Link href="/signin" className="text-white no-underline">Sign in</Link>
              <Link href="/signup" className="text-white no-underline mx-6">Sign up</Link>
            </div>
          </Toolbar>
        </AppBar>
        <Box className="grid place-content-center">
          <Typography variant="h4" className="text-white my-16">Sign in to Tutoring Scheduler</Typography>
          <Stack spacing={3}>
            <Button variant="contained">Sign in with Email</Button>
            <Button variant="contained">Sign in with Google</Button>
            <Button variant="contained">Sign in with Facebook</Button>
            <Button variant="contained">Sign in with Apple</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default App;
