import User from '../models/User.js';

export const registerController = async(req, res)=>{
    try{
  const {name, email, password} = req.body;
  if(!name){
    next("please provide name");
  }
  if(!email){
    next("please provide email");
  }
  if(!password){
    next("please provide password");
  }
 const existingUser = await User.findOne({email});
 if(existingUser){
    return res.status(200).send({
        success: false,
        message: "Email Already register please login"
    })
 }
 const user = await User.create({name, email, password});
 const token = user.createJWT();
 res.status(201).send({success: true,
 message: "User register successfully",
 User: user, token})
    }catch(error){
        console.log(error);
        res.status(400).send({
            message: 'error in register controller',
            success: false,
            error
        })

    }
}

export const loginController = async (req, res)=>{
  const {email ,password} = req.body;
  //validation
  if(!email || !password ){
    next('Please provide All Fields');
  }
  // find user by email
  const user = await User.findOne({email}).select("+password");
  if(!user){
    next('Invalid username or password');
    //comapre password
    const isMatch = await user.comaprePassword(password);
    if(!isMatch){
      next("Invalid username and password");
    }
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "Login successfully",
      user, 
      token
    })
  }
}