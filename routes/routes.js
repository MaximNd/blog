const passport = require('passport');
const fileUpload = require('express-fileupload');
const User = require('./../models/user');
const AdminMiddleware = require('./../middlewares/adminMiddleware');
const isAuthMiddleware = require('./../middlewares/isAuthenticatedMiddleware');
const UsersController = require('./../controllers/users_controller');
const PostsController = require('./../controllers/posts_controller');
const CategoriesController = require('./../controllers/categories_controller');
const CommentsController = require('./../controllers/comments_controller');
const LivesController = require('./../controllers/lives_controller');

module.exports = (app) => {
    app.get('/', PostsController.getPosts, (req, res) => {
        // console.log('User: ', req.user);
        User.find({ role: 'admin' }).then(admin => {
            res.render('index', { admin: admin[0], user: req.user, posts: res.posts, currentPage: res.currentPage, pageCount: 3 });
        });
    });
    
    app.get('/post/:id', PostsController.getPost, (req, res) => {
        res.render('post', { user: req.user, post: res.post[0] });
    });
    
    app.get('/register', (req, res) => {
        if (typeof req.user !== 'undefined') return res.redirect('/');
        res.render('register');
    });
    
    app.get('/sign-in', (req, res) => {
        if (typeof req.user !== 'undefined') return res.redirect('/');
        res.render('login');
    });
    
    app.get('/FAQ', (req, res) => {
        res.render('F_A_Q', { user: req.user });
    });
    
    app.get('/live', LivesController.getMessages, (req, res) => {
        res.render('live', { user: req.user, messages: res.messages });
    });
    
    app.get('/admin', AdminMiddleware.isAdmin, (req, res) => {
        res.render('admin/admin', { user: req.user });
    });
    
    app.get('/admin/categories', AdminMiddleware.isAdmin, CategoriesController.allCategories, (req, res) => {
        // console.log("categories: ", res.categories);
        res.render('admin/admin-categories', { categories: res.categories});
    });
    
    app.get('/admin/posts', AdminMiddleware.isAdmin, CategoriesController.allCategories, PostsController.getPosts, (req, res) => {
        res.render('admin/admin-posts', { categories: res.categories, posts: res.posts, currentPage: res.currentPage, pageCount: 3   });
    });
    
    app.get('/admin/post/:id/edit', AdminMiddleware.isAdmin, CategoriesController.allCategories, PostsController.getPost, (req, res) => {
        res.render('admin/admin-post-edit', { categories: res.categories, post: res.post[0] });
    });

    app.get('/posts/search', PostsController.searchByTag);

    //User
    app.post('/register', fileUpload(), UsersController.register);
    app.post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/sign-in', // see text
            failureFlash: false // optional, see text as well
        }), UsersController.login);
    app.get('/logout', UsersController.logout);
    app.post('/update/user/:id', AdminMiddleware.isAdmin, fileUpload(), UsersController.updateUser);

    //Post
    app.post('/post', AdminMiddleware.isAdmin, fileUpload(), PostsController.createPost);
    app.put('/post/:id', PostsController.updatePost);
    app.post('/delete/post/:id', AdminMiddleware.isAdmin, PostsController.deletePost);

    //Category
    app.get('/categories', AdminMiddleware.isAdmin, CategoriesController.allCategories);
    app.post('/category', AdminMiddleware.isAdmin, CategoriesController.addCategory);
    app.post('/update/category/:id', AdminMiddleware.isAdmin, CategoriesController.updateCategory);
    app.post('/delete/category/:id', AdminMiddleware.isAdmin, CategoriesController.deleteCategory);

    //Comment
    app.get('/comments/post/:post_id', CommentsController.getCommentsByPostId);
    app.post('/comment', isAuthMiddleware.isAuthenticated, CommentsController.createComment);
};