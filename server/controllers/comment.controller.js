// option 1: exporting the whole file
const Customer = require("../models/customer.model")
const User = require("../models/user.model")
const Comment = require("../models/comment.model")

//Test
module.exports.testApi = (req, res) => {
    res.json({ Status: "ok", message: 'testing comment API' })
}

//add comment
module.exports.addComment = async (req, res) => {

    try {
     
      const Id = req.params.customerId;
      const text = req.body.newComment;

      
  
      // Find the customer by ID
      const customer = await Customer.findById(Id);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Create a new comment instance
      const Comment = {
        text,
        timestamp: Date.now(),
      };

      
  
      // Add the new comment to the user's comments array
      customer.comments.push(Comment);

      console.log(customer)
  
      // Save the updated customer  with the new comment
      await customer.save();
  
      res.status(200).json({ message: 'Comment added successfully', customer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

