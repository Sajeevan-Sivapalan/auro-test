import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({  
    studentId:{
        type:String,
        required: true
    },

    courseId:{
        type:String,
        required: true,  
    }
});

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

export default Enrollment;