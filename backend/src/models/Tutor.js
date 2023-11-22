const { Tutor } = require('./index');

const getTutorByID = async (user_id) => {
  try {
    const user = await Tutor.findOne({
      where: {
        user_id: user_id,
      },
    });
    return user;
  } catch (err) {
    console.error('Error in getTutorByID:', err);
    return null;
  }
};

module.exports = {
  getTutorByID,
}
