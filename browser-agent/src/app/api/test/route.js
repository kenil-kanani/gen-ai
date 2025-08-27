import { extractPageSummary } from "@/lib/browser/domSummary";
import { chromium } from "playwright";


let browser = null;
let page = null;

async function initBrowser() {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    return page;
}

async function closeBrowser() {
    await browser.close();
    browser = null;
    page = null;
}

export async function GET(request) {

    try {
        await initBrowser();
        await page.goto("https://ui.chaicode.com");
        const result = await extractPageSummary(page);
        await closeBrowser();
        return new Response(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}