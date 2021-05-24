const { Course, User } = require('../models');
const { formValidator } = require('../utils');

module.exports = {
    get: {
        create(req, res, next) {
            if(!req.user){
                res.redirect('/user/login');
                return;
            }
            res.render('./course/create.hbs');
        },

        details(req, res, next) {
            const userId = req.user._id;
            
            Course
            .findOne({ _id: req.params.courseId})
            //.lean()
            .populate('usersEnroled')
            .then((course) => {
                let isCreator = false;
                
                if(String( userId ) === String( course.courseCreator )){
                    isCreator = true;
                }

                course.usersEnroled.forEach( user => {
                    if(String( userId ) === String( user._id )){
                        res.locals.enrolled = true;
                    }    
                });

                res.locals.isCreator = isCreator;
                res.render('./course/details.hbs', course );
            })

        },

        edit(req, res, next) {

            Course
                .findOne({ _id: req.params.courseId})
                .then((course) => {
                    res.render('./course/edit.hbs', course);        
                })

            
        },

        delete(req, res, next) {
            Course
                .deleteOne({ _id: req.params.courseId })
                .then((result) => {
                    res.redirect('/home');
                })
        },

        enroll(req, res, next) {
            const { courseId } = req.params
            const enrolled = true;


            Course
                .findById({ _id: courseId})
                .then((course) => {
                    const user = req.user._id
                    
                    course.usersEnroled.push(user);
                    course.save()
                    
                    res.locals.enrolled = true;
                    
                    res.render(`./course/details.hbs`, course );
                })
                .catch((e) => console.log(e));
        }
    },

    post: {
        create(req, res, naext) {

            const formVAlidations = formValidator(req);
            if(!formVAlidations.isOk) {
                res.render('./course/create.hbs', formVAlidations.contexOptions);
                return;
            }

            //Formating date!!!
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let formatingDate = `${day}/${month}/${year}`;
            
            Course.create({ ...req.body, courseCreator: req.user._id, createdAt: formatingDate })
            .then((createdCourse) => {
                res.redirect('/home');
            })
        },

        edit(req, res, next) {
            const { courseId } = req.params;

            const formVAlidations = formValidator(req);
            if(!formVAlidations.isOk) {
                const output = formVAlidations.contexOptions;
                output._id =  courseId;
                res.render('./course/edit.hbs', output );
                return;
            }

            //console.log(courseId)
            Course
                .updateOne({ _id: courseId}, { $set: { ...req.body }})
                .then((updatedShoe) => {
                    res.redirect(`/course/details/${courseId}`);
                })
        }
    }
}