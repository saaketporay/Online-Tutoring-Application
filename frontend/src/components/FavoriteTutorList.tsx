import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { setShowModal } from "../redux/modalSlice";

type favoriteTutorListProps = {
  favorite_tutors: {
    tutor_name: string,
    tutor_id: string,
  }[] | undefined,
}

const FavoriteTutorList = ({ favorite_tutors }: favoriteTutorListProps) => {
  const dispatch = useAppDispatch();

  return (
   <>
      <Typography variant='h6' align='center' className='mt-6'>
        Favorite Tutors
      </Typography>
      {favorite_tutors ?
        <CardContent>
          <div className='flex flex-wrap gap-x-4 gap-y-4 justify-around'>
            {favorite_tutors.map(function (tutor, i) {
              return (
                <Card 
                  key={i}
                  className='shadow-lg bg-neutral-700'
                >
                  <NavLink
                    to={`favorite/${tutor.tutor_id}`}
                    onClick={() => dispatch(setShowModal(true))}
                    className='no-underline text-white'
                  >
                    <CardContent className='break-normal'>
                      {tutor.tutor_name}
                    </CardContent>
                  </NavLink>
                </Card>
              )
            })}
          </div>
        </CardContent>
      :
        <Typography variant='body1' align='center'>
          You have not selected any tutors as favorites yet.
        </Typography>
      }
   </>
  );
};

export default FavoriteTutorList;
