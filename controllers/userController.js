import User from '../models/User';

export const updateUserController = async(req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        next("please provide all fields")

    }
    const user = await User. findOne({_id: req.user.userId});
    user.name = name;
    user.email = email;
    user.location = location;

    await user.save();

    const token = user.createJWT();
    res.status(200).json({
        user,
        token
    });
}
