// add middlewares here related to actions

const Actions = require('./actions-model')

function logger(req, res, next){
    const timestamp = new Date().toString();
    const method= req.method;
    const url = req.originalUrl;
    console.log(`${timestamp} ${method} ${url}`)
    next()
}


 async function validateActions(req, res, next){
    try{
        const actions = await Actions.get(req.params.id)
        if(!actions){
            res.status(404).json({
                message:"action not found"
            })
        } else{
            req.action = actions
            next()
        }
    } catch(err){
        res.status(500).json({
            message: "unable to find action"
        })
    }
 }

 async function validateActionInfo(req, res, next){
    const{project_id, description, notes, completed }= req.body;
    if(req.method==='PUT'){
        if(!project_id || !description || !notes || !(completed ===false || completed === true)){
            res.status(400).json({ message: 'name, description, notes, and completed are needed'})
        } else{
            next()
        }
        } else{
            if(!project_id || !description || !notes){
                res.status(400).json({message: 'name, description needed'})
            } else{
                next()
            }
        }
    }
 
module.exports = {
    logger, 
    validateActions,
    validateActionInfo
}