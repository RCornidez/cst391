import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

dotenv.config()

import userRouter from "./features/users/users.routes";
import apiKeysRouter from "./features/api-keys/api-keys.routes";

import logger from "./middleware/logger.middleware";

const app = express();
const port = process.env.PORT;

if (process.env.NODE_ENV == 'development') {
    app.use(logger);
    console.log("in dev mode");
}

app.use(express.json()); // parse json bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
app.use(cookieParser()); // parse cookies
app.use(cors());  // cors requests
app.use(helmet()); // security

app.get('/', (req: Request, res: Response) => {
    res.send('MobileForge API');
});

app.use('/', [userRouter, apiKeysRouter]);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});