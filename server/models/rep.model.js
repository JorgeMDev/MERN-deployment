const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const repSchema = new Schema({
//Schema == Table
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
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    office: { // select office for your new rep.. VA , MD, etc
        type : String,
        required : [true, 'Email is required']
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
    dob: {
        type : Date,
        required : [true, 'Phone number is required'],
        minlength: [10, 'Phone number must be at least 10 characters long']  
    }, gender: {
        type : String,
        required : [true, 'Gender number is required']  //male, female, other
    }, maritalStatus: {
        type : String  //single, married, divorced, widow
    }, referral: {
        type : String,
        required : [true, 'Referral is required']  //Family/Friend, Social Media, Craiglist, Indeed, Other
    }, education: {
        type : String  //Highschool / College / Associate Degree / Bachelor Degree / Master Degree / Phd
    }, ethnicity: {
        type : String  //White, African American, Asian, Native American, Hispanic
    },isAdmin: {
        type : Boolean  //True / False
    }, totalCustomers: [{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }]

    }, { timestamps : true });

const Rep = mongoose.model('Rep', repSchema);

module.exports = Rep;

