import { AIMessage } from "@langchain/core/messages";
import { getDecider, getModel } from "../config/llmModel.js"

export const resume = async (state) => {
   const llm = getDecider;

   const history = state.messages?.length ? state.messages
      .slice(-6)
      .map(message => `${message.type}: ${message.content}`)
      .join("\n")
      : "No previous interview history"

   const prompt = `
      You are Mr. Bob, a technical interviewer.

      Candidate resume:
      ${state.cv || "No resume provided."}

      Recent interview:
      ${history}

      Ask exactly ONE technical interview question.

      Rules:
      - Ask about something present in the resume.
      - Prefer projects, technologies, implementation decisions, or debugging.
      - Do not repeat a previous question.
      - Be specific and conversational.
      - Ask only one question.
      - Do not explain the question.
      - Return only the question.
      `;

   const response = await llm.invoke(prompt);


console.log("FULL LLM RESPONSE:", response);
console.log("CONTENT:", response.content);
   return {
      messages: [
         new AIMessage(String(response.content).trim())
      ]
   }
}