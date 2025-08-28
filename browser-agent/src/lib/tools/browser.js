import { tool } from "@openai/agents";
import { chromium } from "playwright";
import { z } from "zod";
import { extractDOMSnapshot } from "../browser/domSummary";
import { captureScreenshot } from "../browser/screenshot";
import userContext from "../userContext";
import { addHighlight, removeHighlight } from "../browser/highlight";
import { typeInto } from "../browser/typing";

let browser = null;
let page = null;

export const initBrowser = tool({
    name: "initBrowser",
    description: "Initialize the browser and return the page",
    parameters: z.object({}),
    execute: async () => {
        console.log("Initializing browser");
        browser = await chromium.launch({ headless: false });
        page = await browser.newPage();
        return page;
    },
});

export const closeBrowser = tool({
    name: "closeBrowser",
    description: "Close the browser",
    parameters: z.object({}),
    execute: async () => {
        console.log("Closing browser");
        await browser.close();
        browser = null;
        page = null;
    },
});

export const navigateTo = tool({
    name: "navigateTo",
    description: "Navigate to a URL",
    parameters: z.object({
        url: z.string().describe("The URL to navigate to")
    }),
    execute: async ({ url }) => {
        console.log("Navigating to ", url);
        await page.goto(url);
        return `Navigated to ${url}`;
    },
});

export const extractDOMSnapshotTool = tool({
    name: "extractDOMSnapshot",
    description: "Extract the DOM snapshot of the current page",
    parameters: z.object({}),
    execute: async () => {
        console.log("Extracting DOM snapshot");
        return await extractDOMSnapshot(page);
    },
});

export const captureScreenshotTool = tool({
    name: "captureScreenshot",
    description: "Capture a screenshot of the current page and return it as a base64 string",
    parameters: z.object({}),
    execute: async () => {
        console.log("Capturing screenshot");
        return await captureScreenshot(page);
    },
});

export const clickElementTool = tool({
    name: "clickElement",
    description: "Click on a specific element on the page by its selector",
    parameters: z.object({
        selector: z.string(),
    }),
    execute: async ({ selector }) => {
        console.log("Clicking element ", selector);
        await addHighlight(page, selector);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.click(selector);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await removeHighlight(page, selector);
        return `Clicked element ${selector}`;
    },
});

export const scrollToPositionTool = tool({
    name: "scrollToPosition",
    description: "Scroll the page to a specific x and y position. You can use positive or negative values for x and y. Scroll to the either horizontal or vertical center of the page.",
    parameters: z.object({
        x: z.number().describe("The horizontal position to scroll to (can be negative)"),
        y: z.number().describe("The vertical position to scroll to (can be negative)"),
    }),
    execute: async ({ x, y }) => {
        console.log(`Scrolling to position x: ${x}, y: ${y}`);
        await page.evaluate(({ x, y }) => {
            window.scrollTo(x, y);
        }, { x, y });
        return `Scrolled to position x: ${x}, y: ${y}`;
    },
});

export const fillInputTool = tool({
    name: "fillInput",
    description: "Fill an input field with a specific value by its selector",
    parameters: z.object({
        selector: z.string(),
        value: z.string(),
        typingDelay: z.number().describe("The delay between each keystroke in milliseconds").optional().default(100),
    }),
    execute: async ({ selector, value, typingDelay }) => {
        console.log("Filling input ", selector, " with value ", value);
        await addHighlight(page, selector);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await typeInto(page, selector, value, typingDelay);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await removeHighlight(page, selector);
        return `Filled input ${selector} with value ${value}`;
    },
});

export const userContextTool = tool({
    name: "userContext",
    description: "Get the user context. This is the context of the user that is currently logged in to the browser.",
    parameters: z.object({}),
    execute: async () => {
        return JSON.stringify(userContext);
    },
})