# copia

Node.js library to copy assets located on the `node_modules` directory to the destination defined in the `index.html`.

## Quick Start

Download the latest version
    
    npm install --save-dev copia

Require `copia`:

    var cp = require('copia');
    
Define the location of your `node_modules` folder and the `index.html` file: 

    var config = {"index-html": "./src/index.html", "node-modules": "./node_modules"};
    
Invoke `copia` with the `config` object defined above:
    
    cp.copia(config);
    
Copia will walk the `node_modules` directory structure and automatically copy all the assets (css and js) defined in your `index.html`:

    <html>
    <head>
        <link rel="stylesheet" href="public/css/codemirror.css"> 
        <link rel="stylesheet" href="public/css/dracula.css">
        <meta charset="utf-8">
        <title>My HTML</title>
    </head>
    <body>
    <div>
        <h1>Test page</h1>
    </div>
    <script src="public/js/codemirror.js"></script>
    <script src="public/js/jquery.min.js"></script>
    <script src="public/js/app.js"></script>
    </body>
    </html>

Now your assets folder will be automatically populated each time `copia` is invoked:

    public
        css
            codemirror.css 
            dracula.css
        js
            codemirror.js
            jquery.min.js

## Todo

- Ignore resolving list of files (e.g. `var config = {... "ignore":["app.css", "app.js"]};`)
- Create dirs if they don't exist