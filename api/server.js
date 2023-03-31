const express = require('express');
const { logger } = require('./actions/actions-middlware')
const server = express();

server.use(express.json())
server.use(logger)


/*server.get('/api/projects', (req, res)=>{
    res.json({ message: 'API is working'})
})

server.get('/', (req, res)=>{
    res.send('<h1>Welcome to the sprint challenge</h1>')
})
*/
// create server.use error code here

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
