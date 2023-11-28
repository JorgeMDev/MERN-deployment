const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    phone: {
      type : Number,
      required : [true, 'Phone number is required'],
      minlength: [10, 'Phone number must be at least 10 characters long']
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
          validator: val=> /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
          message: "Please enter a valid email"
      }
    },
    address: {
      type : String,
      required : [true, 'Address is required'],
      minlength: [6, 'Address must be at least 6 characters long']  
     },
     dob: {
      type : Date,
      required : [true, 'Phone number is required'],
      minlength: [10, 'Phone number must be at least 10 characters long']  
  },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    },
    office: { // select office for your new rep.. VA , MD, etc
      type : String,
      required : [true, 'Email is required']
  },
  role: { // Admin , Manager, Sales or Installer
    type : String,
    required : [true, 'Role is requires']
}

  }, {timestamps: true});
  
// UserSchema.virtual('confirmPassword')
//   .get(()=>this._confirmPassword)
//   .set(val => this._confirmPassword = val)

// //password confirmation

// UserSchema.pre('validate', function(next){
//   console.log(this.password)
//   console.log(this.get('confirmPassword'))
//     if(this.password !== this.get('confirmPassword')){
//         this.invalidate('confirmPassword', 'Password must match confirm password')
//     }
//     next()
// })
 //password hashing
UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hash=>{
            this.password = hash
            next()
        })
})

  module.exports.User = mongoose.model('User', UserSchema);