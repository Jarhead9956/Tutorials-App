const { body } = require('express-validator');

module.exports = [
    body('title', 'Message:	The title should be at least 4 characters').isLength({ min: 4 }),
    body('description', 'Message: The description should be at least 20 characters long').isLength({ min: 20 }),
    body('imageUrl', 'Message: The imageUrl should starts with http or https').matches(/^(http|https)/),
    body('duration', 'Message: Duration is requared...').isLength({ min: 1})
];
