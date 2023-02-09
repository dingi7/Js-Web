const express = require('express');
const { engine } = require('express-handlebars');
const catsDb = require('./db.json')
const breeds = require('./breeds.json')
const fs = require('fs/promises');

const app = express();

app.engine('hbs', engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res) => {
    res.render('home', {cats: catsDb});
});

app.get('/cats/add-breed', (req,res) => {
    res.render('addBreed')
})

app.post('/pet', (req, res) => {
    breeds.push(req.body.breed)
    saveBreeds()
    res.send('Got it ' + req.body.breed)
})

app.post('/cat', (req, res) => {
    console.log('cat');
    if(!req.body.name || !req.body.breed || !req.body.description){
        return
    }
    const cat = {
        id: catsDb.length + 1,
        name: req.body.name,
        imageUrl: "test",
        breed: req.body.breed,
        description: req.body.description
    }
    catsDb.push(cat)
    console.log(catsDb);
    saveCats()
    res.send('Got it')
})

app.get('/cats/add-cat', (req,res) => {
    res.render('addCat', { breeds })
})

app.get('/cats/edit/:id', (req, res) =>{
    const id = req.params.id
    const cat = catsDb.find(cat => cat.id == id)
    res.render('editCat', { cat, breeds })
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

async function saveBreeds(){
    fs.writeFile('./breeds.json', JSON.stringify(breeds))
}

async function saveCats(){
    fs.writeFile('./db.json', JSON.stringify(catsDb))
}