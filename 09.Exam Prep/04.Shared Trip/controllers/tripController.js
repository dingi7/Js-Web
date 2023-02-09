const router = require('express').Router();
const guard = require('../middlewares/guards');

router.get('/', async (req, res) => {
    const trips = await req.storage.getTrips();
    res.render('shared-trips', { title: 'Shared Trips', trips });
});

router.get('/create', guard.isAuth(), (req, res) => {
    res.render('trip-create', { title: 'Create trip' });
});

router.post('/create', guard.isAuth(), async (req, res) => {
    const user = await req.auth.findUser(req.user.email);
    if (!req.body.startPoint || !req.body.endPoint || !req.body.date || !req.body.time || !req.body.carImage || !req.body.carBrand || !req.body.seats || !req.body.price || !req.body.description) {
        return res.render('trip-create', {
            title: 'Create trip',
            error: 'All fields are required!',
        });
    }
    const trip = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
        owner: user,
    };
    try {
        const savedTrip = await req.storage.createTrip(trip, user);
        return res.redirect('/trips/details/' + savedTrip._id);
    } catch (err) {
        return res.render('trip-create', { title: 'Create trip', error: err });
    }
});

router.get('/details/:id', async (req, res) => {
    const trip = await req.storage.getTripById(req.params.id);
    let owner = false;
    let availSeats = trip.seats >= 1
    let isBuddy = false;
    if (!trip) {
        res.redirect('/404');
    }
    if (req.user) {
        if (trip.owner._id == req.user._id) {
            owner = true;
        }
        if (trip.buddies !== undefined) {
            if (trip.buddies.find(b => b._id == req.user._id)) {
                isBuddy = true;
            }
        }
    }
    res.render('trip-details', {
        title: 'Details',
        trip,
        owner,
        isBuddy,
        availSeats
    });
});

router.get('/delete/:id', guard.isOwner(), async (req, res, next) => {
    await req.storage.deleteTrip(req.params.id);
    res.redirect('/trips/');
});

router.get('/edit/:id', guard.isOwner(), async (req, res, next) => {
    const trip = await req.storage.getTripById(req.params.id);
    if (!trip) {
        res.redirect('/404');
    }
    res.render('trip-edit', { title: 'Edit', trip });
});

router.post('/edit/:id', guard.isOwner(), async (req, res) => {
    if (!req.body.startPoint || !req.body.endPoint || !req.body.date || !req.body.time || !req.body.carImage || !req.body.carBrand || !req.body.seats || !req.body.price || !req.body.description) {
        return res.render('trip-edit', {
            title: 'Edit',
            error: 'All fields are required!',
        });
    }
    const trip = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
    };
    try {
        const savedTrip = await req.storage.edit(req.params.id, trip);
        return res.redirect('/trips/details/' + savedTrip._id);
    } catch (err) {
        return res.render('trip-edit', { title: 'Edit', error: err });
    }
});

router.get('/join/:id', guard.isAuth(), guard.isNotBuddy(), async(req,res)=>{
    const user = await req.auth.findUser(req.user.email);
    await req.storage.joinTrip(req.params.id, user)
    res.redirect('/details/' + req.params.id)
})

/*
###############################
###############################
##### BONUS FUNCTIONALITY #####
###############################
###############################

router.get(
    '/close/:id',
    guard.isOwner(),
    guard.anyBids(),
    async (req, res, next) => {
        const auction = await req.storage.closeAuction(req.params.id);
        await req.auth.pushAuction(auction, req.user._id);
        res.redirect('/auth/closed');
    }
);

router.post(
    '/bid/:id',
    guard.isAuth(),
    guard.isNotOwner(),
    guard.isNotBid(),
    async (req, res, next) => {
        const user = await req.auth.findUser(req.user.email);
        try {
            await req.storage.bid(req.params.id, user, req.body.amount);
        } catch (err) {
            res.render('details', { title: 'Details', error: err });
        }
        res.redirect(`/products/details/${req.params.id}`);
    }
);
*/

module.exports = router;
