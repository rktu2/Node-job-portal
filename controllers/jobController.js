import mongoose from 'mongoose';
import Job from '../models/jobsModel';

export const CreateJob = async(req, res, next)=>{
    const {company , position} = req.body;

    if(!company || !position){
        next('Please Provide All Fields')
    }
   req.body.createdBy = req.user.userId;
   const job = await Job.create(req.body);
   res.status(201).json({job});
}

export const getAllJobsController = async(req, res, next)=>{
    const   {status, workType, search , sort} = req.query;
    // searching filters
    const querObject  = {
        createdBy: req.user.userId
    }
    //filters
    if(status && status!== 'all'){
        querObject.status = status
    }
    if(workType  && workType !== 'all'){
        querObject.workType = workType;
    }
    if(search){
        querObject.position = {$regex: search , $options: "i"}

    }
    let queryresult = Job.find(querObject);

    //sorting
    if(sort === 'latest'){
        queryresult= queryresult.sort('-createdAt')

    }
    if(sort === 'oldest'){
        queryresult = queryresult.sort('createdAt');
    }
    if(sort === 'a-z'){
        queryresult = queryresult.sort('position');
    } 
    if(sort === 'z-a'){
        queryresult = queryresult.sort('-position');
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1)* limit;
    queryresult= queryresult.skip(skip).limit(limit);
    // job count
    const totalJobs = await Job.countDocuments(queryresult);
    const numOfPage = Math.ceil(totalJobs / limit);
    const jobs = await queryresult
    // const jobs = await Job.find({createdBy:req.user.userId});
    res.status(200).json({totalJobs,
    jobs, numOfPage});
   

}

export const updateJobController = async(req, res, next)=>{
    const {id} = req.params.id;
    const {company, position}= req.body;
    //vaLIDATOR
    if(!company || !position){
        next('Please provide all fields')
    }
    //find job
    const job = await Job.findOne({_id: id});
    // validation
    if(!job){
        next(`No Jobs found with this id ${id}`);

    }
   if(!req.user.userId  === job.createdBy.toString()){
    next('You are not authgorize to updsate job');
    return
   }
   const updateJob = await Job.findOneAndUpdate({_id:id}, req.body,{
    new: true,
    runValidators:true
   });
   res.status(200).json({updateJob});
}

export const deleteJobController = async(req, res, next)=>{
    const {id} = req. params.id;
    // find job
    const job = await Job.findOne({_id: id});
    if(!job){
        next('No job found for this id');
    }
    if(!req.user.userId === job.createdBy.toString()){
        next('You are not authorize to delete a job');
        return;
    }
    await job.deleteOne();
    res.status(200).json({message: "Success , Job Deleted"});
}

export const jobStatController = async(req, res)=>{
    const stats = await Job.aggregate([
        // search by user jobs
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
           $group: {
            _id: '$status' , count: {$sum: 1}
            },
        }
    ]);``

    //default stats
    const defaultStats = {
        Pending: stats.Pending || 0,
        Reject: stats.Reject || 0,
        Interview: stats.Interview || 0
    }
  // monthly yearly stats

  let monthlyApplication = await Job.aggregate([
    {
        $match: {
            createdBy: new mongoose.Types.ObjectId(req.user.userId)
        }
    },
    {
        $group: {
            _id:{
                year: {$year: '$createdAt'},
                month: {$month: '$createdAt'}
            },
            coutnt: {
                $sum:1
            }
        }
    }
  ])

    res.status(200).json({totalJobs: stats.length , defaultStats, monthlyApplication});
}