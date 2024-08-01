import { Router } from "express";
import { CreateBooking, GetBooking, DeleteBooking, GetAllBooking, UpdateBooking } from "../Controllers/BookingController.mjs";
import { VerifyRole } from "../Controllers/AuthController.mjs";

const route = Router();

route.post('/', VerifyRole("1"), CreateBooking);
route.get('/:id', VerifyRole("1"), GetBooking);
route.delete('/:id', VerifyRole("1"), DeleteBooking);
route.get('/', VerifyRole("1"), GetAllBooking);
route.put('/:id', VerifyRole("1"), UpdateBooking);

export default route;