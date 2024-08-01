import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from 'cookie-parser';
import logger from "./utils/logger.mjs";
import databaseConnection from "./config/database.mjs";
import AuthRoute from "./routes/AuthRoute.mjs";
import UserRoute from "./routes/UserRoute.mjs";
import UserRoleRoute from "./routes/UserRoleRoute.mjs";
import CourseRoute from "./routes/CourseRoute.mjs";
import TimetableRoute from "./routes/TimetableRoute.mjs";
import RoomAndResourceRoute from "./routes/RoomAndResourceRoute.mjs";
import BookingRoute from "./routes/BookingRoute.mjs";
import EnrollmentRoute from "./routes/EnrollmentRoute.mjs";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/swaggerConfig.mjs";

const app = express();
const PORT = process.env.PORT || "8080";
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieparser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", AuthRoute);
app.use("/user", UserRoute);
app.use("/role", UserRoleRoute);
app.use("/course", CourseRoute);
app.use("/timetable", TimetableRoute);
app.use("/roomAndResource", RoomAndResourceRoute);
app.use("/booking", BookingRoute);
app.use("/enrollment", EnrollmentRoute);

app.listen(PORT, () => {
    logger.info(`Server is up and running on port ${PORT}`);
    databaseConnection();
})

export default app;
