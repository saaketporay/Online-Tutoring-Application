const { User, Tutor, Tutor_Subject, Tutor_Availability } = require('./index'); // Import the User model

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  } catch (err) {
    console.error('Error in getUserByEmail:', err);
    return null;
  }
};

const getUserByID = async (user_id) => {
  try {
    const user = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    return user;
  } catch (err) {
    console.error('Error in getUserByID:', err);
    return null;
  }
};

const createUser = async (firstname, lastname, email, password, user_type) => {
  try {
    console.log(firstname, lastname, email, password, user_type);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      console.log('User already exists!');
      return false;
    }

    const newUser = await User.create({
      first_name: firstname,
      last_name: lastname,
      email: email,
      hashed_password: password,
      user_type: user_type,
    });

    console.log(`New user created with ID: ${newUser.user_id}`);
    return newUser;
  } catch (err) {
    console.error('Error in createUser:', err);
    return null;
  }
};

const createTutor = async (
  user_id,
  about_me,
  profile_picture,
  is_criminal,
  courses,
  schedule,
  hourly_chunks
) => {
  try {
    console.log(user_id, about_me, profile_picture, is_criminal);

    const newTutor = await Tutor.create({
      user_id,
      about_me,
      profile_picture,
      is_criminal,
    });

    const tutor_id = newTutor.tutor_id;
    console.log(`New tutor created with ID: ${tutor_id}`);

    for (course of courses) {
      Tutor_Subject.create({
        tutor_id,
        subject_id: course.subject_id,
      });
    }

    for (timeslot of schedule) {
      Tutor_Availability.create({
        tutor_id,
        date_time: timeslot,
        duration: hourly_chunks,
      });
    }
  } catch (err) {
    console.error('Error in createTutor:', err);
    return null;
  }
};

const updateTutoringHours = async (user_id, additionalHours) => {
  try {
    // Find the user by user_id
    const user = await User.findOne({
      where: {
        user_id: user_id,
      },
      include: [Tutor], // Include Tutor model if it exists
    });

    if (!user) {
      throw new Error('User does not exist.');
    }

    let totalAppointments;
    if (user.user_type === 'student') {
      totalAppointments = await Appointment.count({
        where: {
          student_id: user_id,
        },
      });
    } else if (user.user_type === 'tutor' && user.Tutor) {
      totalAppointments = await Appointment.count({
        where: {
          tutor_id: user.Tutor.tutor_id,
        },
      });
    }

    // Calculate the maximum allowed tutoring hours based on the total appointments
    const maxAllowedHours = totalAppointments;

    if (user.user_type === 'tutor' && user.Tutor) {
      // If the user is a tutor and has an associated Tutor record
      user.Tutor.total_tutoring_hours = Math.min(
        user.Tutor.total_tutoring_hours + additionalHours,
        maxAllowedHours
      );
      await user.Tutor.save();
    } else {
      // If the user is not a tutor or does not have an associated Tutor record,
      // update the total_tutoring_hours in the User model directly
      user.total_tutoring_hours = Math.min(
        user.total_tutoring_hours + additionalHours,
        maxAllowedHours
      );
      await user.save();
    }

    return user;
  } catch (error) {
    console.error('Error updating tutoring hours:', error);
    return null;
  }
};



module.exports = {
  getUserByEmail,
  createUser,
  createTutor,
  getUserByID,
  updateTutoringHours
};
