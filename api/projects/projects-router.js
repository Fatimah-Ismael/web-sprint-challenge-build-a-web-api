// Write your "projects" router here!
// use endpoints get, put post etc
const express = require('express')
const { validateId, validateProject, validateProjectInfo } = require('./projects-middleware')

const Projects= require('./projects-model')
const router=express.Router();


router.get('/', (req, res, next)=>{
    Projects.get()
    .then(projects=>{
        res.status(200).json(projects)
    })
    .catch(next)
})
router.get('/:id', validateId, (req, res)=>{
    res.json(req.project)
})
router.post('/', validateProject, (req, res, next)=>{
    Projects.insert(req.body)
    .then(newProject=>{
        res.status(201).json(newProject)
    })
    .catch(next)
})





module.exports= router