import { Router } from "express";
import { CreateTimetable, GetTimetable, DeleteTimetable, GetAllTimetable, UpdateTimetable, GetAllTimetableByCourse } from "../Controllers/TimetableController.mjs";
import { VerifyRole } from "../Controllers/AuthController.mjs";

const route = Router();

route.post('/', VerifyRole("2"), CreateTimetable);
route.get('/:id', VerifyRole("1"), GetTimetable);
route.delete('/:id', VerifyRole("2"), DeleteTimetable);
route.get('/', VerifyRole("1"), GetAllTimetable);
route.put('/:id', VerifyRole("2"), UpdateTimetable);
route.get('/course/:id', VerifyRole("1"), GetAllTimetableByCourse); 

export default route;