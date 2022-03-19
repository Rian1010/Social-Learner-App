# Social Learner App

## Initial Process
- `npm init`
- Give a description 
- author: name
- license: MIT

## Install Regular Dependencies
- `npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request`

## Install Dev Dependencies
- `npm i -D nodemon concurrently`

## Initial server.js Setup
```javascript
const express = require('express');

const app =  express();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`Server started on port ${PORT}`));
```

## package.json

## Run Application
- `npm run server`