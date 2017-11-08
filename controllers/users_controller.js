const passport = require('passport');
const User = require('./../models/user');

const uniqid = require('uniqid');

module.exports = {
    register(req, res) {
        const imageName = uniqid('image-') + req.files.image.name;
        req.files.image.mv(`${__dirname}/../static/images/${imageName}`, (err) => {
            if (err) return res.status(500).send(err);
            
            // console.log(User.authenticate());

            User.register(new User({ fullName: req.body.fullName, email: req.body.email, image: imageName }), req.body.password, function(err, user) {
                if (err) {
                    console.log(err);
                    return res.render('register', { user });
                }
                // passport.authenticate('local', { failureRedirect: '/' }),
                // function(req, res, next) {
                //   res.redirect('/');
                // }
                // passport.authenticate('local', { successRedirect: '/', failureRedirect: '/register' })
                res.redirect('/');
                // (req, res, () => {
                //     req.session.save((err) => {
                //         if (err) {
                //             return next(err);
                //         }
                //         res.render('/');
                //     });
                // });
            });


            // let user = new User({
            //     fullName: req.body.fullName,
            //     email: req.body.email,
            //     password: req.body.password,
            //     image: imageName
            // });
            // user.save(err => {
            //     if (err) return res.status(500).send(err);

            //     res.render('register');
            // });
        });
    },
    login(req, res) {
        res.redirect('/');
    }
};