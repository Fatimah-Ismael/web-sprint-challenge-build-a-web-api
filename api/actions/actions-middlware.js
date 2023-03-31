// add middlewares here related to actions
function logger(req, res, next){
    const timestamp = new Date().toString();
    const method= req.method;
    const url = req.originalUrl;
    console.log(`${timestamp} ${method} ${url}`)
    next()
}
module.exports = {
    logger, 
}