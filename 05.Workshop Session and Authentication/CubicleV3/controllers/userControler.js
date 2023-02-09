const router = require('express').Router();
const guard = require('../middlewares/guards')

router.get('/register', guard.isGuest(), (req, res, next) => {
    res.render('register');
})

router.post('/register', guard.isGuest(), async (req, res, next) => {
    if(!req.body.username || !req.body.password || !req.body.repeatPassword || req.body.password !== req.body.repeatPassword){
        return
    }
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    console.log(req.auth)
    try{
    await req.auth.register(user)
    }catch(err){
        return console.log(err);
    }

    res.redirect('/users/login')
});

router.get('/login', guard.isGuest(), (req, res, next) => {
    res.render('login');
})

router.post('/login', guard.isGuest(),  async (req, res, next) => {
    if(!req.body.username || !req.body.password){
        return
    }
    try{
        await req.auth.login(req.body.username,req.body.password);
    }catch(err){
        return console.log(err);
    }
    res.redirect('/users/login')
})

router.get('/logout', guard.isAuth(), (req, res, next) => {
    req.auth.logOut();
    res.redirect('/')
})

module.exports = router;