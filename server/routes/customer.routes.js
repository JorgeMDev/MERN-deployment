const CustomerController = require("./../controllers/customer.controller")
const {authenticate} = require('../configs/jwt.config')

module.exports = (app) =>{
    app.get("/api/test", CustomerController.testApi)
    app.get("/api/customers", authenticate, CustomerController.allCust)
    app.get("/api/customers/all", authenticate, CustomerController.getCustomerwithRep)
    app.get("/api/customer/:id", authenticate, CustomerController.oneCust)
    app.post("/api/customer/:repId", authenticate, CustomerController.addCust)
    app.put("/api/customer/:id", authenticate, CustomerController.updateCust)
    app.delete("/api/customer/:id", authenticate, CustomerController.deleteCust)
    app.get("/api/customers/:repId", authenticate, CustomerController.customersOfOneRep)
    
}