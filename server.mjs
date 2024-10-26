import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from 'cookie-parser';
import logger from "./utils/logger.mjs";
import databaseConnection from "./config/database.mjs";
import RoverRoutes from "./routes/RoverRoutes.mjs";

const app = express();
const PORT = process.env.PORT || "8080";
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieparser());

app.use("/", RoverRoutes);

app.listen(PORT, () => {
    logger.info(`Server is up and running on port ${PORT}`);
    databaseConnection();
})

export default app;
