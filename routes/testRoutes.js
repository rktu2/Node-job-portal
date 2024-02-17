import express from 'express';
import TestController from '../controllers/testcontroller.js'
//router object

const router = express.Router();

// routes

router.post('/test', TestController);


export default router;