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
router.put('/:id', validateProject, validateProjectInfo, async (req, res, next)=>{
    try{
        const updatedProjects = await Projects.update(req.params.id, req.body)
        res.status(200).json(updatedProjects)
    }
   catch(err){
    next(err)
   }
    
})

router.delete('/:id', async (req, res, next)=>{
    try{
        const deleted = await Projects.remove(req.params.id)
        if(!deleted){
            res.status(404).json()
        } else{
            res.json({
                message: 'project deleted'
            })
        }
    } catch{err}{
        res.status(500).json({message:'Error Error'})
    }
})



module.exports= router