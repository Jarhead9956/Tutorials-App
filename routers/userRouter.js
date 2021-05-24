const { userController } = require('../controllers');
const { registerMiddlewareValidator, loginMiddlewareVAlidator } = require('../utils');
const { isAuthNeededMiddleware } = require('../utils');

module.exports = (router) => {
    router.get('/login', isAuthNeededMiddleware(), userController.get.login);
    router.get('/register', isAuthNeededMiddleware(), userController.get.register);
    router.get('/logout', userController.get.logout);

    router.post('/register', registerMiddlewareValidator, userController.post.register);
    router.post('/login', loginMiddlewareVAlidator, userController.post.login);

    return router;
};