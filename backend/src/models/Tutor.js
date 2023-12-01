const {
  User,
  Tutor,
  Subject,
  Tutor_Subject,
  Tutor_Availability,
} = require('./index');

const getTutorByID = async (user_id) => {
  try {
    const user = await Tutor.findOne({
      where: {
        user_id: user_id,
      },
      include: [{ model: User }, { model: Subject }],
    });
    return user;
  } catch (err) {
    console.error('Error in getTutorByID:', err);
    return null;
  }
};

module.exports = {
  getTutorByID,
};
