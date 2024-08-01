import { CreateBooking, GetAllBooking, DeleteBooking, UpdateBooking } from '../Controllers/BookingController.mjs';
import Booking from '../models/Booking.mjs';
import logger from '../utils/logger.mjs';
import User from '../models/User.mjs';

const req = {
    params: {
        id: '65eaec06b6602d2f6f0718a4'
    },
    body: {
        RoomAndResourceId: '65eafccc9f09259c842dcef1',
        startTime: '2024-03-19T10:00:00Z',
        endTime: '2024-03-19T12:00:00Z',
        bookedBy: '65eeebebf2a8a01ca6e1fbf8'
    }
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

jest.mock('../models/Booking.mjs', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn()
}));

jest.mock('../models/User.mjs', () => ({
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn()
}));


jest.mock('../utils/logger.mjs', () => ({
    info: jest.fn(),
    error: jest.fn()
}));

describe('CreateBooking function', () => {
    it('should create a new booking', async () => {
        User.findById.mockResolvedValue({ _id: req.body.bookedBy });

        Booking.findOne.mockResolvedValue(null);
        Booking.create.mockResolvedValue(req.body);

        await CreateBooking(req, res);

        console.log("*******" + res.json._id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(req.body);
        expect(logger.info).toHaveBeenCalledWith('Booking created successfully');
    });

});

describe('GetAllBooking function', () => {
    it('should get all bookings', async () => {
        const bookingsData = [{ id: 1, RoomAndResourceId: 'Room1' }, { id: 2, RoomAndResourceId: 'Room2' }];
        Booking.find.mockResolvedValue(bookingsData);

        await GetAllBooking(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(bookingsData);
        expect(logger.info).toHaveBeenCalledWith('All booking found successfully');
    });
});

describe('DeleteBooking function', () => {
    it('should delete a booking', async () => {
        const mockDeletedBooking = { _id: req.params.id };

        Booking.findByIdAndDelete.mockResolvedValue(mockDeletedBooking);

        await DeleteBooking(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: "Success", objId: req.params.id });
        expect(logger.info).toHaveBeenCalledWith('Booking deleted successfully');
    });
});

describe('UpdateBooking function', () => {
    it('should update a booking', async () => {
        const mockExistingBooking = null;
        const mockUser = { _id: req.body.bookedBy };

        Booking.findById.mockResolvedValue({
            ...req.body,
            save: jest.fn().mockResolvedValue({ ...req.body })
        });
        User.findById.mockResolvedValue(mockUser);
        Booking.findOne.mockResolvedValue(mockExistingBooking);

        await UpdateBooking(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });
});