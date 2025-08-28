
export async function ensureHighlightStyles(page) {
	await page.addStyleTag({
		content: `
            .agent-highlight {
                position: relative !important;
                transition: box-shadow 0.2s ease;
                z-index: 2147483646 !important;
            }
            .agent-highlight::after {
                content: "";
                position: absolute;
                pointer-events: none;
                inset: -4px;
                border-radius: 10px;
                border: 3px solid transparent;
                border-image: linear-gradient(45deg, #ff7a18, #ffb347) 1;
                box-shadow: 0 0 0 2px rgba(255,122,24,0.25), 0 0 12px rgba(255,122,24,0.6);
                animation: agent-highlight-pulse 1.2s ease-in-out infinite;
            }
            @keyframes agent-highlight-pulse {
                0% { box-shadow: 0 0 0 2px rgba(255,122,24,0.25), 0 0 8px rgba(255,122,24,0.5); }
                50% { box-shadow: 0 0 0 3px rgba(255,122,24,0.35), 0 0 16px rgba(255,122,24,0.75); }
                100% { box-shadow: 0 0 0 2px rgba(255,122,24,0.25), 0 0 8px rgba(255,122,24,0.5); }
            }
        `
	});
}

export async function addHighlight(page, selector) {
	await ensureHighlightStyles(page);
	const elementHandle = await page.$(selector);
	if (!elementHandle) return;
	try { await elementHandle.scrollIntoViewIfNeeded(); } catch {}
	await elementHandle.evaluate(el => el.classList.add('agent-highlight'));
}

export async function removeHighlight(page, selector) {
	const elementHandle = await page.$(selector);
	if (!elementHandle) return;
	await elementHandle.evaluate(el => el.classList.remove('agent-highlight'));
}