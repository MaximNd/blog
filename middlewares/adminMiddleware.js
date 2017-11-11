module.exports = {
    isAdmin(req, res, next) {
        if (typeof req.user === 'undefined') return res.redirect('/sign-in');
        if (req.user.role === 'admin') return next();
        return res.redirect('/');
    }
};