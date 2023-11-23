const SubjectModel = require('../models/Subject');

const subjectController = 
{
    getAllSubjects: async (req, res) => {
        try
        {
            const subjects = await SubjectModel.getAllSubjects();
            console.log(res.json(subjects));
            return subjects;
        }
        catch (err)
        {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },
    getByTutorId: async (req, res) => {
        try
        {
            const { tutor_id } = req.params;
            const subjects = await SubjectModel.getSubjectsByTutorId(tutor_id);
            console.log(subjects);
            return res.status(200).json(subjects);
        }
        catch (err)
        {
            console.error(err);
            res.status(500).send('Internal Server Error')
        }
    }
}
module.exports = subjectController;