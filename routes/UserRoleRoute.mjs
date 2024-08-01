import { Router } from "express";
import { CreateUserRole, GetUserRole, DeleteUserRole, GetAllUserRole, UpdateUserRole } from "../Controllers/UserRoleController.mjs";
import { VerifyRole } from "../Controllers/AuthController.mjs";

const route = Router();

route.post('/', VerifyRole("3"), CreateUserRole);
route.get('/:id', VerifyRole("3"), GetUserRole);
route.delete('/:id', VerifyRole("3"), DeleteUserRole);
route.get('/', VerifyRole("3"), GetAllUserRole);
route.put('/:id', VerifyRole("3"), UpdateUserRole);

export default route;