import { ChatGroq } from "@langchain/groq"
import dotenv from "dotenv"

dotenv.config()
const groq = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "qwen/qwen3.6-27b",
});

export const getModel =groq;