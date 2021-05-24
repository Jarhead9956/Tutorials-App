const jwt = require('./jwt');
const auth = require('./auth');
const registerMiddlewareValidator = require('./registerMiddlewareValidator');
const loginMiddlewareVAlidator = require('./loginMiddlewareValidaror');
const createCourseMiddlewareValidator = require('./createCourseMiddlewareValidator');
const formValidator = require('./formValidator');
const isAuthNeededMiddleware = require('./isAuthNeededMiddleware');

module.exports = {
    jwt,
    auth,
    registerMiddlewareValidator,
    loginMiddlewareVAlidator,
    createCourseMiddlewareValidator,
    formValidator,
    isAuthNeededMiddleware
}