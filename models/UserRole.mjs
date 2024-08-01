import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({  
    role:{
        type:String,
        required: true,
        unique:true,
    },

    access: [{
        type: String,
        required: true,
    }]
});

const UserRole = mongoose.model("UserRole", UserRoleSchema);

export default UserRole;