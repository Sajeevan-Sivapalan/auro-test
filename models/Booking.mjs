import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookingSchema = new Schema({  
    RoomAndResourceId:{
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

    bookedBy:{
        type:String,
        required: true,    
    }
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;