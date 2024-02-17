import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () =>{
    try{
        // console.log(process.env.MongoDB_Url);
        const conn = await mongoose.connect(process.env.MongoDB_Url);
        console.log(`connected to the mongodb database ${mongoose.connection.host}`.bgBlue.white);
    } catch(error) {
        console.log(`mongodb error ${error}`.bgRed.white)
    }
}
export default connectDB;