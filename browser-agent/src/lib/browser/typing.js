
export async function typeInto(page, selector, text, delay = 100) {
    await page.click(selector, { timeout: 5000 });
    await page.type(selector, text, { delay });
}