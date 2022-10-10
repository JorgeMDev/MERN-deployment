// option 1: exporting the whole file
const Customer = require("../models/customer.model")
const Rep = require("../models/rep.model")

// option 2: exporting the whole file as an object, with key/value pair
// const {Destination} = require("./../models/destination.model")


module.exports.testApi = (req, res) => {
    res.json({ Status: "ok", message: 'message from backend' })
}


// get all //this return an array of objects
module.exports.allCust = (req, res) => {
    Customer.find()
        .then(allCust => res.json(allCust))
        .catch(err => res.status(400).json(err))
}

//get all customer of one rep
module.exports.customersOfOneRep = (req, res) => {
    Customer.find({rep: req.params.repId})
        .then(customers=>res.json(customers))
        .catch(err=>res.status(400).json(err))
}





// get one //this return a object
module.exports.oneCust = (req, res) => {
    const paramsId = req.params.id
    Customer.findOne({ _id: paramsId })
        .then(Cust => res.json(Cust))
        .catch(err => res.status(400).json(err))
}

// create customer + push that customer into a Rep model
module.exports.addCust = async(req, res) => {
   
    try {
        
        //add a customer into Customer
        const newCustomer = new Customer(req.body)
        console.log(req.params.repId)
        newCustomer.rep = req.params.repId
        await newCustomer.save()

        //pushing the newly added customer into Rep
        const foundRep = await Rep.findOne({_id: req.params.repId})
        foundRep.totalCustomers.push(newCustomer)
        await foundRep.save()

        res.json(newCustomer) 
    }
        
        catch(err){
            res.status(400).json(err)
        }
    
}

// update -- getOne + create
module.exports.updateCust = (req, res) => {
    const paramsId = req.params.id
    const updatedCust = req.body
    Customer.findOneAndUpdate(
        {_id: paramsId}, // criteria
        updatedCust, // update info
        {new: true, runValidators: true}
        // new : true --> return the updated object 
        // runValidation --> to run validations
    )
        .then(updatedCust => res.json(updatedCust))
        .catch(err => res.status(400).json(err))
 

}

// delete
module.exports.deleteCust = (req, res) => {
    Customer.findOneAndDelete({_id: req.params.id})
        .then(deletedCust=> res.json(deletedCust))
        .catch(err => res.status(400).json(err))
}


//get all customers with reps info
module.exports.getCustomerwithRep = async(req, res) => {
    try{
        const data = await Customer.find().populate({path: 'rep'})
        res.status(200).json(data)
    } catch(err){
        res.status(400).json({success:false, message:err.message})
    }
    
}