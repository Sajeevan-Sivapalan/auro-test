import { Router } from "express";
import { CreateUser, GetUser, DeleteUser, GetAllUser, UpdateUser } from "../Controllers/UserController.mjs";
import { VerifyRole } from "../Controllers/AuthController.mjs";

const route = Router();

route.post('/', VerifyRole("3"), CreateUser);
route.get('/:id', VerifyRole("3"), GetUser);
route.delete('/:id', VerifyRole("3"), DeleteUser);
route.get('/', VerifyRole("3"), GetAllUser);
route.put('/:id', VerifyRole("3"), UpdateUser);

export default route;