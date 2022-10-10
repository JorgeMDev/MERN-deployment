const RepController = require("./../controllers/rep.controller")
const {authenticate} = require('../configs/jwt.config')

module.exports = (app) =>{
    
    app.get("/api/reps", authenticate, RepController.allRep)
    app.get("/api/rep/:id", authenticate, RepController.oneRep)
    app.post("/api/rep", authenticate, RepController.addRep)
    app.put("/api/rep/:id", authenticate, RepController.updateRep)
    app.delete("/api/rep/:id", authenticate, RepController.deleteRep)
    app.get("/api/rep/all/customers", authenticate, RepController.getAllCustomers) //get all reps with customers

}