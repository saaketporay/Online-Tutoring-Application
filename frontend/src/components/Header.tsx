import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../assets/icons/Logo.svg';
import SvgIcon from '@mui/material/SvgIcon';
import {
  Link as RouterLink,
  NavLink,
  NavLinkProps,
  useNavigate,
} from 'react-router-dom';
import Link from '@mui/material/Link';
import { Button, Stack } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/authSlice';

function Header() {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position='static'
        sx={{
          background: 'linear-gradient(56deg, #2E1065, #4F46E5 100%)',
        }}>
        <Toolbar>
          <Link
            to={ token ? '/dashboard' : '' }
            component={RouterLink}
            className='no-underline'
            color='#F4F4F4'>
            <Stack direction={'row'}>
              <SvgIcon
                viewBox='0 0 30 30'
                className='ml-10'>
                <Logo />
              </SvgIcon>
              <Typography
                variant='h6'
                className='ml-2'>
                Tutoring
              </Typography>
            </Stack>
          </Link>
          <div className='ms-auto'>
            <NavLink
              to='/search'
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-300 no-underline mr-6 hover:underline'
                  : 'text-slate-100 no-underline mr-6 hover:underline'
              }>
              Search
            </NavLink>
            {!token ? (
              <NavLink
                to='/signin'
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-300 no-underline mr-6 hover:underline'
                    : 'text-slate-100 no-underline mr-6 hover:underline'
                }>
                Sign in
              </NavLink>
            ) : (
              <Button
                onClick={() => {
                  dispatch(logout());
                  navigate('/');
                }}
                sx={{
                  textTransform: 'none',
                  color: '#F4F4F4',
                  fontSize: '16px',
                }}
                disableRipple>
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
