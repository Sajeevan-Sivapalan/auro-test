import mongoose from 'mongoose';

const roverSchema = new mongoose.Schema({
    client: { 
        type: String, 
        required: true 
    },

    country: { 
        type: String, 
        required: true 
    },

    date: { 
        type: Date, 
        required: true 
    },

    material: { 
        type: String, 
        required: true 
    },
    
    serial_number: { 
        type: String,
        required: true 
    },

    time: { 
        type: String, 
        required: true 
    }
});

export default mongoose.model('Rover', roverSchema);
