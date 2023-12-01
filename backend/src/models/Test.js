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
  deleteUserById: async (user_id) => {
    try {
      const tutor = await Tutor.findOne({
        where: {
          user_id,
        },
        attributes: ['tutor_id'],
      });
      const tutor_id = tutor ? tutor.tutor_id : -1;
      if (tutor_id !== -1) {
        await Favorite.destroy({
          where: {
            tutor_id,
          },
        });
        await Tutor_Subject.destroy({
          where: {
            tutor_id,
          },
        });
        await Tutor_Availability.destroy({
          where: {
            tutor_id,
          },
        });
        await Scheduled_Appointments.destroy({
          where: {
            tutor_id,
          },
        });
        await Tutor.destroy({
          where: {
            tutor_id,
          },
        });
      }

      await Favorite.destroy({
        where: {
          student_id: user_id,
        },
      });
      await Scheduled_Appointments.destroy({
        where: {
          student_id: user_id,
        },
      });
      await User.destroy({
        where: {
          user_id,
        },
      });
      return { message: 'Deletion successful' };
    } catch (err) {
      return err;
    }
  },
};

module.exports = Test;
