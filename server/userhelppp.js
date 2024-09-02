const { jwtSecret } = require('../consts');
const jwt = require('jsonwebtoken');
const { verifyUserData, getUserByUsername, createUser } = require('../services/users');

// login
const login = async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Missing required fields: username and password' });
    }

    const { username, password } = req.body;
    try {
        // Check if the user exists in the database
        const user = await verifyUserData(username, password);
        if (!user) {
            return res.status(404).json({ error: 'User not found or password is incorrect' });
        }
        const token = jwt.sign({ username }, jwtSecret);
        res.send(token);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// register new user
const register = async (req, res) => {
    try {
        if (!req.body || !req.body.username || !req.body.displayName || !req.body.password ) {
            return res.status(400).json({ error: 'Missing required fields: username, displayName or password' });
        }
        // Check if the user exists in the database
        const user = await getUserByUsername(req.body.username);
        if (user) {
            return res.status(409).json({ error: 'User already exists' });
        }
        const newUser = await createUser(req.body);
        if (!newUser) {
            return res.status(400).json({ error: 'User while creating user.' });
        }
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get user data
const getUserData = async (req, res) => {
    const id = req.params.id;
    const token = req.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await getUserByUsername(decoded.username);
        // the requested data does not belongs to the current user
        if (user.id === id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.json(user);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUserData, register, login }
