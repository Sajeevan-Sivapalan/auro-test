import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CourseSchema = new Schema({  
    name:{
        type:String,
        required: true
    },

    code:{
        type:String,
        required: true,  
    },

    description:{
        type:String,
        required: true,    
    },

    credits:{
        type:Number,
        required: true,    
    }, 

    faculty:{
        type:String,
        required: false,    
    }
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;