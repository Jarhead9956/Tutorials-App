const { User } = require('../models');
const { cookie } = require('../config')
const { jwt, formValidator } = require('../utils');


module.exports = {
    get: {
        register(req, res, next) {
            res.render('./user/register.hbs');
        },

        login(req, res, next) {
            res.render('./user/login.hbs');
        },
        
        logout(req, res, next) {
            res
                .clearCookie(cookie)
                .redirect('/home')
        }
    },

    post: {
        register(req, res, next) {

            const formVAlidations = formValidator(req);
            if(!formVAlidations.isOk) {
                res.render('./user/register.hbs', formVAlidations.contexOptions);
                return;
            }

            const { username, password} = req.body;

            User
                .findOne({username})
                .then((user) => {
                    if(user) {
                        throw new Error('Username already exsist...');
                    }

                    return User.create({username, password });
                })
                .then((createdUSer) => {
                    const token = jwt.cteateToken(createdUSer._id);
                    
                    res
                        .status(200)
                        .cookie(cookie, token, { maxAge: 3600000})
                        .redirect('/home')
                })
                .catch((e) => {
                    console.log(e)
                    res.render('./user/register.hbs',  {message: e} );
                })
        },

        login(req, res, next) {

            const formVAlidations = formValidator(req);
            if(!formVAlidations.isOk) {
                res.render('./user/login.hbs', formVAlidations.contexOptions);
                return;
            }

            const { username, password} = req.body;

            User
                .findOne({ username })
                .then((user) => {
                    return Promise.all([
                        user.comparePasswords(password),
                        user
                    ]);
                })
                .then(([isPasswordsMached, user]) => {
                    if(!isPasswordsMached) {
                        throw new Error('The provided password does not matched.');
                    }

                    const token = jwt.cteateToken(user._id);
                    
                    res
                        .status(200)
                        .cookie(cookie, token, { maxAge: 3600000})
                        .redirect('/home')

                })
                .catch((e) => {
                    console.log(e);
                    res.render('./user/login.hbs',  {message: e} );
                })
        }
    }
}