import UserRole from "../models/UserRole.mjs";
import logger from "../utils/logger.mjs";

export const CreateUserRole = (req, res) => {
    const {role, access} = req.body;

    if(role == "") {
        logger.info("Role cannot be null");
        return res.status(400).json({ status: "Role cannot be null" });
    } if (access == "") {
        logger.info("Access cannot be null");
        return res.status(400).json({ status: "Access cannot be null" });
    }

    UserRole.create({role, access})
    .then((UserRole) => {
        logger.info("User role created successfully");
        return res.status(200).json(UserRole);
    })
    .catch((err) => {
        logger.error(`Error in CreateUserRole ${err}`);
        return res.status(500).json({ status: "Error", err });
      })
}

export const GetUserRole = (req, res) => {
    let objId = req.params.id;

    UserRole.findById(objId)
    .then((UserRole) => {
        logger.info("User role found successfully");
        return res.status(200).json(UserRole);
    })
    .catch((err) => {
        logger.error(`Error in GetUserRole ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const DeleteUserRole = (req, res) => {
    let objId = req.params.id;

    UserRole.findByIdAndDelete(objId)
    .then(() => {
        logger.info("User role deleted successfully");
        return res.status(200).json({ status: "Success", objId });
    })
    .catch((err) => {
        logger.error(`Error in DeleteUserRole ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const GetAllUserRole = (req, res) => {
    UserRole.find()
    .then(UserRole => {
        logger.info("All user role found successfully");
        return res.status(200).json(UserRole);
    })
    .catch((err) => {
        logger.error(`Error in GetAllUserRole ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const UpdateUserRole = (req, res) => {
    let objId = req.params.id;
    const {role, access} = req.body;
    
    if(role == "") {
        logger.info("Role cannot be null");
        return res.status(400).json({ status: "Role cannot be null" });
    } if (access == "") {
        logger.info("Access cannot be null");
        return res.status(400).json({ status: "Access cannot be null" });
    }
    
    UserRole.findById(objId)
    .then((UserRole) => {
        UserRole.role = role;
        UserRole.access = access;
        UserRole.save()
        .then(UserRole => {
            logger.info("User updated successfully");
            return res.status(200).json(UserRole);
        })
        .catch((err) => {
            logger.error(`Error in UpdateUserRole ${err}`);
            return res.status(500).json({ status: "Error", err });
        });  
    })
    .catch((err) => {
        logger.error(`Error in GetUserRole ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}