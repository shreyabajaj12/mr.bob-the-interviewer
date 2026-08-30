import express from "express"
import { chat, startInterview } from "../controller/interview.controller.js";

const router =express.Router();

router.post("/start",startInterview)

router.post("/chat",chat);

export default router