import { graph } from "../graph/graph.js";
import Conversation from "../model/conversation.model.js";
import { addMessage, getConversationMessages } from "./conversation.service"

export const processInterview =async(
    conversationId,
    candidateAnswer
)=>{
    if(candidateAnswer){
        await addMessage(
            conversationId,
            candidateAnswer,
            "human"
        );
    }

    const conversation =await Conversation.findOne({conversationId});

    if(!conversation){
        throw new Error("conversation not found")
    }

    const messages =await getConversationMessages(conversationId)

    const state={
        conversationId,
        cv:conversation.resumeText,
        messages
    }

    const result =await graph.invoke(state);

    const lastMessages = result.messages[result.messages.length-1];

    await addMessage(
        conversationId,
        lastMessages.content,
        "agent"
    )
    return lastMessages.content
}