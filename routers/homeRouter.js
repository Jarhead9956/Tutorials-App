const { homeController } = require('../controllers');
//const { isAuthNeededMiddleware } = require('../utils');

module.exports = (router) => {
    router.get('/', homeController.get.home);

    router.post('/search', homeController.post.search);

    return router;
};