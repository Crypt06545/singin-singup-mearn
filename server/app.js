import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors"
import bodyParser from "body-parser";
import { Server as socketIO } from "socket.io";
import mongoose, { mongo } from "mongoose";

import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.port || 5000;

// app config
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// socket config
const server = http.Server(app);
export const io = new socketIO(server);


//handle routings
app.use('/', authRoutes);




io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('greeting-from-server', {
        greeting: 'you loaded the page'
    });
})



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT, () => console.log(`listening to the port ${PORT}`))).catch(error => console.log(error))