import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import interviewRoutes from "./route/interview.routes.js"
dotenv.config();

const app =express();

connectDB();

app.use(express.json())

app.use("/api/interview",interviewRoutes);

app.get("/",(req,res)=>{
    res.send("Mr Bob is running 🚀");
})

const port = process.env.PORT

app.listen(port, () => {
console.log(`Server running on port ${port}`);
});

