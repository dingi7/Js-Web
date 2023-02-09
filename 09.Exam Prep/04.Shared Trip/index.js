const express = require('express');
const hbs = require('express-handlebars');
const cookierParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const authController = require('./controllers/auth')
const dataBase = require('./middlewares/dataBase');
const tripController = require('./controllers/tripController')
// REQ VALIDATOR
/*
#############################################
###### Middlewares/controllers imports ######
#############################################

*/

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
    app.use('/trips', tripController)
    /*
    
    */
    
    app.get('/', (req,res) => res.render('home', {title: 'Home'}))
    app.get('/404', (req, res) => {
        res.render('404', {title: 'Page not found'});
    })
    app.all('*', (req, res) => {
        res.redirect('/404');
    });

    app.listen(port, console.log('Server listening on port ' + port));
}
