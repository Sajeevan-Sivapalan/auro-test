import Course from "../models/Course.mjs";
import Enrollment from "../models/Enrollment.mjs";
import User from "../models/User.mjs";
import logger from "../utils/logger.mjs";

export const CreateEnrollment = async (req, res) => {
    const {studentId, courseId} = req.body;

    if(studentId == "") {
        logger.info("Student ID cannot be null");
        return res.status(400).json({ status: "Student ID cannot be null" });
    } else if(courseId == "") {
        logger.info("Course ID cannot be null");
        return res.status(400).json({ status: "Course ID cannot be null" });
    }

    const user = await User.findById(studentId);
    if (!user) {
        logger.info("User not found");
        return res.status(404).json({ status: "User not found" });
    } else if(user.role != "STUDENT") {
        logger.info("User not a student");
        return res.status(403).json({ status: "User not a student" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
        logger.info("Course not found");
        return res.status(404).json({ status: "Course not found" });
    }

    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if(existingEnrollment) {
        logger.info("Already enrolled in the course ");
        return res.status(409).json({ status: "Already enrolled in the course" });
    }

    Enrollment.create({studentId, courseId})
    .then((Enrollment) => {
        logger.info("Enrollment created successfully");
        return res.status(200).json(Enrollment);
    })
    .catch((err) => {
        logger.error(`Error in CreateEnrollment ${err}`);
        return res.status(500).json({ status: "Error", err });
      })
}

export const GetEnrollment = (req, res) => {
    let objId = req.params.id;

    Enrollment.findById(objId)
    .then((Enrollment) => {
        logger.info("Enrollment found successfully");
        return res.status(200).json(Enrollment);
    })
    .catch((err) => {
        logger.error(`Error in GetEnrollment ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const DeleteEnrollment = (req, res) => {
    let objId = req.params.id;

    Enrollment.findByIdAndDelete(objId)
    .then(() => {
        logger.info("Enrollment deleted successfully");
        return res.status(200).json({ status: "Success", objId });
    })
    .catch((err) => {
        logger.error(`Error in DeleteEnrollment ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const GetAllEnrollment = (req, res) => {
    Enrollment.find()
    .then(Enrollment => {
        logger.info("All enrollment found successfully");
        return res.status(200).json(Enrollment);
    })
    .catch((err) => {
        logger.error(`Error in GetAllEnrollment ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const GetAllEnrollmentByStudent = (req, res) => {
    let studentId = req.params.id;

    Enrollment.find({ studentId })
    .then(Enrollment => {
        logger.info("All student enrollment found successfully");
        return res.status(200).json(Enrollment);
    })
    .catch((err) => {
        logger.error(`Error in GetAllEnrollmentByStudent ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}

export const GetAllEnrollmentByCourse = (req, res) => {
    let courseId = req.params.id;

    Enrollment.find({ courseId })
    .then(Enrollment => {
        logger.info("All course enrollment found successfully");
        return res.status(200).json(Enrollment);
    })
    .catch((err) => {
        logger.error(`Error in GetAllEnrollmentByCourse ${err}`);
        return res.status(500).json({ status: "Error", err });
    });
}
