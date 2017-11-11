const Category = require('./../models/category');

module.exports = {
    allCategories(req, res, next) {
        Category.find()
            .then(categories => { res.categories = categories; return next(); });
    },
    addCategory(req, res) {
        let category = new Category({
            name: req.body.name
        });

        category.save(err => {
            if (err) return res.send({ message: 'error', error: err });

            res.redirect('/admin/categories');
        });
    },
    updateCategory(req, res) {
        Category.update({ _id: req.params.id }, { name: req.body.name }).exec((err, data) => {
            if (err) return res.status(500).send(err);
            
            res.redirect('/admin/categories');
        });
    },
    deleteCategory(req, res) {
        Category.remove({ _id: req.params.id }, (err) => {
            if (err) return handleError(err);
            
            res.redirect('/admin/categories');
          });
    }
};