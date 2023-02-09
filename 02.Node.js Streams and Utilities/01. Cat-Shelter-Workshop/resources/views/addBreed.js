module.exports = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/styles/site.css">
    <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
    <title>Cat Shelter</title>
    <script>
    async function req(){
        console.log('req');
        const breed = document.getElementById('breed-name').value;
        const url = 'http://localhost:3000/cats/add-breed';
        const data = {breed};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
    }
    </script>
</head>

<body>
    <header>
        <nav>
            <ul class="navigation">
                <li><a href="/">Home Page</a></li>
                <li><a href="/cats/add-breed">Add Breed</a></li>
                <li><a href="/cats/add-cat">Add Cat</a></li>
            </ul>
        </nav>
        <h1>Cat Shelter</h1>
    </header>
    <main>
        <form action="#" method="" class="cat-form">
            <h2>Add Cat Breed</h2>
            <label for="breed-name">Breed Name</label>
            <input name="breed" type="text" id="breed-name">
            <button type="submit" onclick="req()">Add Breed</button>
        </form>
    </main>
</body>

</html>`


// how to clear my cmd
// how to clear my cmd window