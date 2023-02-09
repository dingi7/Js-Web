const router = require('express').Router();
const guard = require('../middlewares/guards')

router.get('/login', guard.isGuest(), (req,res,next) =>{
    res.render('login', {title: 'Login'})
})

router.post('/login', guard.isGuest(), async (req,res,next) =>{
    if(!req.body.password || !req.body.email){
        res.render('login', {title: 'Login', error: "All fields are required"})
        return
    }
    try{
        await req.auth.login(req.body.email, req.body.password)
    }catch(err){
        res.render('login', {title: 'Login', error: "Incorrect email or password"})
        return
    }
    res.redirect('/');
})

router.get('/register', guard.isGuest(), (req,res,next) =>{
    res.render('register', {title: 'Register'})
})

router.post('/register', guard.isGuest(), async (req,res,next) =>{
    if(!req.body.password ||!req.body.email || !req.body.rePassword || !req.body.gender){
        res.render('register', {title: "Register", error:"All fields are required"})
        return
    }
    if(req.body.password !== req.body.rePassword){
        res.render('register', {title: "Register", error:"Passwords don/'t match"})
        return
    }
    // PASS LENGHT VALIDATION
    if(req.body.password.length < 4){
        res.render('register', {title: "Register", error:"Password too weak!"})
        return
    }
    try{
        await req.auth.register(req.body)
    }catch(err){
        res.render('register', {title: "Register", error: err })
        return
    }
    res.redirect('/');
})

router.get('/logout', guard.isAuth(), (req,res) => {
    req.auth.logOut()
    res.redirect('/auth/login')
})

router.get('/profile', guard.isAuth(), async(req, res) => {
    const user = await req.auth.findUserLean(req.user.email);
    const male = user.gender == 'male' 
    res.render('profile', {title: "Closed", user, trips: user.tripHistory.length, male})
})

/*
###############################
###############################
##### BONUS FUNCTIONALITY #####
###############################
###############################

router.get('/closed', guard.isAuth(), async(req, res) => {
    const user = await req.auth.findUser(req.user.email);
    res.render('closed-auctions', {title: "Closed", user})
})

*/


module.exports = router;