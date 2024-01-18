const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//jwt token to keep data secure

module.exports.register = (req, res)=>{
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY);            
            res
                .cookie("usertoken", userToken, {httpOnly: true})
                .json({msg: "success", user:user});
        })
        .catch(err => {
            console.log("in err")
            res.status(400).json(err)
        }); 
}

//Test cookie
module.exports.cookie =(req, res)=>{
    res
        .cookie("testkey","testvalue", {httpOnly: true, sameSite: 'None', secure: true})
        .json("success")
}


module.exports.index =(req, res)=>{
    User.find()
        .then(users=>res.cookie("test","test", {httpOnly:true}).json(users))
        .catch(err=>res.json(err))
}

module.exports.login = async(req, res)=>{

    const user = await User.findOne({ email: req.body.email });

 
    if(user === null) {
   
        return res.sendStatus(400)
    }
    //if we made it this far, we found a user with this email address
    //compare passwords
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        //password wasnt a match
        console.log('incorrect passsword')
        
        // res.sendStatus(400)
        res.status(400)
        return res.send('Password did not match server')
    }
    //if password was correct
    const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY);

   
    console.log(`user token is: ${userToken}`)
    
    res
        .cookie("usertoken", userToken, {httpOnly: true, sameSite: 'None', secure: true})
        .json({ msg: "success!" });  

    console.log(req.cookies)
       
}

module.exports.logout = (req, res) =>{
    res.clearCookie('usertoken')
    res.sendStatus(200)
}

module.exports.getUser = (req, res) =>{
    const decodedJwt = jwt.decode(req.cookies.usertoken, {complete: true})
    User.findOne({_id: decodedJwt.payload.id})
        .then(oneUser=>res.json(oneUser))
        .catch(err=>res.status(500).json(err))
}

// get all //this return an array of objects
module.exports.allUsers = (req, res) => {
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.status(400).json(err))
}

//get all users with customers info
module.exports.getAllCustomers = async(req, res) => {
    try{
        const data = await User.find().populate({path: 'totalCustomers'})
        res.status(200).json(data)
    } catch(err){
        res.status(400).json({success:false, message:err.message})
    }
    
}

//update existing user
module.exports.updateUser = async(req, res) => {
    const { id } = req.params;
  const { password , firstName, lastName, email, office, address, phone, dob } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update password if newPassword is provided
    if (password) {
      // Check if the current password matches
    //   const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    //   if (!isPasswordValid) {
    //     return res.status(401).json({ message: 'Current password is incorrect' });
    //   }

      // Hash and update the new password
      const hashedNewPassword = await bcrypt.hash(password, 10);
      user.password = hashedNewPassword;
    }

    // Update other user information
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.office = office || user.office;
    user.address = address || user.address;
    user.phone = phone || user.phone;
    user.dob = dob || user.dob;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User information updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}


// delete
module.exports.deleteUser= (req, res) => {
    User.findOneAndDelete({_id: req.params.id})
        .then(deletedUser=> res.json(deletedUser))
        .catch(err => res.status(400).json(err))
}

// get one //this return a object
module.exports.oneUser = (req, res) => {
    const paramsId = req.params.id
    User.findOne({ _id: paramsId })
        .then(User => res.json(User))
        .catch(err => res.status(400).json(err))
}