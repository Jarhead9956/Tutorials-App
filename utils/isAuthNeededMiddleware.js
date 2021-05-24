module.exports = (isAuthNeeded = false) => {
    return (req, res, next) => {
        const isNotAuthWhenIsNeeded = !req.user && isAuthNeeded;
        const isAuthWenIsNotNeeded = req.user && !isAuthNeeded;

        if(isNotAuthWhenIsNeeded || isAuthWenIsNotNeeded) {
            const redirectPage = isNotAuthWhenIsNeeded ? '/user/login' : '/home';
            res.redirect(redirectPage);
            return;
        }

        next();
    };
};