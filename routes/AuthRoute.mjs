import { Router } from "express";
import { Login, Refresh } from "../Controllers/AuthController.mjs";

const route = Router();

route.post('/login', Login);
route.post('/refresh', Refresh);

export default route;