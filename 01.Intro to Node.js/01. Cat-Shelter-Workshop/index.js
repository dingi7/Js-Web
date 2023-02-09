const http = require('http');
const fs = require('fs');
const port = 3000;

const home = require('./resources/views/home');
const addCat = require('./resources/views/addCat');
const addBreed = require('./resources/views/addBreed');
const editCat = require('./resources/views/editCat');
const catShelter = require('./resources/views/catShelter');
const styles = require('./resources/content/styles/site.css');
const cats = require('./database.json')
const breeds = require('./breeds.json')


const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    if (req.url === '/styles/site.css'){
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });
        res.write(styles);
    } else if(req.url === '/cats/add-cat'){
        res.write(addCat);
    } else if(req.url === '/cats/add-breed'){
        res.setHeader('Access-Control-Allow-Headers', '*');
        if(req.method === 'POST'){
            console.log('in');
            // set Access-Control-Allow-Headers to true
            // get the data from the request
            const newBreed = req.body.breed;
            console.log(newBreed);
            res.write('New breed added')
        }
        res.write(addBreed);
    } else if(/cats\/\d+\/edit/.test(req.url)){
        if(req.method === 'POST'){
            const catId = req.url.split('/')[2];
            const cat = cats.find(x => x.id == catId);
            // get the data from the request
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            console.log(body);
        }
        let catId = req.url.split('/')[2];
        const cat = cats.find(x => x.id == catId);
        res.write(editCat(cat));
    } else if(req.url === '/cats/catShelter'){
        res.write(catShelter);
    } else  if (req.url === '/'){
        res.write(home);
    } else if(req.url === '/cats/edit/2'){
        const cat = cats.find(x => x.id == 2);
        cat.name = 'Pesho';
        fs.writeFileSync('./database.json', JSON.stringify(cats));
        res.write(editCat(cat));
    }    
    else {
        res.write('404 Not Found');
    }
    // /cats\/\d+\/edit/.test(req.url)
    res.end();
});

server.listen(port, () => console.log(`Server listening on port ${port}!`));