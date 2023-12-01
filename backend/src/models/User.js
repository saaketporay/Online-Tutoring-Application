const { User, Tutor, Tutor_Subject, Tutor_Availability } = require("./index"); // Import the User model

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  } catch (err) {
    console.error("Error in getUserByEmail:", err);
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
  console.log("Received TOTP Secret in createUser:", totp_secret);
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      console.log("User already exists!");
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
    console.error("Error in createUser:", err);
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
    console.error("Error in createTutor:", err);
    return null;
  }
};

const getUserSecret = async (email) => {
  try {
    const user = await User.findOne({
      where: { email: email },
      attributes: ["totp_secret"], // Fetch only the 'totp_secret' field
    });
    return user ? user.totp_secret : null;
  } catch (err) {
    console.error("Error in getUserSecret:", err);
    return null;
  }
};

module.exports = {
  getUserByEmail,
  createUser,
  createTutor,
  getUserByID,
  getUserSecret, 
};
