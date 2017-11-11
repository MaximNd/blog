const passport = require('passport');
const User = require('./../models/user');

const uniqid = require('uniqid');

module.exports = {
    register(req, res) {
        const imageName = uniqid('image-') + req.files.image.name;
        req.files.image.mv(`${__dirname}/../static/images/${imageName}`, (err) => {
            if (err) return res.status(500).send(err);

            User.register(new User({ fullName: req.body.fullName, email: req.body.email, role: 'user', image: imageName }), req.body.password, function(err, user) {
                if (err) {
                    console.log(err);
                    return res.render('register', { user });
                }
                res.redirect('/sign-in');
            });
        });
    },

    login(req, res) {
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    },

    logout(req, res) {
        req.logout();
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    },

    updateUser(req, res) {
        let newUser = {
            fullName: req.body.fullName,
            info: req.body.info,
            email: req.body.email,
            status: req.body.status
        }

        function _updateUser() {
            function __updateUser() {
                User.update({ _id: req.params.id }, newUser).exec((err, data) => {
                    if (err) return res.status(500).send(err);
                    
                    res.redirect('/admin');
                });;
            }

            if (req.body.oldPassword !== '' && req.body.newPassword !== '') {
                // console.log(User.schema.methods.changePassword);
                return req.user.changePassword(req.body.oldPassword, req.body.newPassword, __updateUser);
            } else {
                return __updateUser();
            }
        }

        if (!(Object.keys(req.files).length === 0 && req.files.constructor === Object)) {
            const imageName = uniqid('image-') + req.files.image.name;
            req.files.image.mv(`${__dirname}/../static/images/${imageName}`, (err) => {
                if (err) return res.status(500).send(err);
                
                newUser.image = imageName;
                return _updateUser();
            });
        } else {
            return _updateUser();
        }
        // User.changePassword()
    }
};