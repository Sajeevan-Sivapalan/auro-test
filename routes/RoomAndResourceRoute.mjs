import { Router } from "express";
import { CreateRoomAndResource, GetRoomAndResource, DeleteRoomAndResource, GetAllRoomAndResource, UpdateRoomAndResource } from "../Controllers/RoomAndResourceController.mjs";
import { VerifyRole } from "../Controllers/AuthController.mjs";

const route = Router();

route.post('/', VerifyRole("3"), CreateRoomAndResource);
route.get('/:id', VerifyRole("1"), GetRoomAndResource);
route.delete('/:id', VerifyRole("3"), DeleteRoomAndResource);
route.get('/', VerifyRole("1"), GetAllRoomAndResource);
route.put('/:id', VerifyRole("3"), UpdateRoomAndResource);

export default route;