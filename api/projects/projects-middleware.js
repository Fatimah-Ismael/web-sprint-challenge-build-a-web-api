// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateId (req, res, next){
    try{
        const project = await Projects.get(req.params.id)
        if(!project){
            res.status(404).json({
                message:"project not found"
            })
        } else{
            req.project = project
            next()
        }
    } catch(err){
        res.status(500).json({
            message:'unable to find project'
        })
    }
}

function validateProject(req, res, next){
    try{
        const { name, description }= req.body
        if(!name || !description){
            res.status(400).json({
                message: 'missing info'
            })
        } else{
            next()
        }
    } catch(err){
        res.status(500).json({
            message:"Error cannot update project"
        })
    }
}

async function validateProjectInfo(req, res, next){
    const{name, description, notes, completed }= req.body;
    if(req.method==='PUT'){
        if(!name|| !description || !(completed ===false || completed === true)){
            res.status(400).json({ message: 'name, description, notes, and completed are needed'})
        } else{
            next()
        }
        } else{
            if(!name || !description){
                res.status(400).json({message: 'name, description needed'})
            } else{
                next()
            }
        }
    
}



module.exports ={
    validateId,
    validateProject,
    validateProjectInfo
}