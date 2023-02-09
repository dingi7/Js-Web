const express = require('express');
const hbs = require('express-handlebars');
/*
#############################################
###### Middlewares/controllers imports ######
#############################################
*/
const cookierParser = require('cookie-parser');
const dataBase = require('./middlewares/dataBase');
const auth = require('./middlewares/auth');
const authController = require('./controllers/auth')
const auctionController = require('./controllers/auctionController')


start()

async function start() {
    const port = 3000;
    const app = express();

    app.engine('hbs', hbs({ extname: '.hbs' }));
    app.set('view engine', 'hbs');
    app.use(express.urlencoded({ extended: false }));
    app.use('/static', express.static('static'));
    app.use(cookierParser());

    app.use(auth());
    app.use(await dataBase());
    app.use('/auth', authController);
    app.use('/products', auctionController)

    app.get('/', (req,res) => res.render('home', {title: 'Home'}))
    app.get('/404', (req, res) => {
        res.render('404', {title: 'Page not found'});
    })
    app.all('*', (req, res) => {
        console.log('PAGE NOT FOUND');
        res.redirect('/404');
    });

    app.listen(port, console.log('localhost listening on port ' + port));
}
