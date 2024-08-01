import { CreateRoomAndResource, GetAllRoomAndResource, DeleteRoomAndResource, UpdateRoomAndResource } from '../Controllers/RoomAndResourceController.mjs';
import logger from '../utils/logger.mjs';
import RoomAndResource from '../models/RoomAndResource.mjs';

const req = {
    params: {
        id: '65eaec06b6602d2f6f0718a4'
    },
    body: {
        name: 'roomAndResource2'
    }
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

jest.mock('../models/RoomAndResource.mjs', () => ({
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

describe('CreateRoomAndResource function', () => {
    it('should create a new room and resource', async () => {
        const roomAndResourceData = { name: 'roomAndResource2' };
        RoomAndResource.findOne.mockResolvedValue(null);
        RoomAndResource.create.mockResolvedValue(roomAndResourceData);

        await CreateRoomAndResource(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(roomAndResourceData);
        expect(logger.info).toHaveBeenCalledWith('RoomAndResource created successfully');
    });
});

describe('GetAllRoomAndResource function', () => {
    it('should get all room and resources', async () => {
        const roomAndResourcesData = [{ id: 1, name: 'Room1' }, { id: 2, name: 'Room2' }];
        RoomAndResource.find.mockResolvedValue(roomAndResourcesData);

        await GetAllRoomAndResource(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(roomAndResourcesData);
        expect(logger.info).toHaveBeenCalledWith('All room and resource found successfully');
    });
});

describe('DeleteRoomAndResource function', () => {
    it('should delete a roomAndResource', async () => {
        const mockDeletedRoomAndResource = { _id: req.params.id };

        RoomAndResource.findByIdAndDelete.mockResolvedValue(mockDeletedRoomAndResource);

        await DeleteRoomAndResource(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: "Success", objId: req.params.id });
        expect(logger.info).toHaveBeenCalledWith('RoomAndResource deleted successfully');
    });
});

describe('UpdateRoomAndResource function', () => {
    it('should update a roomAndResource', async () => {
        const mockExistingRoomAndResource = null;

        RoomAndResource.findById.mockResolvedValue({
            ...req.body,
            save: jest.fn().mockResolvedValue({ ...req.body })
        });
        RoomAndResource.findOne.mockResolvedValue(mockExistingRoomAndResource);

        await UpdateRoomAndResource(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });
});