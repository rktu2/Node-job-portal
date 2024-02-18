import express from 'express';
import userAuth from '../middleware/authMiddleware.js';
import { CreateJob,getAllJobsController,updateJobController,deleteJobController, jobStatController } from '../controllers/jobController.js';
const router= express.Router();

//routes

router.post('/create-job', userAuth,CreateJob);
router.get('/get-all-job',userAuth, getAllJobsController);

router.patch('/update-job/:id', userAuth,updateJobController);

router.delete('/delete-job/:id',userAuth,deleteJobController);

router.get('/job-stats', userAuth ,jobStatController)


export default router;