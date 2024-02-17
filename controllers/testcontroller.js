import mongoose from 'mongoose';


 const testcontroller = (req, res)=>{
    const {name} = req.body;

    res.status(200).send(`Your name is ${name}`);
}
export default testcontroller;


