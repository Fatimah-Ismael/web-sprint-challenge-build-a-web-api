const express = require('express')
const { validateActions, validateActionInfo} = require('./actions-middlware')

const Actions= require('./actions-model')
const router= express.Router();


 router.get('/', (req, res, next)=>{
    Actions.get()
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

router.put('/:id', validateActionInfo, async (req, res, next)=>{
    try{
        const updatedAction = await Actions.update(req.params.id, req.body)
        res.status(200).json(updatedAction)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next)=>{
    try{
        const deleted = await Actions.remove(req.params.id)
        if(!deleted){
            res.status(404).json()
        }else{
            res.json({ message: 'action deleted',
            data:deleted
        })
        }
    }
    catch(err){
        res.status(500).json({ message: 'Error Error'})
    }
})
 module.exports = router