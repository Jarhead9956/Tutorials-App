const { body } = require('express-validator');

module.exports = [
    body('username', 'Message:	The username should be at least 5 characters long and should consist only english letters and digits').isLength({ min: 5 }).matches(/^[A-Za-z0-9_]+$/),
    body('password', 'Message: The password should be at least 4 characters long and should consist only english letters and digits').isLength({ min: 4 }).matches(/^[A-Za-z0-9_]+$/),
];

