import express from "express"
import { chat, endInterview, getCurrentInterview, startInterview } from "../controller/interview.controller.js";

const router =express.Router();

router.post("/start",startInterview)
router.get("/current",getCurrentInterview)
router.post("/chat",chat);
router.post("/end",endInterview)

export default router