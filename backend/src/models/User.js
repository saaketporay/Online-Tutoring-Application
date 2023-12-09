const {
  User,
  Tutor,
  Tutor_Subject,
  Tutor_Availability,
  Scheduled_Appointments,
} = require('./index'); // Import the User model

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

const createUser = async (
  firstname,
  lastname,
  email,
  password,
  user_type,
  totp_secret
) => {
  console.log('Received TOTP Secret in createUser:', totp_secret);
  try {
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
      totp_secret: totp_secret,
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
  schedule
) => {
  try {
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
      });
    }
  } catch (err) {
    console.error('Error in createTutor:', err);
    return null;
  }
};

const getUserSecret = async (email) => {
  try {
    const user = await User.findOne({
      where: { email: email },
      attributes: ['totp_secret'], // Fetch only the 'totp_secret' field
    });
    return user ? user.totp_secret : null;
  } catch (err) {
    console.error('Error in getUserSecret:', err);
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
    totalAppointments = await Scheduled_Appointments.count({
      where: {
        student_id: user_id,
      },
    });

    // Calculate the maximum allowed tutoring hours based on the total appointments
    const maxAllowedHours = totalAppointments;

    // If the user is not a tutor or does not have an associated Tutor record,
    // update the total_tutoring_hours in the User model directly
    user.total_tutoring_hours = Math.min(
      user.total_tutoring_hours + additionalHours,
      maxAllowedHours
    );
    await user.save();

    return user;
  } catch (error) {
    console.error('Error updating tutoring hours:', error);
    return null;
  }
};

const updateUser = async (
  user_id,
  first_name,
  last_name,
  email,
  hashedPassword
) => {
  try {
    const user = await User.findOne({ where: { user_id } });

    if (first_name.length > 0) {
      user.first_name = first_name;
    }
    if (last_name.length > 0) {
      user.last_name = last_name;
    }
    if (email.length > 0) {
      user.email = email;
    }
    if (hashedPassword.length > 0) {
      user.password = hashedPassword;
    }

    user.save();
  } catch (err) {
    console.error('Error in updateUser:', err);
    return null;
  }
};

module.exports = {
  getUserByEmail,
  createUser,
  createTutor,
  getUserByID,
  getUserSecret,
  updateTutoringHours,
  updateUser,
};
