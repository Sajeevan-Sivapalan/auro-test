import { CreateUserRole, GetAllUserRole, DeleteUserRole, UpdateUserRole } from '../Controllers/UserRoleController.mjs';
import logger from '../utils/logger.mjs';
import UserRole from '../models/UserRole.mjs';

const req = {
    params: {
        id: '65eaec06b6602d2f6f0718a4'
    },
    body: {
        role: 'admin',
        access: ["FACULTY"]
    }
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

jest.mock('../models/UserRole.mjs', () => ({
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    findByIdAndDelete: jest.fn()
}));

jest.mock('../utils/logger.mjs', () => ({
    info: jest.fn(),
    error: jest.fn()
}));

describe('CreateUserRole function', () => {
    it('should create a new user role', async () => {
        const userRoleData = { ...req.body };

        UserRole.create.mockResolvedValue(userRoleData);

        await CreateUserRole(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(userRoleData);
        expect(logger.info).toHaveBeenCalledWith('User role created successfully');
    });

    it('should return error if role is null', async () => {
        const reqWithNullRole = { ...req, body: { ...req.body, role: '' } };

        await CreateUserRole(reqWithNullRole, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ status: "Role cannot be null" });
        expect(logger.info).toHaveBeenCalledWith('Role cannot be null');
    });

    it('should return error if access is null', async () => {
        const reqWithNullAccess = { ...req, body: { ...req.body, access: '' } };

        await CreateUserRole(reqWithNullAccess, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ status: "Access cannot be null" });
        expect(logger.info).toHaveBeenCalledWith('Access cannot be null');
    });
});

describe('GetAllUserRole function', () => {
    it('should get all user roles', async () => {
        const userRolesData = [{ id: 1, role: 'admin', access: 'full' }, { id: 2, role: 'user', access: 'limited' }];
        UserRole.find.mockResolvedValue(userRolesData);

        await GetAllUserRole(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(userRolesData);
        expect(logger.info).toHaveBeenCalledWith('All user role found successfully');
    });
});

describe('DeleteUserRole function', () => {
    it('should delete a userRole', async () => {
        const mockDeletedUserRole = { _id: req.params.id };

        UserRole.findByIdAndDelete.mockResolvedValue(mockDeletedUserRole);

        await DeleteUserRole(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: "Success", objId: req.params.id });
        expect(logger.info).toHaveBeenCalledWith('User role deleted successfully');
    });
});

describe('UpdateUserRole function', () => {
    it('should update a userRole', async () => {
        const mockExistingUserRole = null;

        UserRole.findById.mockResolvedValue({
            ...req.body,
            save: jest.fn().mockResolvedValue({ ...req.body })
        });
        UserRole.findOne.mockResolvedValue(mockExistingUserRole);

        await UpdateUserRole(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });
});