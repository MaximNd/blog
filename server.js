const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const LivesController = require('./controllers/lives_controller');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// const fileUpload = require('express-fileupload');
const routes = require('./routes/routes.js');

const app = express();
const server = http.createServer(app);


app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'favbjadbfjgdbvjbvasjfvasdhkvfshdgzvgjs',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/user');
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// app.use(express.static(path.join(__dirname, 'public')));

const io = socketIO(server);

io.on('connection', socket => {
    console.log('User connected');

    socket.on('createMessage', newMessage => {
        LivesController.createMessage(newMessage)
            .then(data => data)
            .then(message => socket.emit('newMessage', message))
            .catch(err => console.error('error: ', err));
        // console.log('NewMessage: ', newMessage);
        // socket.emit('newMessage', { data: 'data', message: 'ok'});
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

const connection = mongoose.connect('mongodb://localhost:27017/blog', {
    useMongoClient: true
  }).then(function(){
    console.log('connected to DB!!!!');
}, function(err) {
    console.error(err);
});

routes(app);
// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.get('/post/:id', (req, res) => {
//     res.render('post', { id: req.params.id });
// });

// app.get('/register', (req, res) => {
//     res.render('register');
// });

// app.get('/sign-in', (req, res) => {
//     res.render('login');
// });

// app.get('/FAQ', (req, res) => {
//     res.render('F_A_Q');
// });

// app.get('/live', (req, res) => {
//     res.render('live');
// });

// app.get('/admin', (req, res) => {
//     res.render('admin/admin');
// });

// app.get('/admin/categories', (req, res) => {
//     res.render('admin/admin-categories');
// });

// app.get('/admin/posts', (req, res) => {
//     res.render('admin/admin-posts');
// });

// app.get('/admin/post/:id/edit', (req, res) => {
//     res.render('admin/admin-post-edit', { id: req.params.id });
// });

// app.get('/admin/translation', (req, res) => {
//     res.render('admin/admin-translation');
// });

server.listen(3000);