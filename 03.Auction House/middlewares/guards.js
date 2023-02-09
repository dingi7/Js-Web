function isAuth(){
    return (req, res, next) => {
        if (req.user != undefined) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (req.user == undefined) {
            next();
        } else {
            res.redirect('/');
        }
    };
}

function isOwner() {
    return async (req, res, next) => {
        const auction = await req.storage.getAuctionById(req.params.id);
        if (auction && req.user && (auction.owner._id == req.user._id)) {
            next()
        } else {
            res.redirect('/')
        }
    };
}

function isNotOwner() {
    return async (req, res, next) => {
        const auction = await req.storage.getAuctionById(req.params.id);
        if (auction && req.user && (auction.owner._id == req.user._id)) {
            res.redirect('/')
        } else {
            next()
        }
    };
}

function isNotBid(){
    return async (req,res,next) => {
        const auction = await req.storage.getAuctionById(req.params.id);
        if (auction.bidder && req.user && (auction.bidder._id == req.user._id) || (auction.price >= req.body.amount)) {
            res.render('details', {title: "Details", error: "Some error accured", auction})
        } else {
            next()
        }
    }
}

function anyBids(){
    return async (req,res,next) => {
        const auction = await req.storage.getAuctionById(req.params.id);
        if (!auction.bidder) {
            res.render('details', {title: "Details", error: "Some error accured", auction})
        } else {
            next()
        }
    }
}

module.exports = {
    isAuth,
    isGuest,
    isOwner,
    isNotOwner,
    isNotBid,
    anyBids
};