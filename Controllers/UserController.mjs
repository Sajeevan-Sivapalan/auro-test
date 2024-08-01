import User from "../models/User.mjs";
import logger from "../utils/logger.mjs";
import bcrypt from "bcrypt";

export const CreateUser = async (req, res) => {
    const {username, password, role} = req.body;

    if(username == "") {
        logger.info("User name cannot be null");
        return res.status(400).json({ status: "User name cannot be null" });
    } if (!isValidEmail(username)) {
        logger.info("Invalid username format");
        return res.status(400).json({ status: "Invalid username format" });
    } else if(password == "") {
        logger.info("Password cannot be null");
        return res.status(400).json({ status: "Password cannot be null" });
    } else if(role == "") {
        logger.info("Role cannot be null");
        return res.status(400).json({ status: "Role cannot be null" });
    } if (role != "ADMIN" && role != "STUDENT" && role != "FACULTY") {
        logger.info("Invalid role");
        return res.status(400).json({ status: "Invalid role" });
    }

    const existingUser = await User.findOne({ username }); 
    if(existingUser) {
        logger.info("User already exists");
        return res.status(409).json({ status: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    User.create({username, password: hashedPassword, role})
    .then((User) => {
        logger.info("User created successfully");
        return res.status(200).json(User);
    })
    .catch((err) => {
        logger.error(`Error in CreateUser ${err}`);
        return res.status(500).json({ status: "Error", err });
      })
}

export const GetUser = (req, res) => {
    let objId = req.params.id;

    User.findById(objId)
    .then((User) => {
        logger.info("User found successfully");
        return res.status(200).json(User);
    })
    .catch((err) => {
        logger.error(`Error in GetUser ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const DeleteUser = (req, res) => {
    let objId = req.params.id;

    User.findByIdAndDelete(objId)
    .then(() => {
        logger.info("User deleted successfully");
        return res.status(200).json({ status: "Success", objId });
    })
    .catch((err) => {
        logger.error(`Error in DeleteUser ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const GetAllUser = (req, res) => {
    User.find()
    .then(User => {
        logger.info("All user found successfully");
        return res.status(200).json(User);
    })
    .catch((err) => {
        logger.error(`Error in GetAllUser ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const UpdateUser = async (req, res) => {
    let objId = req.params.id;
    const {username, password, role} = req.body;

    if(username == null) {
        logger.info("User name cannot be null");
        return res.status(400).json({ status: "User name cannot be null" });
    } else if(password == null) {
        logger.info("Password cannot be null");
        return res.status(400).json({ status: "Password cannot be null" });
    } else if(role == null) {
        logger.info("Role cannot be null");
        return res.status(400).json({ status: "Role cannot be null" });
    } if (role != "ADMIN" && role != "STUDENT" && role != "FACULTY") {
        logger.info("Invalid role");
        return res.status(400).json({ status: "Invalid role" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    User.findById(objId)
    .then((User) => {
        User.username = username;
        User.password = hashedPassword;
        User.role = role;
        User.save()
        .then(User => {
            logger.info("User updated successfully");
            return res.status(200).json(User);
        })
        .catch((err) => {
            logger.error(`Error in UpdateUser ${err}`);
            return res.status(500).json({ status: "Error", err });
        });  
    })
    .catch((err) => {
        logger.error(`Error in GetUser ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
