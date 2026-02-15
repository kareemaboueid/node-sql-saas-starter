import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

// initialize express app
const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("/{*path}", cors());

export default app;
