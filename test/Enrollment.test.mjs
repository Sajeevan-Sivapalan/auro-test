import { CreateEnrollment, GetAllEnrollment, DeleteEnrollment } from '../Controllers/EnrollmentController.mjs';
import Enrollment from '../models/Enrollment.mjs';
import logger from '../utils/logger.mjs';
import User from '../models/User.mjs';
import Course from '../models/Course.mjs';

const req = {
    params: {
        id: '65eaec06b6602d2f6f0718a4'
    },
    body: {
        courseId: '65eaec06b6602d2f6f0718a4',
        studentId: '65eeebdaf2a8a01ca6e1fbf5'
    }
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

jest.mock('../models/Enrollment.mjs', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndDelete: jest.fn()
}));

jest.mock('../models/User.mjs', () => ({
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn()
}));

jest.mock('../models/Course.mjs', () => ({
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn()
}));


jest.mock('../utils/logger.mjs', () => ({
    info: jest.fn(),
    error: jest.fn()
}));

describe('CreateEnrollment function', () => {
    it('should create a new enrollment', async () => {
        const mockUser = { _id: 'studentId', role: 'STUDENT' };
        const mockCourse = { _id: 'courseId' };
        
        User.findById.mockResolvedValue(mockUser);
        Course.findById.mockResolvedValue(mockCourse);
        Enrollment.findOne.mockResolvedValue(null);
        Enrollment.create.mockResolvedValue(req.body);

        await CreateEnrollment(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(req.body);
        expect(logger.info).toHaveBeenCalledWith('Enrollment created successfully');
    });
});

describe('GetAllEnrollment function', () => {
    it('should get all enrollments', async () => {
        const enrollmentsData = [{ id: 1, studentId: 'student1', courseId: 'course1' }, { id: 2, studentId: 'student2', courseId: 'course2' }];
        Enrollment.find.mockResolvedValue(enrollmentsData);

        await GetAllEnrollment(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(enrollmentsData);
        expect(logger.info).toHaveBeenCalledWith('All enrollment found successfully');
    });
});

describe('DeleteEnrollment function', () => {
    it('should delete a enrollment', async () => {
        const mockDeletedEnrollment = { _id: req.params.id };

        Enrollment.findByIdAndDelete.mockResolvedValue(mockDeletedEnrollment);

        await DeleteEnrollment(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: "Success", objId: req.params.id });
        expect(logger.info).toHaveBeenCalledWith('Enrollment deleted successfully');
    });
});