// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from  './routes/jobsRoute.js';
import cors  from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middleware/errorMiddleware.js';
import helmet from 'helmet';
import xss from 'xss-clean';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
const app = express();

// for(var i =0; i<3; i++){
//     setTimeout(function(){console.log(i)}, 1000 * i)
// }
//  (function (){f
//     var a=b=5;
//  })();
//  console.log(b)

// var a= 5 + "9";
// console.log(a);
//security section
app.use(helmet());
app.use(xss());
app.use(ExpressMongoSanitize());

dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// dot env from config path
// dotenv.config({path:'./config'})
app.use('/api/v1/', testRoutes);
app.use("/api/v1/", authRoutes);
app.use("/api/v1/", userRoutes)
app.use("/api/v1/",jobRoutes);
app.use(errorMiddleware);

//port
const port = process.env.PORT || 8080;
console.log(port);
app.get('/', (req, res)=>{
    res.send("<h1>Welcome to the job portal </h1>");

})

app.listen(8000, ()=>{
console.log("node js is running" .bgCyan.white)

})
