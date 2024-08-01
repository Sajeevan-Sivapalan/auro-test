import { CreateCourse, GetAllCourse, DeleteCourse, UpdateCourse } from '../Controllers/CourseController.mjs';
import Course from '../models/Course.mjs';
import logger from '../utils/logger.mjs';

const req = {
    params: {
        id: '65eaec06b6602d2f6f0718a4'
    },
    body: {
        name: 'Test Course',
        code: 'TEST123',
        description: 'This is a test course',
        credits: 3
    }
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

jest.mock('../models/Course.mjs', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn()
}));

jest.mock('../utils/logger.mjs', () => ({
    info: jest.fn(),
    error: jest.fn()
}));

describe('CreateCourse function', () => {
    it('should create a new course', async () => {
        Course.findOne.mockResolvedValue(null);

        const createdCourse = req.body;
        Course.create.mockResolvedValue(createdCourse);

        await CreateCourse(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(createdCourse);
        expect(logger.info).toHaveBeenCalledWith('Course created successfully');
    });
});


describe('GetAllCourse function', () => {
    it('should get all courses', async () => {
        const coursesData = [{ name: 'Course 1' }, { name: 'Course 2' }];
        Course.find.mockResolvedValue(coursesData);

        await GetAllCourse(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(coursesData);
        expect(logger.info).toHaveBeenCalledWith('All course found successfully');
    });
});

describe('DeleteCourse function', () => {
    it('should delete a course', async () => {
        const mockDeletedCourse = { _id: req.params.id };

        Course.findByIdAndDelete.mockResolvedValue(mockDeletedCourse);

        await DeleteCourse(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: "Success", objId: req.params.id });
        expect(logger.info).toHaveBeenCalledWith('Course deleted successfully');
    });
});

describe('UpdateCourse function', () => {
    it('should update a course', async () => {
        const mockExistingCourse = null;

        Course.findById.mockResolvedValue({
            ...req.body,
            save: jest.fn().mockResolvedValue({ ...req.body })
        });
        Course.findOne.mockResolvedValue(mockExistingCourse);

        await UpdateCourse(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });
});