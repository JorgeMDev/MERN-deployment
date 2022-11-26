const {User} = require("../models/user.model")
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
        .cookie("testkey","testvalue", {httpOnly:true})
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
        
        // res.sendStatus(400)
        res.status(400)
        return res.send('You need to sign')
    }
    //if password was correct
    const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY);

    console.log(`user token is: ${userToken}`)
    
    res
        .cookie("usertoken", userToken, {httpOnly: true, sameSite: "None"})
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