// functions to intereact with the subjects table

// config for RDS
const connection = require('../config/sequelize')

const SubjectModel = 
{
    getAllSubjects: async () => {
        try
        {
            const subjectQuery = 'SELECT * FROM Subjects;';
            const [subjects] = await connection.promise().query(subjectQuery);
            return subjects;
        }
        catch (err)
        {
            return err;
        }
    }
}
module.exports = SubjectModel;