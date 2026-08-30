import { AIMessage, HumanMessage } from "@langchain/core/messages";
import Message from "../model/message.model.js"

export const getConversationMessages =async(conversationId)=>{
    const messages =await Message.find({conversationId})
    .sort({createdAt:1})
return messages.map((msg)=>{
    if(msg.responseBy==="human"){
        return new HumanMessage(msg.message);
    }
    return new AIMessage(msg.message)
})
}
export const addMessage =async(
    conversationId,
    message,
    responseBy
)=>{
    const newMessage =await Message.create({
        conversationId,
        message,
        responseBy
    });
    return newMessage
}
