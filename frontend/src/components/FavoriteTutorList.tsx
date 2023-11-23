import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { setShowModal } from "../redux/modalSlice";
import { favoriteTutorsType } from '../pages/UserDashboard';

const FavoriteTutorList = ({ favorite_tutors }: {favorite_tutors: favoriteTutorsType}) => {
  const dispatch = useAppDispatch();

  return (
   <>
      <Typography variant='h6' align='center' className='mt-6 mb-3'>
        Favorite Tutors
      </Typography>
      {favorite_tutors && favorite_tutors.length > 0 ?
        <CardContent>
          <div className='flex flex-wrap gap-x-4 gap-y-4 justify-around'>
            {favorite_tutors.map(function (tutor, i) {
              return (
                <Card 
                  key={i}
                  className='shadow-lg bg-neutral-700'
                >
                  <NavLink
                    to={`favorite/${tutor.Tutor.tutor_id}`}
                    onClick={() => dispatch(setShowModal(true))}
                    className='no-underline text-white'
                  >
                    <CardContent className='break-normal'>
                      {tutor.Tutor.User.first_name} {tutor.Tutor.User.last_name}
                    </CardContent>
                  </NavLink>
                </Card>
              )
            })}
          </div>
        </CardContent>
      :
        <Typography variant='body1' align='center' className='mb-3'>
          You have not selected any tutors as favorites yet.
        </Typography>
      }
   </>
  );
};

export default FavoriteTutorList;
