import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TimetableSchema = new Schema({  
    course:{
        type:String,
        required: true
    },

    startTime:{
        type:String,
        required: true,  
    },

    endTime:{
        type:String,
        required: true,    
    },

    faculty:{
        type:String,
        required: true,    
    },

    location:{
        type:String,
        required: true,    
    }
});

const Timetable = mongoose.model("Timetable", TimetableSchema);

export default Timetable;