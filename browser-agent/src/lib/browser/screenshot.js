
export async function captureScreenshot(page) {
  const buffer = await page.screenshot({ fullPage: true });
  return buffer.toString("base64"); // send as base64 for API/LLM
}
