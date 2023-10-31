const { User } = require('./index'); // Import the User model

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        return user;
    } catch (err) {
        console.error("Error in getUserByEmail:", err);
        return null;
    }
};


const createUser = async (firstname, lastname, email, password, user_type) => {
    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            console.log("User already exists!");
            return false;
        }

        const newUser = await User.create({
            first_name: firstname,
            last_name: lastname,
            email: email,
            hashed_password: password,
            user_type: user_type
        });

        console.log(`New user created with ID: ${newUser.user_id}`);
        return newUser.user_id;
    } catch (err) {
        console.error("Error in createUser:", err);
        return null;
    }
};

module.exports = {
    getUserByEmail,
    createUser
};
