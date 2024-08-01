import Booking from "../models/Booking.mjs";
import User from "../models/User.mjs";
import logger from "../utils/logger.mjs";

export const CreateBooking = async (req, res) => {
    const {RoomAndResourceId, startTime, endTime, bookedBy} = req.body;

    if(RoomAndResourceId == "") {
        logger.info("RoomAndResourceId cannot be null");
        return res.status(400).json({ status: "RoomAndResourceId cannot be null" });
    } else if(startTime == "") {
        logger.info("Start time cannot be null");
        return res.status(400).json({ status: "Start time cannot be null" });
    } else if(endTime == "") {
        logger.info("End time cannot be null");
        return res.status(400).json({ status: "End time cannot be null" });
    } else if(bookedBy == "") {
        logger.info("Booked by cannot be null");
        return res.status(400).json({ status: "Booked by cannot be null" });
    }

    const user = await User.findById(bookedBy);
    if (!user) {
        logger.info("User not found");
        return res.status(404).json({ status: "User not found" });
    }

    if (startTime >= endTime) {
        logger.info("Start time must be greater than end time");
        return res.status(400).json({ status: "Start time must be greater than end time" });
    }

    const existingBooking = await Booking.findOne({
        RoomAndResourceId,
        $or: [
            { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
            { startTime: { $lte: endTime }, endTime: { $gte: endTime } },
            { startTime: { $gte: startTime }, endTime: { $lte: endTime } }
        ]
    });

    if (existingBooking) {
        logger.info("Another booking exists for the given RoomAndResourceId and time range");
        return res.status(409).json({ status: "Another booking exists for the given time range" });
    }

    Booking.create({RoomAndResourceId, startTime, endTime, bookedBy})
    .then((Booking) => {
        logger.info("Booking created successfully");
        return res.status(200).json(Booking);
    })
    .catch((err) => {
        logger.error(`Error in CreateBooking ${err}`);
        return res.status(500).json({ status: "Error", err });
      })
}

export const GetBooking = (req, res) => {
    let objId = req.params.id;

    Booking.findById(objId)
    .then((Booking) => {
        logger.info("Booking found successfully");
        return res.status(200).json(Booking);
    })
    .catch((err) => {
        logger.error(`Error in GetBooking ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const DeleteBooking = (req, res) => {
    let objId = req.params.id;

    Booking.findByIdAndDelete(objId)
    .then(() => {
        logger.info("Booking deleted successfully");
        return res.status(200).json({ status: "Success", objId });
    })
    .catch((err) => {
        logger.error(`Error in DeleteBooking ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const GetAllBooking = (req, res) => {
    Booking.find()
    .then(Booking => {
        logger.info("All booking found successfully");
        return res.status(200).json(Booking);
    })
    .catch((err) => {
        logger.error(`Error in GetAllBooking ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const UpdateBooking = async (req, res) => {
    let objId = req.params.id;
    const {RoomAndResourceId, startTime, endTime, bookedBy} = req.body;
    
    if(RoomAndResourceId == null) {
        logger.info("RoomAndResourceId cannot be null");
        return res.status(400).json({ status: "RoomAndResourceId cannot be null" });
    } else if(startTime == null) {
        logger.info("Start time cannot be null");
        return res.status(400).json({ status: "Start time cannot be null" });
    } else if(endTime == null) {
        logger.info("End time cannot be null");
        return res.status(400).json({ status: "End time cannot be null" });
    } else if(bookedBy == null) {
        logger.info("Booked by cannot be null");
        return res.status(400).json({ status: "Booked by cannot be null" });
    }
    
    const user = await User.findById(bookedBy);
    if (!user) {
        logger.info("User not found");
        return res.status(404).json({ status: "User not found" });
    }

    if (startTime >= endTime) {
        logger.info("Start time must be greater than end time");
        return res.status(400).json({ status: "Start time must be greater than end time" });
    }

    const existingBooking = await Booking.findOne({
        RoomAndResourceId,
        $or: [
            { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
            { startTime: { $lte: endTime }, endTime: { $gte: endTime } },
            { startTime: { $gte: startTime }, endTime: { $lte: endTime } }
        ]
    });

    if (existingBooking) {
        logger.info("Another booking exists for the given RoomAndResourceId and time range");
        return res.status(409).json({ status: "Another booking exists for the given time range" });
    }


    Booking.findById(objId)
    .then((Booking) => {
        Booking.RoomAndResourceId = RoomAndResourceId;
        Booking.startTime = startTime;
        Booking.endTime = endTime;
        Booking.bookedBy = bookedBy;
        Booking.save()
        .then(Booking => {
            logger.info("Booking updated successfully");
            return res.status(200).json(Booking);
        })
        .catch((err) => {
            logger.error(`Error in UpdateBooking ${err}`);
            return res.status(500).json({ status: "Error", err });
        });  
    })
    .catch((err) => {
        logger.error(`Error in GetBooking ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}
