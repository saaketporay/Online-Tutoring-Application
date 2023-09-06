import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(56deg, #2E1065, #4F46E5 100%)' }}>
        <Toolbar>
          <Typography variant="h6" className="ml-10">Tutoring Scheduler</Typography>
          <div className="ms-auto">
            <Link href="/signin" className="text-white no-underline">Sign in</Link>
            <Link href="/signup" className="text-white no-underline mx-6">Sign up</Link>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;
