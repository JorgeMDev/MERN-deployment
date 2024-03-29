const UserController = require("../controllers/user.controller")
const {authenticate} = require('../configs/jwt.config')

module.exports = app =>{
    app.get(`/api/allUsers`, authenticate, UserController.index)
    app.get(`/api/cookie`, UserController.cookie)
    app.post(`/api/register`, authenticate, UserController.register)
    app.post(`/api/login`, UserController.login)
    app.get(`/api/logout`, UserController.logout)
    app.get("/api/user/:id", authenticate, UserController.oneUser)
    app.get(`/api/getUser`, authenticate, UserController.getUser)
    app.put("/api/user/:id", UserController.updateUser)
    app.delete("/api/user/:id", authenticate, UserController.deleteUser)
    app.get("/api/user/all/customers", authenticate, UserController.getAllCustomers) //get all reps with customers
}