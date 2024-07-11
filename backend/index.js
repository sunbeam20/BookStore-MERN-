import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// 1) Allow all origins with default of cors
// app.use(cors());
// 2) Allow custom origins
app.use(cors({
    origin: 'https://book-store-mern-frontend-seven.vercel.app',  // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    credentials: true  // Allow cookies for authenticated requests (if applicable)
}));

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welocome to MERN Stack Tutorial')
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        });
    }).catch((error) => {
        console.log(error);
    });
