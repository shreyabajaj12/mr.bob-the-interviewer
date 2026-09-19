import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import interviewRoutes from "./route/interview.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser";

dotenv.config();

const app =express();

connectDB();

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());

app.use("/api/interview",interviewRoutes);

app.get("/",(req,res)=>{
    res.send("Mr Bob is running 🚀");
})

const port = process.env.PORT

app.listen(port, () => {
console.log(`Server running on port ${port}`);
});

