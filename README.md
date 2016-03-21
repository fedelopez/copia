# copia

Node.js library to copy assets located on the `node_modules` directory to the destination defined in the `index.html`.

[![copia on Travis](https://api.travis-ci.org/fedelopez/copia.svg)](https://travis-ci.org/fedelopez/copia)

## Quick Start

Download the latest version
```shell    
npm install --save-dev copia
```

Require `copia`:
```javascript
var cp = require('copia');
``` 

Define the location of your `node_modules` folder and the `index.html` file: 
```javascript
var config = {"index-html": "./src/index.html", "node-modules": "./node_modules"};
```

Invoke `copia` with the `config` object defined above:
```javascript    
cp.copia(config);
```

Copia will walk the `node_modules` directory structure and automatically copy all the assets (css and js) defined in your `index.html`:

The following reference on `index.html`...
```html
<link rel="stylesheet" href="public/css/codemirror.css">
```
... will be copied from `node_modules` to the actual location referenced above:

    public
        css
            codemirror.css 

Same for any script file:

```html
<script src="public/js/codemirror.js"></script>
```

    public
        js
            codemirror.js

## Todo

- Ignore resolving list of files (e.g. `var config = {... "ignore":["app.css", "app.js"]};`)
- Create dirs if they don't exist
