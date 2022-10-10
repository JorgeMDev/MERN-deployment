const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const customerSchema = new Schema({
   firstName: {
      type: String,
      required : [true, 'First name is required'], 
      minlength: [3, 'First name must be at least 3 characters long']
   },
   lastName: {
      type : String,
      required : [true, 'Last name is required'],
      minlength: [3, 'Last name must be at least 3 characters long'],
   },
   email: {
      type : String,
      required : [true, 'Email is required'],
      minlength: [6, 'Email must be at least 6 characters long']  
   },
   address: {
      type : String,
      required : [true, 'Address is required'],
      minlength: [6, 'Address must be at least 6 characters long']  
   },
   phone: {
      type : Number,
      required : [true, 'Phone number is required'],
      minlength: [10, 'Phone number must be at least 10 characters long']  
   },
   dob: { //date of birth
      type : Date,
      required : [true, 'Date is required'],
   },
   price: {
      type : Number,
      required : [true, 'Price is required'],
   },
   bank: { //AFI, CASTLE, CASH drodown
      type : String
   },
   approval: { //percentage of approval
      type : Number
   },
   doi: { //date of installation
   type : Date
   },
   status: {
      type : String  //sold, installed, contract signed, verified, complete
      },
   office: { //MD //VA etc
      type : String,  
      required : [true, 'Price is required']
      },
   comments: {
   type : String  
   },
   rep: {
      type: Schema.Types.ObjectId,
      ref: 'Rep',
      required: [true, 'Representative required']
   }
},
{timestamps: true});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
