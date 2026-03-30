import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

dotenv.config()

import userRouter from "./features/users/users.routes";
import apiKeysRouter from "./features/api-keys/api-keys.routes";
import billingInfoRouter from "./features/billing-info/billing-info.routes";
import provisionsRouter from "./features/provisions/provisions.routes";
import userSubscriptionsRouter from "./features/user-subscriptions/user-subscriptions.routes";
import billsRouter from "./features/bills/bills.routes";

import logger from "./middleware/logger.middleware";

const app = express();
const port = Number(process.env.PORT);

if (process.env.NODE_ENV == 'development') {
    app.use(logger);
    console.log("in dev mode");
}

app.use(express.json()); // parse json bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
app.use(cookieParser()); // parse cookies
app.use(cors({ origin: "http://10.0.0.69:5173", credentials: true }));  // cors requests
app.use(helmet()); // security

app.get('/', (req: Request, res: Response) => {
    res.send('MobileForge API');
});

app.use('/', [
    userRouter, 
    apiKeysRouter, 
    billingInfoRouter, 
    provisionsRouter,
    userSubscriptionsRouter,
    billsRouter
]);

app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`)
});