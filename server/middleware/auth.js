
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../consts');

const authenticateToken = (req, res, next) => {
    const token = req.headers?.cookie?.split('=')?.[1]

    if (!token) {
      return res.sendStatus(401); // unauthorized if no token provided
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (e) {
        console.error('JWT verification error:', e);
        return res.sendStatus(403);
    }
  };

module.exports = {
    authenticateToken
}
