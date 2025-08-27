// export async function extractPageSummary(page) {
    
//     const visibleText = await page.evaluate(() => {
//       return document.body.innerText.slice(0, 2000); // 2k chars max
//     });
  
//     // Get clickable elements (buttons, links, inputs)
//     const elements = await page.evaluate(() => {
//       const els = [];
//       const selectors = ["a", "button", "input", "textarea", "select"];
      
//       selectors.forEach(tagName => {
//         const elementsOfType = document.querySelectorAll(tagName);
//         elementsOfType.forEach((el) => {
//           const rect = el.getBoundingClientRect();
//           if (rect.width > 0 && rect.height > 0) {
//             // Generate multiple selector options for reliability
//             const selectorOptions = [];
            
//             // Option 1: Text-based selector using :has-text (most reliable)
//             if (el.innerText && el.innerText.trim()) {
//               const text = el.innerText.trim().slice(0, 30);
//               selectorOptions.push(`${tagName}:has-text("${text}")`);
//             }
            
//             // Option 2: ID-based selector (most specific)
//             if (el.id) {
//               selectorOptions.push(`#${el.id}`);
//             }
            
//             // Option 3: Class-based selector
//             if (el.className && el.className.trim()) {
//               const classes = el.className.trim().split(/\s+/);
//               classes.forEach(cls => {
//                 if (cls && cls !== '') {
//                   selectorOptions.push(`${tagName}.${cls}`);
//                 }
//               });
//             }
            
//             // Option 4: Attribute-based selectors
//             if (el.tagName.toLowerCase() === 'input') {
//               if (el.getAttribute('placeholder')) {
//                 selectorOptions.push(`${tagName}[placeholder*="${el.getAttribute('placeholder').slice(0, 20)}"]`);
//               }
//               if (el.getAttribute('type')) {
//                 selectorOptions.push(`${tagName}[type="${el.getAttribute('type')}"]`);
//               }
//               if (el.getAttribute('name')) {
//                 selectorOptions.push(`${tagName}[name="${el.getAttribute('name')}"]`);
//               }
//             } else if (el.tagName.toLowerCase() === 'a' && el.getAttribute('href')) {
//               const href = el.getAttribute('href');
//               if (href !== '#' && href !== 'javascript:void(0)') {
//                 selectorOptions.push(`${tagName}[href*="${href.slice(0, 30)}"]`);
//               }
//             }
            
//             // Option 5: Position-based fallback
//             let count = 0;
//             let sibling = el.previousElementSibling;
//             while (sibling) {
//               if (sibling.tagName.toLowerCase() === tagName) {
//                 count++;
//               }
//               sibling = sibling.previousElementSibling;
//             }
//             selectorOptions.push(`${tagName}:nth-of-type(${count + 1})`);
            
//             // Use the first available selector (prioritized by reliability)
//             const selector = selectorOptions[0] || `${tagName}`;
            
//             els.push({
//               tag: el.tagName.toLowerCase(),
//               text: el.innerText || el.getAttribute("value") || "",
//               type: el.getAttribute("type") || "",
//               selector: selector,
//               // Include all options for debugging
//               allSelectors: selectorOptions,
//             });
//           }
//         });
//       });
      
//       return els.slice(0, 30); // limit to avoid overload
//     });
  
//     return { visibleText, elements };
//   }

import { d2Snap } from "@surfly/d2snap";

export async function extractPageSummary(page) {
  // Read the D2Snap browser script content and inject it
  const fs = require('fs');
  const path = require('path');
  const d2snapScriptPath = path.join(process.cwd(), 'node_modules/@surfly/d2snap/dist/D2Snap.browser.js');
  const d2snapScript = fs.readFileSync(d2snapScriptPath, 'utf8');

  // Inject the script content directly into the page
  await page.addScriptTag({
    content: d2snapScript
  });

  const snapshot = await page.evaluate(async () => {
    // Now D2Snap should be available on window
    if (typeof window.D2Snap === 'undefined' || typeof window.D2Snap.d2Snap === 'undefined') {
      throw new Error('D2Snap not loaded properly');
    }
    
    const snapshot = await window.D2Snap.d2Snap(0.4, 0.5, 0.6);
    console.log("Snapshot:", snapshot);
    return snapshot;
  });

  console.log( "Snapshot :", snapshot);

  return { visibleText: "test", elements: "test" };
}