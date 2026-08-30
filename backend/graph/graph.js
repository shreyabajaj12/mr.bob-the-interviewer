import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";

import {router} from "../agent/router.agent.js"
import {followup} from "../agent/followup.agent.js"
import {resume} from "../agent/resume.agent.js"


const workflow =new StateGraph(agentState)
workflow.addNode("router",router)
workflow.addNode("followup",followup)
workflow.addNode("resume",resume)
workflow.addEdge("__start__","router")
workflow.addConditionalEdges("router",(state)=>state.path,{
    followup:"followup",
    resume:"resume"
    }
)
workflow.addEdge("followup","__end__")
workflow.addEdge("resume","__end__")

export const graph=workflow.compile();