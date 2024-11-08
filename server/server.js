import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors";

import connectDB from './config/db.js';
import routes from "./routes/index.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use('/api', routes);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT} in ${process.env.MODE} mode`);
});
