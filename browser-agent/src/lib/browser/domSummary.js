
export async function extractDOMSnapshot(page) {
  // Read the D2Snap browser script content and inject it
  // const fs = require('fs');
  // const path = require('path');
  // const d2snapScriptPath = path.join(process.cwd(), 'node_modules/@surfly/d2snap/dist/D2Snap.browser.js');
  // const d2snapScript = fs.readFileSync(d2snapScriptPath, 'utf8');

  // // Inject the script content directly into the page
  // await page.addScriptTag({
  //   content: d2snapScript
  // });

  // const snapshot = await page.evaluate(async () => {
  //   // Now D2Snap should be available on window
  //   if (typeof window.D2Snap === 'undefined' || typeof window.D2Snap.d2Snap === 'undefined') {
  //     throw new Error('D2Snap not loaded properly');
  //   }
    
  //   const snapshot = await window.D2Snap.d2Snap(0.4, 0.5, 0.6);
  //   return snapshot;
  // });

  // console.log( "Snapshot Extracted Successfully" , snapshot.serializedHtml );

  // return snapshot.serializedHtml;
  return await page.content();
}