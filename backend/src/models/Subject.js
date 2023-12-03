// functions to intereact with the subjects table

// config for RDS
const {Subject, Tutor_Subject, Tutor} = require('./index')

const SubjectModel = 
{
    getAllSubjects: async () => {
        try
        {
            const subjects = await Subject.findAll();
            return subjects;
        }
        catch (err)
        {
            return err;
        }
    },
    getSubjectsByTutorId: async (tutor_id) => {
        try
        {
            const subjects = await Subject.findAll({
                include: [{
                    model: Tutor,
                    required: true, // Want inner join instead of left outer join
                    through: {
                        where: {
                            tutor_id: tutor_id,
                        },
                    }
                }],
            });
            return subjects;
        }
        catch (err)
        {
            console.log(err);
            return err;
        }
    }
}
module.exports = SubjectModel;