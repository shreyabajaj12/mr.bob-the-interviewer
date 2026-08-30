import { graph } from "./graph/graph.js";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

const initialState = {
conversationId: "test-123",

cv: `
    Rahul is a software engineer with 3 years of experience.
    He has worked with Java, Spring Boot, MongoDB and Redis.
    He recently built a payment processing system using Spring Boot
    and MongoDB.
`,

messages: [
],

path: null


};

const result = await graph.invoke(initialState);

console.log("\n========== FINAL STATE ==========\n");

console.log("Path:", result.path);

console.log("\nMessages:");

result.messages.forEach((message, index) => {
console.log(`${index + 1}. ${message.type}: ${message.content}`);
});
