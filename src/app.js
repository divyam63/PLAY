import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));
app.use(express.json({limit: '10mb'}));
//for read urlencoded data %20 for space
app.use(express.urlencoded({ extended: true }));
//for read cookie data
app.use(cookieParser());

export default app;
