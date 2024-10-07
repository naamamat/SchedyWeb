const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../consts');
const { validateId , createUser} = require('../utils/users');
const { User } = require('../schema/user');

const getUser = async (req, res) => {
    const { userId } = req.user;
    const user = await User.findOne({ userId});
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
};


const editUser = async (req, res) => {
    const { userId } = req.user;
    const { firstName, lastName, email, photo } = req.body;
    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    const user = await User.findOneAndUpdate({ userId }, {
        firstName: firstName || existingUser.firstName,
        lastName: lastName || existingUser.lastName,
        email : email || existingUser.email,
        photo: photo || existingUser.photo
    }).lean();
    res.json({ user });
};

const register = async (req, res) => {
    const { firstName, lastName, email, id: userId, password, photo, orgId } = req.body
    try {
        if (!validateId(userId)) {
            throw new Error("Id is not valid, please use numbers.");
        }

        const data = { userId, firstName, lastName, email, password, photo, orgId };

        const emailCheck = await User.findOne({ email });
        if (emailCheck) throw new Error("Email already exists");

        const userIdCheck = await User.findOne({ userId });
        if (userIdCheck)  throw new Error("User ID already exists");

        const user = await createUser(data)
        res.json({ user });

    } catch (error) {
        console.log('Error inserting user:', error);
        res.status(500).send({ error: error.toString() });
    }
};


const logout = async (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).send({ message: 'Logged out successfully' });
};

const login = async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Missing required fields: username and password' });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password })

        if (!user) throw new Error("This user does not exists");
        const { firstName, lastName, photo, userId, orgId } = user.toObject();
        const userObject = { email, firstName, lastName, photo, userId, orgId };
        const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)});
        res.send({ user: userObject })
    }
    catch (error) {
        console.log("error", error)
        res.status(400).send({ error: error.toString() });
    }

};

module.exports = {
    login,
    logout,
    register,
    getUser,
    editUser
}
