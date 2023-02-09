const express = require('express');
const hbs = require('express-handlebars');
const { about } = require('./controllers/about');
const { pageNotFound } = require('./controllers/pageNotFound');
const { init } = require('./middlewares/dbMiddleware');
const cubeController = require('./controllers/cubeControler')
const accessoriesController = require('./controllers/accessoryControler')
const userController = require('./controllers/userControler')
const cookieParser = require('cookie-parser')
const auth = require('./middlewares/authMiddleware')

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
    app.use(cookieParser())
    app.use(auth())
    app.use('/cubes', cubeController)
    app.use('/accessories', accessoriesController)
    app.use('/users', userController)

    app.get('/', (req, res) => res.redirect('/cubes'));
    app.get('/about', about);
    app.all('*', pageNotFound);

    app.listen(port, console.log(`Server listening on port ${port}....`));
}
