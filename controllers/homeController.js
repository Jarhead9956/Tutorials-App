const { Course } = require('../models');

module.exports = {
    get: {
        home(req, res, next) {

            if(!req.user) {
                Course.find()
                .lean()
                .then((courses) => {
                    let sortedCourse = courses
                                            .sort((a, b) => b.usersEnroled.length - a.usersEnroled.length)
                                            .slice(0, 3);
                    
                    res.render('./home/guestHome.hbs',  { sortedCourse } );
                })
                .catch((e) => console.error(e));

                return;
            }

            Course.find()
            .lean()
            .then((courses) => {
                let sortedCourse = [];

                for (let i = courses.length - 1; i >= 0; i--) {
                   sortedCourse.push(courses[i]);
                }
                
                res.render('./home/userHome.hbs',  { sortedCourse } );
            })
            .catch((e) => console.error(e));
        },
        
    },

    post: {
        search(req, res, next) {
            const { searchTarget } = req.body;

            Course.find()
            .lean()
            .then((courses) => {
                let sortedCourse = [];

                courses.forEach(course => {
                    
                    if(course.title.toLowerCase().includes(searchTarget.toLowerCase())) {
                        sortedCourse.push(course);
                    }
                });
                res.render('./home/userHome.hbs',  { sortedCourse } );
            })
            .catch((e) => console.error(e));
            
        }
    }
}