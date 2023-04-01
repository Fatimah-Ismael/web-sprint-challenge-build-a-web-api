const express = require('express');
const { logger } = require('./actions/actions-middlware')
const server = express();
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(express.json())
server.use(logger)

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('/', (req, res)=>{
    res.send('<h1>Welcome to the sprint challenge</h1>')
})

// create server.use error code here

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
