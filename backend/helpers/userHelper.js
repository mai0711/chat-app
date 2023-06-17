const { genSalt, hash } = require('bcrypt');

// function for hashed password
const hashPassword = async (password) => {
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
};

module.exports = { hashPassword };
