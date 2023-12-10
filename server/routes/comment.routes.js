const CommentController = require("./../controllers/comment.controller")
const {authenticate} = require('../configs/jwt.config')

module.exports = (app) =>{
    app.get("/api/test/comment", CommentController.testApi)
    app.post("/api/:customerId/comment", authenticate, CommentController.addComment)
    
    
}