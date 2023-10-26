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
    }
}
module.exports = subjectController;