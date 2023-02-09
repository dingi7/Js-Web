const router = require('express').Router();
const guard = require('../middlewares/guards')

router.get('/', async (req, res) => {
    console.log(req.user);
    const cubes = await req.storage.getAll(req.query);
    const search = req.query.search || '';
    const from = req.query.from || '';
    const to = req.query.to || '';
    const ctx = {
        title: 'Browse cubes',
        cubes,
        search,
        from,
        to,
    };
    res.render('index', ctx);
});

router.get('/create', guard.isAuth(), (req,res) => {
    res.render('create', {title: 'Create cube'})
})

router.post('/create', guard.isAuth(), async (req,res) => {
    if(!req.user){
        return
    }
    const cube = {
        "name": req.body.name,
        "description": req.body.description,
        "imageUrl": req.body.imageUrl,
        "difficulty": req.body.difficulty,
        "creatorId": req.user._id
    }

    await req.storage.create(cube)

    res.redirect('/')
})

router.get("/details/:id", async (req, res) => {
    const id = req.params.id;
    const cube = await req.storage.getById(id);
    if (!cube) {
        return res.redirect('/404');
    }
    const ctx = {
        title: 'Details',
        cube,
        accessories: cube.accessories
    };
    res.render('details', ctx);
})

router.get("/edit/:id", guard.isOwner(), async (req, res) => {
    const cube = await req.storage.getById(req.params.id);
    if (!cube) {
        return res.redirect('/404');
    }
    const ctx = {
        title: 'Edit',
        cube,
    };

    res.render('edit', ctx);
})

router.post("/edit/:id", guard.isOwner(), async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: req.body.difficulty,
    };
    await req.storage.edit(req.params.id, cube);

    res.redirect('/details/' + req.params.id);
})

module.exports = router;