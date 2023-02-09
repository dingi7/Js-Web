const router = require('express').Router();
const guard = require('../middlewares/guards')

router.get('/create', guard.isAuth(), (req, res, next) => {
    res.render('createAccessory', { title: 'Create Accessory' });
});

router.post('/create', guard.isAuth(), async (req, res, next) => {
    const acc = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: req.body.difficulty,
        // "cubes": req.params.id
    };
    try {
        await req.storage.createAcc(acc);
    } catch (err) {
        return res.render('createAccessory', {
            title: 'Create Accessory',
            error: err.name,
        });
    }

    res.redirect('/');
});

router.get('/attach/:id', guard.isAuth(), async (req, res, next) => {
    try {
        const cube = await req.storage.getById(req.params.id);
        const accessories = await req.storage.getAllAccessories(
            cube.accessories.map((a) => a._id)
        );
        res.render('attachAccessory', { title: 'Attach', cube, accessories });
    } catch (err) {
        console.log(err);
    }
});

router.post('/attach/:id', guard.isAuth(), async (req, res, next) => {
    const accessoryId = req.body.accessory;
    const cubeId = req.params.id;
    console.log('AttachingAccessory to cube');
    try {
        await req.storage.attachAccessory(cubeId, accessoryId);
        res.redirect(`/cubes/details/${cubeId}`);
    } catch (err) {
        res.redirect('/404');
        return console.log(err);
    }
});

module.exports = router;