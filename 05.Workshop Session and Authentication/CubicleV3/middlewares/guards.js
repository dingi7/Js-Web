const { getById } = require('../services/cube')

function isAuth(){
    return (req, res, next) => {
        if (req.user != undefined) {
            next();
        } else {
            res.redirect('/users/login');
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (req.user == undefined) {
            next();
        } else {
            res.redirect('/cubes');
        }
    };
}

function isOwner() {
    return async (req, res, next) => {
        const cube = await getById(req.params.id);
        if (cube && req.user && (cube.creatorId == req.user._id)) {
            next();
        } else {
            res.redirect('/users/login');
        }
    };
}

module.exports = {
    isAuth,
    isGuest,
    isOwner
};