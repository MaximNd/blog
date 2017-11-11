const Post = require('./../models/post');
const uniqid = require('uniqid');

module.exports = {
    getPost(req, res, next) {
        Post.find({ _id: req.params.id }).populate('category')
            .then(post => { res.post = post; return next(); });
    },
    getPosts(req, res, next) {
        let skip = 0;
        console.log('Rpage: ', req.query.page);
        // if (typeof req.query.page !== 'undefined') {
        if (parseInt(req.query.page) !== 1) {
            skip = (req.query.page - 1) || 0;
        }
        console.log('Skip: ', skip);
        // }
        let limit = 2;
        let currentPage = (skip === 0) ? 1 : skip + 1;
        Post.find().sort({ _id: -1 }).populate('category').skip(skip * limit).limit(limit)
            .then(posts => { res.posts = posts; res.currentPage = currentPage; return next(); });
    },
    searchByTag(req, res) {
        let skip = 0;
        if (parseInt(req.query.page) !== 1) {
            skip = (req.query.page - 1) || 0;
        }
        let limit = 2;
        let currentPage = (skip === 0) ? 1 : skip + 1;
        Post.find({ tags: new RegExp('^' + req.query.tag + '$') }).sort({ _id: -1 }).populate('category')
            .then(posts => res.render('post-search', { user: req.user, posts, currentPage, pageCount: 3, tag: req.query.tag }));
    },
    createPost(req, res, next) {
        const imageName = uniqid('image-') + req.files.image.name;
        req.files.image.mv(`${__dirname}/../static/images/${imageName}`, (err) => {
            if (err) return res.status(500).send(err);

            let post = new Post({
                title: req.body.title,
                category: req.body.category,
                text: req.body.text,
                tags: JSON.parse(req.body.tags),
                image: imageName,
                uploaded: Date.now()
            });

            post.save();
            res.redirect('/admin/posts');
        });
    },
    updatePost(req, res) {
        Post.update({ _id: req.params.id }, req.body.doc).exec((err, data) => {
            if (err) return res.status(500).send(err);
            
            res.send(data);
        });
    },
    deletePost(req, res) {
        Post.remove({ _id: req.params.id }, (err) => {
            if (err) return handleError(err);
            
            res.redirect('/admin/posts');
          });
    }
};