import { ChatGroq } from "@langchain/groq"
import dotenv from "dotenv"

dotenv.config()
const groq = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
});

export const getModel =groq;