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
    const { email, password } = req.body;

    try
    {
        const user = getUserByEmail(email);

        if (!user || !comparePasswords(password, user.password))
        {
            return res.status(400).send("Failed to login. Wrong credentials");
        }

        req.session.userId = user.userId;
        return res.status(200).send('Login Successful: ?', [req.session.userId]);
    }
    catch (err)
    {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
 };

 const register = async (req, res) => {
    const { email, firstname, lastname, password, user_type} = req.body;

    try
    {
        const hashedPassword = hashPassword(password);
        const userId = await createUser(email, firstname, lastname, hashedPassword, user_type);

        req.session.userId = userId;
        return res.status(200).send('Register Successful: ?', [req.session.userId]);
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
