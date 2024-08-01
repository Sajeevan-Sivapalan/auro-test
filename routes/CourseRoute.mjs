import { Router } from "express";
import { CreateCourse, GetCourse, DeleteCourse, GetAllCourse, UpdateCourse, AssignFaculty, SendAnnouncements } from "../Controllers/CourseController.mjs";
import { VerifyRole } from "../Controllers/AuthController.mjs";

const route = Router();

route.post('/', VerifyRole("2"), CreateCourse);
route.get('/:id', VerifyRole("1"), GetCourse);
route.delete('/:id', VerifyRole("2"), DeleteCourse);
route.get('/', VerifyRole("1"), GetAllCourse);
route.put('/:id', VerifyRole("2"), UpdateCourse);
route.put('/assign-faculty/:id', VerifyRole("3"), AssignFaculty);
route.post('/announcements', VerifyRole("2"), SendAnnouncements);

export default route;