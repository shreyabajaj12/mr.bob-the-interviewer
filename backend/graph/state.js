import { Annotation, messagesStateReducer } from "@langchain/langgraph";

export const agentState =Annotation.Root({
    conversationId:Annotation(),
    path:Annotation(),
    cv:Annotation(),
    messages: Annotation({
        reducer: messagesStateReducer,
        default: () => []
    }),
})