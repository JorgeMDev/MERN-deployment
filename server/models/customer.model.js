const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const Comment = require('./comment.model')


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
   dos: { //date of sale
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
   paymentPlan: { //115 13.99% etc
      type : String
   },
   score: {
      type : String,
   },
   approval: { //percentage of approval
      type : Number
   },
   doi: { //date of installation
   type : Date
   },
   installer: {
      type: String,
      required : [true, 'Installer name is required'], 
      minlength: [3, 'First name must be at least 3 characters long']
   },
   status: {
      type : String  //Pending approval, Pending install, Pending contract , signing, in verification, verified, paid
      },
   office: { //MD //VA etc
      type : String,  
      required : [true, 'Office is required']
      },
   comments: [Comment.schema],
   coapFirstName: {
      type: String
   },
   coapLastName: {
      type : String
   },
   coapPhone: {
      type : Number  
   },
   coapEmail: {
      type : String
   },
   coapCreditScore: {
      type : Number
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Representative required']
   }
},
{timestamps: true});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
