const { courseController } = require('../controllers');
const { createCourseMiddlewareValidator, isAuthNeededMiddleware } = require('../utils');

module.exports = (router) => {
    router.get('/create', courseController.get.create);
    router.get('/details/:courseId', isAuthNeededMiddleware(true), courseController.get.details);
    router.get('/delete/:courseId', isAuthNeededMiddleware(true), courseController.get.delete);
    router.get('/edit/:courseId', isAuthNeededMiddleware(true), courseController.get.edit);
    router.get('/enroll/:courseId', isAuthNeededMiddleware(true), courseController.get.enroll);

    router.post('/create', createCourseMiddlewareValidator, courseController.post.create);
    router.post('/edit/:courseId', createCourseMiddlewareValidator, courseController.post.edit);

    return router;
}