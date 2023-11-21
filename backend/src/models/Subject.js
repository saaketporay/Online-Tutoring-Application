// functions to intereact with the subjects table

// config for RDS
const {Subject} = require('./index')

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
    }
}
module.exports = SubjectModel;