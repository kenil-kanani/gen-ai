import { Agent , run , setDefaultOpenAIClient } from "@openai/agents";
import AzureOpenAIClient from "@/app/lib/azureOpenAIClient";

setDefaultOpenAIClient(AzureOpenAIClient);

const CodingAgent = new Agent({
    name: "Coading Agent",
    instructions: "You are a coding agent that can help with coding tasks.",
})

let messages = [];

export async function POST(req){
    try {
        const { query } = await req.json();
        const result = await run(
            CodingAgent, 
            messages.concat({
                role: "user",
                content: query,
            })
        );

        messages = result.history;

        console.log("History: ", result.history);
        console.log("Final Output: ", result.finalOutput);
        return Response.json({ message: result.finalOutput });
    } catch (error) {
        console.error("Error: ", error);
        return Response.json({ message: "Error" }, { status: 500 });
    }
}