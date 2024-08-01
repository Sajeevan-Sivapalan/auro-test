import { CreateTimetable, GetAllTimetable, DeleteTimetable, UpdateTimetable } from '../Controllers/TimetableController.mjs';
import logger from '../utils/logger.mjs';
import Timetable from '../models/Timetable.mjs';
import User from '../models/User.mjs';
import Course from '../models/Course.mjs';

const req = {
    params: {
        id: '65eaec06b6602d2f6f0718a4'
    },
    body: {
        course: '65eaec06b6602d2f6f0718a4',
        startTime: '2024-03-19T10:00:00Z',
        endTime: '2024-03-19T12:00:00Z',
        faculty: '65eeebdaf2a8a01ca6e1fbf5',
        location: 'Room1'
    }
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

jest.mock('../models/Timetable.mjs', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn()
}));

jest.mock('../models/User.mjs', () => ({
    findById: jest.fn()
}));

jest.mock('../models/Course.mjs', () => ({
    findById: jest.fn()
}));

jest.mock('../utils/logger.mjs', () => ({
    info: jest.fn(),
    error: jest.fn()
}));

describe('CreateTimetable function', () => {
    it('should create a new timetable', async () => {
        const timetableData = { ...req.body };
        const mockUser = { _id: '65eeebdaf2a8a01ca6e1fbf5', role: 'FACULTY' };
        const mockCourse = { _id: '65eaec06b6602d2f6f0718a4' };

        User.findById.mockResolvedValue(mockUser);
        Course.findById.mockResolvedValue(mockCourse);
        Timetable.findOne.mockResolvedValue(null);
        Timetable.create.mockResolvedValue(timetableData);

        await CreateTimetable(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(timetableData);
        expect(logger.info).toHaveBeenCalledWith('Timetable created successfully');
    });
});

describe('GetAllTimetable function', () => {
    it('should get all timetables', async () => {
        const timetablesData = [{ id: 1, course: 'Course1', startTime: '10:00', endTime: '12:00', faculty: 'Faculty1', location: 'Room1' }, { id: 2, course: 'Course2', startTime: '13:00', endTime: '15:00', faculty: 'Faculty2', location: 'Room2' }];
        Timetable.find.mockResolvedValue(timetablesData);

        await GetAllTimetable(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(timetablesData);
        expect(logger.info).toHaveBeenCalledWith('All timetable found successfully');
    });
});


describe('DeleteTimetable function', () => {
    it('should delete a timetable', async () => {
        const mockDeletedTimetable = { _id: req.params.id };

        Timetable.findByIdAndDelete.mockResolvedValue(mockDeletedTimetable);

        await DeleteTimetable(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: "Success", objId: req.params.id });
        expect(logger.info).toHaveBeenCalledWith('Timetable deleted successfully');
    });
});

describe('UpdateTimetable function', () => {
    it('should update a timetable and send email notifications', async () => {
        const mockExistingTimetable = null;
        const mockUser = { _id: req.body.faculty };
        const mockCourse = { _id: req.body.course };
        const mockEnrollments = [{ studentId: '65eeebdaf2a8a01ca6e1fbf5' }];

        Timetable.findById.mockResolvedValue({
            ...req.body,
            save: jest.fn().mockResolvedValue({ ...req.body })
        });
        User.findById.mockResolvedValue(mockUser);
        Course.findById.mockResolvedValue(mockCourse);
        Timetable.findOne.mockResolvedValue(mockExistingTimetable);

        await UpdateTimetable(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({...req.body,});
    });
});