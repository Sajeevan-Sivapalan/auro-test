import { Router } from "express";
import { CreateEnrollment, GetEnrollment, DeleteEnrollment, GetAllEnrollment, GetAllEnrollmentByStudent, GetAllEnrollmentByCourse } from "../Controllers/EnrollmentController.mjs";
import { VerifyRole } from "../Controllers/AuthController.mjs";

const route = Router();

route.post('/', VerifyRole("1"), CreateEnrollment);
route.get('/:id', VerifyRole("1"), GetEnrollment);
route.delete('/:id', VerifyRole("2"), DeleteEnrollment);
route.get('/', VerifyRole("1"), GetAllEnrollment);
route.get('/student/:id', VerifyRole("2"), GetAllEnrollmentByStudent);
route.get('/course/:id', VerifyRole("2"), GetAllEnrollmentByCourse);

export default route;