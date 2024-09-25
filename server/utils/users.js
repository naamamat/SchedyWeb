const { User } = require('../schema/user');


function validateId(id) {
    // Regular expression to match digits only
    const regex = /^[0-9]+$/;

    // Test if the id matches the regex
    return regex.test(id);
}

const getUserByUsername = async (username) => {
    try {
        return await User.findOne({ username });
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createUser = async (data) => {
    try {
        return await User.create([data]);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const verifyUserData = async (username, password) => {
    try {
        return await User.findOne({ username, password });
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { getUserByUsername, verifyUserData , createUser, validateId}
