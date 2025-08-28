import { Agent , run , setDefaultOpenAIClient } from "@openai/agents";
import AzureOpenAIClient from "@/lib/azureOpenAIClient";
import { 
    // captureScreenshotTool, 
    clickElementTool, 
    fillInputTool, 
    initBrowser, 
    navigateTo,
    closeBrowser,
    scrollToPositionTool,
    extractDOMSnapshotTool,
    userContextTool,
} from "@/lib/tools/browser";

setDefaultOpenAIClient(AzureOpenAIClient);

const BrowserAgent = new Agent({
    name: "Browser Agent",
    instructions: `
        You are a browser agent that can help with browsing tasks. You can use the tools provided to you to navigate the web and perform tasks. Always generate CSS selectors using id or class. Do not use tag-only selectors like div, span, or button unless wrapped with class/id context.
        Use userContext to get the context of the user. Use that context to perform tasks, especially when filling forms.
        When filling the form, fill the fields one by one. Do not fill the fields in one go.
    `,
    tools: [
        initBrowser,
        navigateTo,
        extractDOMSnapshotTool,
        // captureScreenshotTool,
        clickElementTool,
        fillInputTool,
        closeBrowser,
        scrollToPositionTool,
        userContextTool,
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
            }),
            {
                maxTurns: 30
            }
        );

        messages = result.history;

        console.log("Final Output: ", result.finalOutput);
        return Response.json({ message: result.finalOutput });
    } catch (error) {
        console.error("Error: ", error);
        return Response.json({ message: "Error" }, { status: 500 });
    }
}