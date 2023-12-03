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
      include: [
        { model: User },
        { model: Subject },
        { model: Tutor_Availability },
      ],
    });
    return user;
  } catch (err) {
    console.error('Error in getTutorByID:', err);
    return null;
  }
};

const updateTutor = async (
  user_id,
  about_me,
  profile_picture,
  subjects,
  schedule
) => {
  try {
    const tutor = await Tutor.findOne({ where: { user_id } });
    const tutor_id = tutor.tutor_id;

    if (about_me.length > 0) {
      tutor.about_me = about_me;
    }
    if (profile_picture) {
      tutor.profile_picture = profile_picture;
    }

    tutor.save();

    if (subjects.length > 0) {
      await Tutor_Subject.destroy({ where: { tutor_id } });

      for (subject of subjects) {
        Tutor_Subject.create({
          tutor_id,
          subject_id: subject.subject_id,
        });
      }
    }
    if (schedule.length > 0) {
      await Tutor_Availability.destroy({ where: { tutor_id } });

      for (timeslot of schedule) {
        Tutor_Availability.create({
          tutor_id,
          date_time: timeslot,
        });
      }
    }
  } catch (err) {
    console.error('Error in updateTutor:', err);
    return null;
  }
};

module.exports = {
  getTutorByID,
  updateTutor,
};
