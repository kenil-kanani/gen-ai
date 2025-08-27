import { Agent , run , setDefaultOpenAIClient } from "@openai/agents";
import AzureOpenAIClient from "@/lib/azureOpenAIClient";
import { 
    captureScreenshotTool, 
    clickElementTool, 
    extractPageSummaryTool, 
    fillInputTool, 
    initBrowser, 
    navigateTo,
    closeBrowser,
    scrollToPositionTool,
} from "@/lib/tools/browser";

setDefaultOpenAIClient(AzureOpenAIClient);

const BrowserAgent = new Agent({
    name: "Browser Agent",
    instructions: "You are a browser agent that can help with browsing tasks. You can use the tools provided to you to navigate the web and perform tasks.",
    tools: [
        initBrowser,
        navigateTo,
        extractPageSummaryTool,
        captureScreenshotTool,
        clickElementTool,
        fillInputTool,
        closeBrowser,
        scrollToPositionTool,
    ],
})

let messages = [];

export async function POST(req){
    try {
        const { query } = await req.json();

        const result = await run(
            BrowserAgent, 
            messages.concat({
                role: "user",
                content: query,
            })
        );

        messages = result.history;

        console.log("Final Output: ", result.finalOutput);
        return Response.json({ message: result.finalOutput });
    } catch (error) {
        console.error("Error: ", error);
        return Response.json({ message: "Error" }, { status: 500 });
    }
}