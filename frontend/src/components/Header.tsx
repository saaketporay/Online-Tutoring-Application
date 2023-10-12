import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../assets/icons/Logo.svg';
import SvgIcon from '@mui/material/SvgIcon';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Stack } from '@mui/material';

function Header() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(56deg, #2E1065, #4F46E5 100%)'
        }}>
        <Toolbar>
          <Link
            to=""
            component={RouterLink}
            className="no-underline"
            color="#F4F4F4">
            <Stack direction={'row'}>
              <SvgIcon viewBox="0 0 30 30" className="ml-10">
                <Logo />
              </SvgIcon>
              <Typography variant="h6" className="ml-2">Tutoring Scheduler</Typography>
            </Stack>
          </Link>
          <div className="ms-auto">
            <Link
              to="/signin"
              component={RouterLink}
              className="no-underline"
              color="#F4F4F4">
              Sign in
            </Link>
            <Link
              to="/signup"
              component={RouterLink}
              className="no-underline mx-6"
              color="#F4F4F4">
              Sign up
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
