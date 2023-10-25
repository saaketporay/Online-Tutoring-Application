import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../assets/icons/Logo.svg';
import SvgIcon from '@mui/material/SvgIcon';
import { Form, Link as RouterLink, useRouteLoaderData } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Button, Stack } from '@mui/material';

function Header() {
  const token = useRouteLoaderData('root');
  const signedIn = token != "EXPIRED" && token != null;

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
            {!signedIn ?
              <Link
                to="/signin"
                component={RouterLink}
                className="no-underline mr-6"
                color="#F4F4F4">
                Sign in
              </Link>
              :
              <Form
                action="/logout"
                method="post"
              >
                <Button
                  type="submit"
                  sx={{
                    textTransform: 'none',
                    color: '#F4F4F4',
                    fontSize: '16px'
                  }}
                  disableRipple
                >
                  Logout
                </Button>
              </Form>
            }
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
