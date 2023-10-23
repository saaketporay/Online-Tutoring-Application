 // user auth controller

 const { getUserByEmail, createUser } = require('../models/User');
 const { comparePasswords, hashPassword } = require('../utils/passwordUtils')

 const showLoginForm = (req, res) => {
    res.render('login');
 };

 const showRegisterForm = (req, res) => {
    res.render('register');
 };

 const login = async (req, res) => {
    const { email, hashed_password } = req.body;

    try
    {
        const user = await getUserByEmail(email);
        console.log(hashed_password);
        if (!user || !(await comparePasswords(hashed_password, user.hashed_password)))
        {
            return res.status(400).send("Failed to login. Wrong credentials");
        }

        return res.status(200).send('Login Successful: ');
    }
    catch (err)
    {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
 };

 const register = async (req, res) => {
    const { firstname, lastname, email, password, user_type} = req.body;

    try
    {
        const hashedPassword = await hashPassword(password);
        const userId = await createUser(firstname, lastname, email, hashedPassword, user_type);
        console.log(userId)

        return res.status(200).send('Register Successful: ');
    }
    catch (err)
    {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
 };

 module.exports = 
 {
    showLoginForm,
    showRegisterForm,
    login,
    register,
 };