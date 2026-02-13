import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";


import albumsRouter from './albums/albums.routes';
import artistsRouter from './artists/artists.routes';
import logger from "./middleware/logger.middleware";

dotenv.config()

const app = express();
const port = process.env.PORT;

if (process.env.NODE_ENV == 'development') {
    app.use(logger);
    console.log(process.env.GREETING + " in dev mode");
}

app.use(express.json()); // parse json bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
app.use(cors());  // cors requests
app.use(helmet()); // security

app.get('/', (req: Request, res: Response) => {
    res.send('Music API');
});

app.use('/', [albumsRouter, artistsRouter]);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(process.env.GREETING);
});