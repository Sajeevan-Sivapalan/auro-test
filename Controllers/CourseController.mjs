import Course from "../models/Course.mjs";
import logger from "../utils/logger.mjs";
import Enrollment from "../models/Enrollment.mjs";
import User from "../models/User.mjs";
import nodemailer from "nodemailer";

export const CreateCourse = async (req, res) => {
    const {name, code, description, credits} = req.body;

    if(name == "") {
        logger.info("Name cannot be null");
        return res.status(400).json({ status: "Name cannot be null" });
    } else if(code == "") {
        logger.info("Code cannot be null");
        return res.status(400).json({ status: "Code cannot be null" });
    } else if(description == "") {
        logger.info("Description cannot be null");
        return res.status(400).json({ status: "Description cannot be null" });
    } else if(credits == "") {
        logger.info("Credits cannot be null");
        return res.status(400).json({ status: "Credits cannot be null" });
    } else if(isNaN(credits)){
        logger.info("Credits have to be a number");
        return res.status(400).json({ status: "Credits have to be a number" });
    }

    const course = await Course.findOne({code});
    if (course) {
        logger.info("Course already exists");
        return res.status(409).json({ status: "Course already exists" });
    }

    Course.create({name, code, description, credits})
    .then((Course) => {
        logger.info("Course created successfully");
        return res.status(200).json(Course);
    })
    .catch((err) => {
        logger.error(`Error in CreateCourse ${err}`);
        return res.status(500).json({ status: "Error", err });
      })
}

export const GetCourse = (req, res) => {
    let objId = req.params.id;

    Course.findById(objId)
    .then((Course) => {
        logger.info("Course found successfully");
        return res.status(200).json(Course);
    })
    .catch((err) => {
        logger.error(`Error in GetCourse ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const DeleteCourse = (req, res) => {
    let objId = req.params.id;

    Course.findByIdAndDelete(objId)
    .then(() => {
        logger.info("Course deleted successfully");
        return res.status(200).json({ status: "Success", objId });
    })
    .catch((err) => {
        logger.error(`Error in DeleteCourse ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const GetAllCourse = (req, res) => {
    Course.find()
    .then(Course => {
        logger.info("All course found successfully");
        return res.status(200).json(Course);
    })
    .catch((err) => {
        logger.error(`Error in GetAllCourse ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const UpdateCourse = async (req, res) => {
    let objId = req.params.id;
    const {name, code, description, credits} = req.body;

    if(name == null) {
        logger.info("Name cannot be null");
        return res.status(400).json({ status: "Name cannot be null" });
    } else if(code == null) {
        logger.info("Code cannot be null");
        return res.status(400).json({ status: "Code cannot be null" });
    } else if(description == null) {
        logger.info("Description cannot be null");
        return res.status(400).json({ status: "Description cannot be null" });
    } else if(credits == null) {
        logger.info("Credits cannot be null");
        return res.status(400).json({ status: "Credits cannot be null" });
    } else if(isNaN(credits)){
        logger.info("Credits have to be a number");
        return res.status(400).json({ status: "Credits have to be a number" });
    }
    
    const course = await Course.findOne({code});
    if (course && course.code != code) {
        logger.info("Course already exists");
        return res.status(409).json({ status: "Course already exists" });
    }

    Course.findById(objId)
    .then((Course) => {
        Course.name = name;
        Course.code = code;
        Course.description = description;
        Course.credits = credits;
        Course.save()
        .then(Course => {
            logger.info("Course updated successfully");
            return res.status(200).json(Course);
        })
        .catch((err) => {
            logger.error(`Error in UpdateCourse ${err}`);
            return res.status(500).json({ status: "Error", err });
        });  
    })
    .catch((err) => {
        logger.error(`Error in GetCourse ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const AssignFaculty = async (req, res) => {
    let objId = req.params.id;
    const {faculty} = req.body;
    
    if(faculty == null) {
        logger.info("Faculty cannot be null");
        return res.status(400).json({ status: "Faculty cannot be null" });
    }

    const user = await User.findById(faculty);
    if (!user) {
        logger.info("User not found");
        return res.status(404).json({ status: "User not found" });
    }
    
    if(user.role != "FACULTY") {
        logger.info("User not a faculty");
        return res.status(403).json({ status: "User not a faculty" });
    }

    Course.findById(objId)
    .then((Course) => {
        Course.faculty = faculty;
        
        Course.save()
        .then(Course => {
            logger.info("Course updated successfully (Assign Faculty)");
            return res.status(200).json(Course);
        })
        .catch((err) => {
            logger.error(`Error in AssignFaculty ${err}`);
            return res.status(500).json({ status: "Error", err });
        });  
    })
    .catch((err) => {
        logger.error(`Error in GetCourse ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const SendAnnouncements = async (req, res) => {
    const {code, message} = req.body;

    if(code == "") {
        logger.info("Code cannot be null");
        return res.status(400).json({ status: "Code cannot be null" });
    } else if(message == "") {
        logger.info("Message cannot be null");
        return res.status(400).json({ status: "Message cannot be null" });
    }

    const course = await Course.findOne({code});
    
    if (!course) {
        logger.info("Course not exist");
        return res.status(409).json({ status: "Course not exist" });
    }

    const enrollments = await Enrollment.find( {courseId : course._id.toString()});

    if(!enrollments) {
        logger.info("No enrollments found for this course");
        return res.status(409).json({ status: "No enrollments found for this course" });
    }

    for (const enrollment of enrollments) {
        const user = await User.findById(enrollment.studentId);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            },
            tls: {
            rejectUnauthorized: false,
            },
        });

        const mailOptions = {
            from: "nonamenecessary0612@gmail.com",
            to: [user.username],
            subject: "Course Announcement",
            text:
            "Announcement : " + message
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                logger.error(`Error in UpdateTimetable(send mail) ${err}`);
                return res.status(500).json({ status: "Error", err });
            } else {
                logger.info("Email sent :" + info.response);
            }
        });

        return res.status(200).json({ status: "Successfully mailed sent to every enrolled student" });
    }
}