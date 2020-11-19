exports.isUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('danger', 'Please log in first.');
        res.redirect('/users/login');
    }
}

exports.isAdmin = function(req, res, next) {
    if (req.isAuthenticated() && req.user.admin == 1) {
        next();
    } else {
        req.flash('danger', 'Please log in as admin.');
        res.redirect('/users/login');
    }
}

exports.NotAdmin = function(req, res, next) {
    if (req.isAuthenticated() && req.user.admin !== 1) {
        next();
    } else {
        req.flash('danger', 'You can not access this page!');
        res.redirect('/');
    }
}