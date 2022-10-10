// option 1: exporting the whole file
const Rep = require("../models/rep.model")


// get all //this return an array of objects
module.exports.allRep = (req, res) => {
    Rep.find()
        .then(allRep => res.json(allRep))
        .catch(err => res.status(400).json(err))
}

// get one //this return a object
module.exports.oneRep = (req, res) => {
    const paramsId = req.params.id
    Rep.findOne({ _id: paramsId }).populate('totalCustomers')
        .then(Rep => res.json(Rep))
        .catch(err => res.status(400).json(err))
}

// create
module.exports.addRep = (req, res) => {
    const newRep = req.body
    Rep.create(newRep)
        .then(Rep => res.json(Rep))
        .catch(err => res.status(400).json(err)) //this will return status 400 you can see more statuses and meanings
}

// update -- getOne + create
module.exports.updateRep = (req, res) => {
    const paramsId = req.params.id
    const updatedRep = req.body
    Rep.findOneAndUpdate(
        {_id: paramsId}, // criteria
        updatedRep, // update info
        {new: true, runValidators: true}
        // new : true --> return the updated object 
        // runValidation --> to run validations
    )
        .then(updatedRep => res.json(updatedRep))
        .catch(err => res.status(400).json(err))
 

}

// delete
module.exports.deleteRep = (req, res) => {
    Rep.findOneAndDelete({_id: req.params.id})
        .then(deletedRep=> res.json(deletedRep))
        .catch(err => res.status(400).json(err))
}

//get all customers of a rep
// module.exports.getAllCustomers = (req, res) => {
//     Rep.findOne({_id : req.param.repId}).populate('totalCustomers')
//         .then(foundRep=>res.json(foundRep))
//         .catch(err=>res.status(400).json(err))
// }


//get all reps with customers info
module.exports.getAllCustomers = async(req, res) => {
    try{
        const data = await Rep.find().populate({path: 'totalCustomers'})
        res.status(200).json(data)
    } catch(err){
        res.status(400).json({success:false, message:err.message})
    }
    
}