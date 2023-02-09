function isAuth() {
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
        const trip = await req.storage.getTripById(req.params.id);
        if (trip && req.user && trip.owner._id == req.user._id) {
            next();
        } else {
            res.redirect('/');
        }
    };
}

function isNotOwner() {
    return async (req, res, next) => {
        const trip = await req.storage.getTripById(req.params.id);
        if (trip && req.user && trip.owner._id == req.user._id) {
            res.redirect('/');
        } else {
            next();
        }
    };
}

function isNotBuddy() {
    return async (req, res, next) => {
        const trip = await req.storage.getTripById(req.params.id);
        if (trip.buddies !== undefined) {
            if (trip.buddies.includes(req.user._id)) {
                res.redirect('404');
            }
        }
        if (trip.seats <= 0) {
            res.redirect('404');
        } else {
            next();
        }
    };
}

/*
###############################
###############################
##### BONUS FUNCTIONALITY #####
###############################
###############################


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
*/

module.exports = {
    isAuth,
    isGuest,
    isOwner,
    isNotOwner,
    isNotBuddy
    // isNotBid,
    // anyBids
};
