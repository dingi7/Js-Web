const router = require('express').Router();
const guard = require('../middlewares/guards');

router.get('/', async (req, res) => {
    const auctions = await req.storage.getAuctions();
    res.render('browse', { title: 'Browse', auctions });
});

router.get('/create', guard.isAuth(), (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', guard.isAuth(), async (req, res) => {
    const user = await req.auth.findUser(req.user.email);
    if (!req.body.title || !req.body.description || !req.body.category) {
        return res.render('create', {
            title: 'Create',
            error: 'All fields are required!',
        });
    }
    const auction = {
        title: req.body.title,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        owner: user,
    };
    try {
        const savedAuction = await req.storage.createAuction(auction);
        return res.redirect('/products/details/' + savedAuction._id);
    } catch (err) {
        return res.render('create', { title: 'Create', error: err });
    }
});

router.get('/details/:id', async (req, res) => {
    let owner = false;
    let isBid = false;
    const auction = await req.storage.getAuctionById(req.params.id);
    if (!auction) {
        res.redirect('/404');
    }
    if (req.user) {
        const ownerId = JSON.stringify(auction.owner);
        if (JSON.parse(ownerId)._id == req.user._id) {
            owner = true;
        }
        if (auction.bidder !== undefined) {
            if (auction.bidder._id.toString() == req.user._id) {
                isBid = true;
            }
        }
        console.log(owner, isBid);
    }
    res.render('details', {
        title: 'Details',
        auction,
        owner,
        isBid,
    });
});

router.post(
    '/bid/:id',
    guard.isAuth(),
    guard.isNotOwner(),
    guard.isNotBid(),
    async (req, res, next) => {
        console.log('in');
        const user = await req.auth.findUser(req.user.email);
        try {
            await req.storage.bid(req.params.id, user, req.body.amount);
        } catch (err) {
            console.log(err);
        }
        res.redirect(`/products/details/${req.params.id}`);
    }
);

router.get('/delete/:id', guard.isOwner(), async (req, res, next) => {
    await req.storage.deleteAuction(req.params.id);
    res.redirect('/products');
});

router.get('/edit/:id', guard.isOwner(), async (req, res, next) => {
    const auction = await req.storage.getAuctionById(req.params.id);
    if(!auction){
        res.redirect('/404')
    }
    res.render('edit', {title: 'Edit', auction})
});

router.post('/edit/:id', guard.isOwner(), async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.category) {
        return res.render('details', {
            title: 'Details',
            error: 'All fields are required!',
        });
    }
    const auction = {
        title: req.body.title,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
    };
    try {
        const savedAuction = await req.storage.edit(req.params.id, auction);
        return res.redirect('/products/details/' + savedAuction._id);
    } catch (err) {
        return res.render('details', { title: 'Details', error: err });
    }
});

router.get('/close/:id', guard.isOwner(), guard.anyBids(), async (req, res, next) => {
    const auction = await req.storage.closeAuction(req.params.id)
    await req.auth.pushAuction(auction, req.user._id)
    res.redirect('/auth/closed');
});

module.exports = router;
