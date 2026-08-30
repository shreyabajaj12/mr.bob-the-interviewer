import {v4 as uuidv4} from "uuid";

import { processInterview } from "../service/interview.service.js";
import Conversation from "../model/conversation.model.js";
export const startInterview =async(req,res)=>{
    try {
        const {resumeText}=req.body;
        if(!resumeText){
            return res.status(400).json({error:"resumeText is required"})
        }

        const conversationId =uuidv4()
        await Conversation.create({conversationId,resumeText});

        const firstQuestion =await processInterview(conversationId,null);
        res.status(201).json({conversationId,question:firstQuestion});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
export const chat =async(req,res)=>{
    try{
        const {conversationId,answer}=req.body;
        if(!conversationId || !answer){
            return res.status(400).json({error:"conversationId and answer is  required"});
        }

        const nextQuesiton=await processInterview(conversationId,answer);
        res.status(200).json({question:nextQuesiton});
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}