// Write your "actions" router here!
// use endpoints get put post etc
const express = require('express')
const { validateActions, validateActionInfo} = require('./actions-middlware')

const Actions= require('./actions-model')
const router= express.Router();


 router.get('/', (req, res, next)=>{
    Actions.get()
    //console.log('action')
    .then(actions=>{
        res.status(200).json(actions)
 }) 
 .catch(next)
})

 router.get('/:id', validateActions, (req, res, next)=>{
    try{ 
        res.status(200).json(req.action)
        
    } catch(err){
        next(err)
    }
 })
router.post('/', validateActionInfo, (req, res, next)=>{
    Actions.insert(req.body)
    .then(newAction =>{
        res.status(201).json(newAction)
    })
    .catch(next)
})
 module.exports = router