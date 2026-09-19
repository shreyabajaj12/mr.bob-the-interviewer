import { AIMessage } from "@langchain/core/messages";
import { getDecider} from "../config/llmModel.js";

export const followup = async (state) => {

    const llm = getDecider;

    const history = state.messages.length
        ? state.messages
            .map(message => `${message.type}: ${message.content}`)
            .join("\n")
        : "No previous interview history.";

    const prompt = `
        You are Mr. Bob, a technical interviewer.

        Recent exchange:
        ${history}

        Ask ONE concise follow-up question based specifically on the candidate's answer.

        Rules:
        - Stay on the same topic.
        - Ask about one specific detail.
        - Do not introduce a new topic.
        - Do not repeat the previous question.
        - Return only the question.
        `;

    const response = await llm.invoke(prompt);

    return {
        messages: [
            new AIMessage(String(response.content).trim())
        ]
    };

};
