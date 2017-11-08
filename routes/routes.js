const passport = require('passport');
const fileUpload = require('express-fileupload');
const UsersController = require('./../controllers/users_controller');

module.exports = (app) => {
    app.get('/', (req, res) => {
        console.log('User: ', req.user);
        res.render('index');
    });
    
    app.get('/post/:id', (req, res) => {
        res.render('post', { id: req.params.id });
    });
    
    app.get('/register', (req, res) => {
        res.render('register');
    });
    
    app.get('/sign-in', (req, res) => {
        res.render('login');
    });
    
    app.get('/FAQ', (req, res) => {
        res.render('F_A_Q');
    });
    
    app.get('/live', (req, res) => {
        res.render('live');
    });
    
    app.get('/admin', (req, res) => {
        res.render('admin/admin');
    });
    
    app.get('/admin/categories', (req, res) => {
        res.render('admin/admin-categories');
    });
    
    app.get('/admin/posts', (req, res) => {
        res.render('admin/admin-posts');
    });
    
    app.get('/admin/post/:id/edit', (req, res) => {
        res.render('admin/admin-post-edit', { id: req.params.id });
    });
    
    app.get('/admin/translation', (req, res) => {
        res.render('admin/admin-translation');
    });

    app.post('/register', fileUpload(), UsersController.register);
    app.post('/login', passport.authenticate('local'), UsersController.login);
};