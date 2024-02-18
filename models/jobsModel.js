import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    company:{
        type: String,
        require:[true, 'Company name is required']
    },
    position:{
        type: String,
        required: [true, 'job position is required'],
        minlength: 100
    },
    status:{
        type: String,
        enum: ['Pending', 'Reject', 'Interview'],
        default: 'pending'
    },
    workType:{
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Internship', 'Contract'],
        default: 'Full-Time'
    },
    workLocation: {
        type: String,
        default: "Mumbai",
        required: [true, "work location is required"]
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'

    }

},{timestamps: true});

export default mongoose.model('Job', jobSchema);