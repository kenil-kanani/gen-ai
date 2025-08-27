import { tool } from "@openai/agents";
import { chromium } from "playwright";
import { z } from "zod";
import { extractPageSummary } from "../browser/domSummary";
import { captureScreenshot } from "../browser/screenshot";

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

export const extractPageSummaryTool = tool({
    name: "extractPageSummary",
    description: "Extract the summary of the current page and the clickable elements on the page",
    parameters: z.object({}),
    execute: async () => {
        console.log("Extracting page summary");
        return await extractPageSummary(page);
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
        try {
            // Wait for element to be visible and clickable
            await page.waitForSelector(selector, { 
                state: 'visible',
                timeout: 10000 // 10 second timeout
            });
            
            // Ensure element is in viewport
            await page.evaluate((sel) => {
                const element = document.querySelector(sel);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, selector);
            
            // Click with retry mechanism
            await page.click(selector, { timeout: 5000 });
            return `Successfully clicked element: ${selector}`;
        } catch (error) {
            console.error(`Failed to click element ${selector}:`, error.message);
            
            // Try alternative click methods if the first fails
            try {
                await page.evaluate((sel) => {
                    const element = document.querySelector(sel);
                    if (element) {
                        element.click();
                    } else {
                        throw new Error('Element not found');
                    }
                }, selector);
                return `Successfully clicked element using alternative method: ${selector}`;
            } catch (fallbackError) {
                throw new Error(`Failed to click element '${selector}': ${fallbackError.message}`);
            }
        }
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
    }),
    execute: async ({ selector, value }) => {
        console.log("Filling input ", selector, " with value ", value);
        await page.fill(selector, value);
    },
});