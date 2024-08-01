import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoomAndResourceSchema = new Schema({  
    name:{
        type:String,
        required: true,
        unique:true,
    }
});

const RoomAndResource = mongoose.model("RoomAndResource", RoomAndResourceSchema);

export default RoomAndResource;