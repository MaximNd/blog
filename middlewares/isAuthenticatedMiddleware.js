module.exports = {
    isAuthenticated(req, res, next) {
        if (typeof req.user === 'undefined') return res.redirect('/sign-in');
        if (req.user.role === 'admin' || req.user.role === 'user') return next();
        return res.redirect('/');
    }
};