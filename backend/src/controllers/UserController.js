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
            return res.redirect('/login')
        }

        req.session.userId = user.userId;
        res.redirect('/dashboard');
    }
    catch (err)
    {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
 };

 const register = async (req, res) => {
    const { email, firstname, lastname, password, user_type, total_tutoring_hours } = req.body;

    try
    {
        const hashedPassword = hashPassword(password);
        const userId = await createUser(email, firstname, lastname, password, user_type, total_tutoring_hours);

        req.session.userId = userId;
        res.redirect('/dashboard');
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
