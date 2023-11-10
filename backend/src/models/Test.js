const {
  User,
  Tutor,
  Subject,
  Tutor_Subject,
  Scheduled_Appointments,
  Favorite,
  Tutor_Availability,
} = require('./index');

const Test = {
  deleteTutorByTutorId: async (tutor_id) => {
    try {
      const result1 = await Tutor_Subject.destroy({
        where: {
          tutor_id,
        },
      });
      console.log(result1);
      const result2 = await Tutor_Availability.destroy({
        where: {
          tutor_id,
        },
      });
      console.log(result2);
      const result3 = await Favorite.destroy({
        where: {
          tutor_id,
        },
      });
      console.log(result3);
      const result4 = await Scheduled_Appointments.destroy({
        where: {
          tutor_id,
        },
      });
      console.log(result4);
      const result5 = await Tutor.destroy({
        where: {
          tutor_id,
        },
      });
      console.log(result5);
      const result6 = await User.destroy({
        where: {
          user_id: tutor_id,
        },
      });
      console.log(result6);
      return result5;
    } catch (err) {
      return err;
    }
  },
};

module.exports = Test;
