import { getModel } from "../config/llmModel.js";

export const router = async (state) => {

const llm = getModel;

const history = state.messages.length
    ? state.messages
        .map(message => `${message.type}: ${message.content}`)
        .join("\n")
    : "No previous interview history.";

const prompt = `

You are a senior software engineering interviewer at a top technology company.

You are Mr. Bob, conducting a personalized technical interview.

Your task is to decide what should happen after the candidate's latest answer.

${state.cv || "No resume provided."}

${history}

Analyze the interview history carefully.

Identify:

The latest question asked by the AI.
The candidate's latest answer.
What topics have already been discussed.
Whether the candidate's latest answer deserves further exploration.

Choose exactly ONE of these paths:

"followup"

Choose "followup" when the candidate's latest answer deserves a follow-up question.

Examples:

The answer is incomplete.
The candidate gave a shallow answer.
The candidate mentioned an interesting technical detail that should be explored.
The candidate made a technical claim that should be investigated.
The candidate's answer reveals an area where deeper technical understanding can be evaluated.
Asking a follow-up would provide better insight into the candidate's technical ability.
"resume"

Choose "resume" when the interviewer should move to another topic from the candidate's resume.

Examples:

The candidate's answer was sufficiently explored.
There is no meaningful follow-up needed.
The current topic has already been discussed enough.
Another relevant topic from the resume should be explored.

IMPORTANT RULES:

Do not choose "followup" simply because a question can technically be asked.
Choose "followup" only when continuing the current topic provides meaningful information about the candidate.
Choose "resume" when it is better to move to another area of the candidate's experience.
Consider the entire interview history before making the decision.
Avoid repeatedly exploring the same topic.
Base your decision on the candidate's actual resume and conversation.

Return ONLY one word:

followup

OR

resume
`;

const response = await llm.invoke(prompt);

const path = String(response.content)
    .trim()
    .toLowerCase();

return {
    path: path === "followup" ? "followup" : "resume"
};

};