const express = require('express');
const hbs = require('express-handlebars');
const { about } = require('./controllers/about');
const { attach, attachPost } = require('./controllers/attach');
const { catalog } = require('./controllers/catalog');
const { create, createPost } = require('./controllers/create');
const { createAcc, createAccPost } = require('./controllers/createAccessoary');
const { details } = require('./controllers/details');
const { edit, editPost } = require('./controllers/edit');
const { pageNotFound } = require('./controllers/pageNotFound');
const { init } = require('./services/storage');

start();

async function start() {
    const port = 3000;

    const app = express();
    app.engine(
        'hbs',
        hbs({
            extname: '.hbs',
        })
    );
    app.set('view engine', 'hbs');
    app.use(express.urlencoded({extended:false}))
    app.use('/static', express.static('static'));
    app.use(await init());

    app.get('/', catalog);
    app.get('/details/:id', details);
    app.get('/create', create);
    app.post('/create', createPost);
    app.get('/about', about);
    app.get('/edit/:id', edit)
    app.post('/edit/:id', editPost)
    app.get('/createAccessory', createAcc)
    app.post('/createAccessory', createAccPost)
    app.get('/attach/:id', attach)
    app.post('/attach/:id', attachPost)
    app.all('*', pageNotFound);

    app.listen(port, console.log(`Server listening on port ${port}....`));
}
