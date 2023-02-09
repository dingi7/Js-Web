const auth = require('../services/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = '8965hlkjfasgkjhf7865349768iughfkja';

module.exports = () => async (req, res, next) => {
    req.auth = {
        login,
        logOut,
        register,
        findUser: auth.getUser,
        findUserLean: auth.getUserLean
    };

    if(readToken(req)){
        next()
    }

    async function register({ email, password, gender }) {
        const existing = await auth.getUser(email);
        if (existing) {
            throw new Error('Username is taken');
        }
        password = await bcrypt.hash(password, 10)
        const user = await auth.createUser(email, password, gender);
        req.user = createToken(user);
    }

    async function login(email, password) {
        const user = await auth.getUser(email);
        if (!user) {
            throw new Error('Username or password is incorrect');
        } else {
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                req.user = createToken(user)
            }else {
                throw new Error('Username or password is incorrect');
            }
        }
    }

    function logOut(){
        res.clearCookie('SESSION_DATA')
    }

    function createToken(user){
        const userViewModel = { _id: user._id, email: user.email };
        const token = jwt.sign(userViewModel, secret);
        res.cookie('SESSION_DATA', token, { httpOnly: true });

        return userViewModel;
    }

    function readToken(req) {
        const token = req.cookies['SESSION_DATA'];
        if (token) {
            try {
                const userData = jwt.verify(token, secret);
                req.user = userData;
                res.locals.user = userData;
                console.log('Known user', userData.email);
            } catch (err) {
                res.clearCookie('SESSION_DATA');
                res.redirect('/auth/login');
                return false;
            }
        }
        return true;
    }
};
