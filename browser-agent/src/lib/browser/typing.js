import { addHighlight, removeHighlight } from "./highlight";

export async function typeInto(page, selector, text, delay = 100) {
    await addHighlight(page, selector);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.click(selector, { timeout: 5000 });
    await page.type(selector, text, { delay });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await removeHighlight(page, selector);
}