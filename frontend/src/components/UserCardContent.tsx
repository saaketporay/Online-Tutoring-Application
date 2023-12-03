import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setShowModal } from "../redux/modalSlice";

const UserCardContent = ({
  first_name,
  last_name,
  total_tutoring_hours,
  profile_picture
}: { first_name: string, last_name: string, total_tutoring_hours: number, profile_picture: string | undefined }) => {
  const dispatch = useAppDispatch();
  const user_type = useAppSelector((state) => state.auth.user_type);

  return (
    <>
      <CardContent>
        <Stack
          direction={'row'}
          spacing={3}
          className={user_type == "student" ? "grid" : ""}
        >
          {user_type == "tutor" &&
            <Avatar
              variant='square'
              sx={{
                height: 75,
                width: 75
              }}
              src={`${import.meta.env.VITE_BACKEND_BASE_URL}/uploads/${profile_picture}`}
            />
          }
          <Typography
            variant='h6'
            className={user_type == "student" ? "mt-2 justify-self-center" : "self-center"}>
            {first_name} {last_name}
          </Typography>
        </Stack>
        <Stack direction={'column'} spacing={1}>
          {user_type == "student" &&
            <>
              <Button
                className="mt-6 px-16"
                component={NavLink}
                to="edit-profile"
                onClick={() => dispatch(setShowModal(true))}
                sx={{
                  backgroundColor: '#16653480',
                  textTransform: 'none',
                  color: '#4ADE80'
                }}
              >
                Edit Profile
              </Button>
            </>
          }
          <Stack direction={'row'} justifyContent={'space-between'} className="mt-5">
            <Typography variant='body2'>
              Total meeting time
            </Typography>
            <Typography variant='body2'>
              {total_tutoring_hours} hours
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </>
  )
};

export default UserCardContent;
