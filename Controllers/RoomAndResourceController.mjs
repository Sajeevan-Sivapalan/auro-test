import RoomAndResource from "../models/RoomAndResource.mjs";
import logger from "../utils/logger.mjs";

export const CreateRoomAndResource = async (req, res) => {
    const {name} = req.body;

    if(name == "") {
        logger.info("Name cannot be null");
        return res.status(400).json({ status: "Name cannot be null" });
    }

    const roomAndResource = await RoomAndResource.findOne({name});
    if (roomAndResource) {
        logger.info("Room and resource already exists");
        return res.status(409).json({ status: "Room and resource already exists" });
    }

    RoomAndResource.create({name})
    .then((RoomAndResource) => {
        logger.info("RoomAndResource created successfully");
        return res.status(200).json(RoomAndResource);
    })
    .catch((err) => {
        logger.error(`Error in CreateRoomAndResource ${err}`);
        return res.status(500).json({ status: "Error", err });
      })
}

export const GetRoomAndResource = (req, res) => {
    let objId = req.params.id;

    RoomAndResource.findById(objId)
    .then((RoomAndResource) => {
        logger.info("RoomAndResource found successfully");
        return res.status(200).json(RoomAndResource);
    })
    .catch((err) => {
        logger.error(`Error in GetRoomAndResource ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const DeleteRoomAndResource = (req, res) => {
    let objId = req.params.id;

    RoomAndResource.findByIdAndDelete(objId)
    .then(() => {
        logger.info("RoomAndResource deleted successfully");
        return res.status(200).json({ status: "Success", objId });
    })
    .catch((err) => {
        logger.error(`Error in DeleteRoomAndResource ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const GetAllRoomAndResource = (req, res) => {
    RoomAndResource.find()
    .then(RoomAndResource => {
        logger.info("All room and resource found successfully");
        return res.status(200).json(RoomAndResource);
    })
    .catch((err) => {
        logger.error(`Error in GetAllRoomAndResource ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const UpdateRoomAndResource = async (req, res) => {
    let objId = req.params.id;
    const { name } = req.body;
    
    if(name == null) {
        logger.info("Name cannot be null");
        return res.status(400).json({ status: "Name cannot be null" });
    }

    const roomAndResource = await RoomAndResource.findOne({name});
    if (roomAndResource) {
        logger.info("Room and resource already exists");
        return res.status(409).json({ status: "Room and resource already exists" });
    }
    
    RoomAndResource.findById(objId)
    .then((RoomAndResource) => {
        RoomAndResource.name = name;
        RoomAndResource.save()
        .then(RoomAndResource => {
            logger.info("RoomAndResource updated successfully");
            return res.status(200).json(RoomAndResource);
        })
        .catch((err) => {
            logger.error(`Error in UpdateRoomAndResource ${err}`);
            return res.status(500).json({ status: "Error", err });
        });  
    })
    .catch((err) => {
        logger.error(`Error in GetRoomAndResource ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}
