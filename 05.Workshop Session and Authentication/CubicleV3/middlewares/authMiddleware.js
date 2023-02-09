const auth = require('../services/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = '8965hlkjfasgkjhf7865349768iughfkja';

module.exports = () => async (req, res, next) => {
    req.auth = {
        login,
        logOut,
        register
    };

    if(readToken(req)){
        next()
    }

    async function register({ username, password }) {
        const existing = await auth.getUser(username);
        if (existing) {
            throw new Error('Username is taken');
        }

        const user = await auth.createUser(username, password);
    }

    async function login(username, password) {
        const user = await auth.getUser(username);
        if (!user) {
            throw new Error('Username or password is incorrect');
        } else {
            const valid = bcrypt.compare(password, user.password);
            if (valid) {
                req.user = createToken(user)
            }else {
                throw new Error('Username or password is incorrect');
            }
        }
    }

    async function logOut(){
        res.clearCookie('SESSION_DATA')
    }

    function createToken(user){
        const userViewModel = { _id: user._id, username: user.username };
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
                console.log('Known user', userData.username);
            } catch (err) {
                res.clearCookie('SESSION_DATA');
                res.redirect('/users/login');
                return false;
            }
        }
        return true;
    }
};
