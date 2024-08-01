import Timetable from "../models/Timetable.mjs";
import logger from "../utils/logger.mjs";
import User from "../models/User.mjs";
import Course from "../models/Course.mjs";
import Enrollment from "../models/Enrollment.mjs";
import nodemailer from "nodemailer";

export const CreateTimetable = async (req, res) => {
    const {course, startTime, endTime, faculty, location} = req.body;

    if(course == "") {
        logger.info("Course cannot be null");
        return res.status(400).json({ status: "Course cannot be null" });
    } else if(startTime == "") {
        logger.info("Start time cannot be null");
        return res.status(400).json({ status: "Start time cannot be null" });
    } else if(endTime == "") {
        logger.info("End time cannot be null");
        return res.status(400).json({ status: "End time cannot be null" });
    } else if(faculty == "") {
        logger.info("Faculty cannot be null");
        return res.status(400).json({ status: "Faculty cannot be null" });
    } else if(location == "") {
        logger.info("Location cannot be null");
        return res.status(400).json({ status: "Location cannot be null" });
    }

    if (startTime >= endTime) {
        logger.info("Start time must be greater than end time");
        return res.status(400).json({ status: "Start time must be greater than end time" });
    }

    const user = await User.findById(faculty);
    if (!user) {
        logger.info("User not found");
        return res.status(404).json({ status: "User not found" });
    } else if(user.role != "FACULTY") {
        logger.info("User not a faculty");
        return res.status(403).json({ status: "User not a faculty" });
    }

    const course1 = await Course.findById(course);
    if (!course1) {
        logger.info("Course not found");
        return res.status(404).json({ status: "Course not found" });
    }

    const existingTimetable = await Timetable.findOne({
        $or: [
            { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
            { startTime: { $lte: endTime }, endTime: { $gte: endTime } },
            { startTime: { $gte: startTime }, endTime: { $lte: endTime } }
        ]
    });

    if (existingTimetable) {
        logger.info("Another timetable exists for the given time range");
        return res.status(409).json({ status: "Another timetable exists for the given time range" });
    }

    Timetable.create({course, startTime, endTime, faculty, location})
    .then((Timetable) => {
        logger.info("Timetable created successfully");
        return res.status(200).json(Timetable);
    })
    .catch((err) => {
        logger.error(`Error in CreateTimetable ${err}`);
        return res.status(500).json({ status: "Error", err });
      })
}

export const GetTimetable = (req, res) => {
    let objId = req.params.id;

    Timetable.findById(objId)
    .then((Timetable) => {
        logger.info("Timetable found successfully");
        return res.status(200).json(Timetable);
    })
    .catch((err) => {
        logger.error(`Error in GetTimetable ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const DeleteTimetable = (req, res) => {
    let objId = req.params.id;

    Timetable.findByIdAndDelete(objId)
    .then(() => {
        logger.info("Timetable deleted successfully");
        return res.status(200).json({ status: "Success", objId });
    })
    .catch((err) => {
        logger.error(`Error in DeleteTimetable ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const GetAllTimetable = (req, res) => {
    Timetable.find()
    .then(Timetable => {
        logger.info("All timetable found successfully");
        return res.status(200).json(Timetable);
    })
    .catch((err) => {
        logger.error(`Error in GetAllTimetable ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const UpdateTimetable = async (req, res) => {
    let objId = req.params.id;
    const {course, startTime, endTime, faculty, location} = req.body;
    
    if(course == null) {
        logger.info("Course cannot be null");
        return res.status(400).json({ status: "Course cannot be null" });
    } else if(startTime == "") {
        logger.info("Start time cannot be null");
        return res.status(400).json({ status: "Start time cannot be null" });
    } else if(endTime == "") {
        logger.info("End time cannot be null");
        return res.status(400).json({ status: "End time cannot be null" });
    } if(faculty == null) {
        logger.info("Faculty cannot be null");
        return res.status(400).json({ status: "Faculty cannot be null" });
    } else if(location == null) {
        logger.info("Location cannot be null");
        return res.status(400).json({ status: "Location cannot be null" });
    }

    const user = await User.findById(faculty);
    if (!user) {
        logger.info("User not found");
        return res.status(404).json({ status: "User not found" });
    } else if(user.role != "FACULTY") {
        logger.info("User not a faculty");
        return res.status(403).json({ status: "User not a faculty" });
    }

    const course1 = await Course.findById(course);
    if (!course1) {
        logger.info("Course not found");
        return res.status(404).json({ status: "Course not found" });
    }

    const existingTimetable = await Timetable.findOne({
        $or: [
            { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
            { startTime: { $lte: endTime }, endTime: { $gte: endTime } },
            { startTime: { $gte: startTime }, endTime: { $lte: endTime } }
        ]
    });

    if (existingTimetable) {
        logger.info("Another timetable exists for the given time range");
        return res.status(409).json({ status: "Another timetable exists for the given time range" });
    }

    let timetable = null;
    Timetable.findById(objId)
    .then((Timetable) => {
        Timetable.course = course;
        Timetable.startTime = startTime;
        Timetable.endTime = endTime;
        Timetable.faculty = faculty;
        Timetable.location = location;
        Timetable.save()
        .then(Timetable => {
            logger.info("Timetable updated successfully");
            timetable = Timetable;
            //return res.status(200).json(Timetable);
        })
        .catch((err) => {
            logger.error(`Error in UpdateTimetable ${err}`);
            return res.status(500).json({ status: "Error", err });
        });  
    })
    .catch((err) => {
        logger.error(`Error in GetTimetable ${err}`);
        return res.status(500).json({ status: "Error", err });
    });

    const enrollments = await Enrollment.find({ courseId: course });
    
    for (const enrollment of enrollments) {
        const user = await User.findById(enrollment.studentId);
        const facultyName = await User.findById(timetable.faculty);
        const courseName = await Course.findById(course);
        if (user) {

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
                subject: "The timetable has been updated.",
                text:
                  "Course : " + courseName.code +
                  "\nTime : " + timetable.time +
                  "\nFaculty : " + facultyName.username + 
                  "\nLocation : " + timetable.location
              };

              transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    logger.error(`Error in UpdateTimetable(send mail) ${err}`);
                    return res.status(500).json({ status: "Error", err });
                } else {
                    logger.info("Email sent :" + info.response);
                }
              });
        } else {
            console.log("User not found");
        }
    }

    return res.status(200).json(timetable);
    
}

export const GetAllTimetableByCourse = (req, res) => {
    let objId = req.params.id;

    Timetable.find({course : objId})
    .then((Timetable) => {
        logger.info("Timetable found successfully");
        return res.status(200).json(Timetable);
    })
    .catch((err) => {
        logger.error(`Error in GetTimetable ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}