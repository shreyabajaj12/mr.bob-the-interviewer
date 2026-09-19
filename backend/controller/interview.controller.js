import {v4 as uuidv4} from "uuid";

import { processInterview } from "../service/interview.service.js";
import Message from "../model/message.model.js";
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

        res.cookie("interview_session",conversationId,{
            httpOnly :true,
            sameSite:"lax"
        })

        res.status(201).json({question:firstQuestion});

    } catch (error) {
        res.status(500).json({error:error.message});
        console.log(error)
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

export const getCurrentInterview=async(req,res)=>{
    try{
        const conversationId=req.cookies.interview_session;
    
        if(!conversationId){
            return res.status(401).json({
                error:"No active interview"
            });
        }
        const conversation=await Conversation.findOne({conversationId});
        if(!conversation){
              console.log("❌ CONVERSATION NOT FOUND");

            return res.status(401).json({
                error:"Invalid interview session"
            })
        }
        console.log("✅ CONVERSATION FOUND");

        const latestQuestion =await Message.findOne({
            conversationId,
            responseBy:"agent"
        })
        .sort({createdAt: -1})

        return res.status(200).json({
            success:true,
            conversationId,
            question:latestQuestion?.message || null
        })
    }
    catch(error){
         console.error("❌ CURRENT INTERVIEW ERROR:", error);
        console.error(error)

        return res.status(500).json({
            error: error.message
        })
    }
}

export const endInterview=async(req,res)=>{
    try {
        const conversationId=req.cookies.interview_session
        if(!conversationId){
            return res.status(401).json({
                error:"No active interview"
            });
        }
        const conversation=await Conversation.findOne({conversationId});
        if(!conversation){
            console.log("conversation not found");
            return res.status(401).json({
                error:"Invalid interview session"
            })
        }
        const messages=await Message
                        .find({conversationId})
                        .sort({createdAt:1})

        res.clearCookie("interview_session");
        return res.status(200).json({
            success:true,
            conversationId,
            transcript:messages
        })

    } catch (error) {
        console.error("❌ CURRENT INTERVIEW ERROR:", error);
        console.error(error)

        return res.status(500).json({
            error: error.message
        })
    }
}