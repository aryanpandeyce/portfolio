import fs from "fs";
import { chromium } from "playwright";

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Rounded retro terminal card -->
  <rect x="2" y="2" width="60" height="60" rx="14" fill="#1A1917"/>
  <rect x="2" y="2" width="60" height="60" rx="14" fill="none" stroke="#D97757" stroke-width="3"/>
  <!-- Terminal screen area -->
  <rect x="8" y="8" width="48" height="48" rx="8" fill="#272623" stroke="#383631" stroke-width="1.5"/>
  <!-- Status LED green dot in top right -->
  <circle cx="48" cy="16" r="3" fill="#27C93F"/>
  <!-- Command prompt > -->
  <path d="M14 20 L20 25 L14 30" fill="none" stroke="#27C93F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Monogram AP -->
  <text x="23" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'JetBrains Mono', monospace" font-size="22" font-weight="900" fill="#FAF8F5" letter-spacing="-1">AP</text>
  <!-- Mini cursor underline -->
  <rect x="14" y="38" width="5" height="2" fill="#D97757"/>
</svg>`;

async function generate() {
  console.log("Generating SVG favicons...");
  fs.writeFileSync("app/icon.svg", svgContent, "utf8");
  fs.writeFileSync("public/icon.svg", svgContent, "utf8");
  fs.writeFileSync("public/file.svg", svgContent, "utf8");

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set content to SVG
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;">${svgContent}</body></html>`);
  
  const element = await page.locator("svg");
  const pngBuffer = await element.screenshot({ omitBackground: true });
  
  // Create 32x32 PNG for standard ICO
  await page.setViewportSize({ width: 64, height: 64 });
  const png32 = await element.screenshot({ omitBackground: true });
  
  // Assemble standard ICO with PNG payload
  // Header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(1, 4); // 1 image
  
  // Directory entry: 16 bytes
  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(64, 0); // width
  dirEntry.writeUInt8(64, 1); // height
  dirEntry.writeUInt8(0, 2);  // color palette
  dirEntry.writeUInt8(0, 3);  // reserved
  dirEntry.writeUInt16LE(1, 4); // color planes
  dirEntry.writeUInt16LE(32, 6); // bits per pixel
  dirEntry.writeUInt32LE(png32.length, 8); // size of image
  dirEntry.writeUInt32LE(22, 12); // offset of image data (6 + 16 = 22)
  
  const icoBuffer = Buffer.concat([header, dirEntry, png32]);
  
  fs.writeFileSync("app/favicon.ico", icoBuffer);
  fs.writeFileSync("public/favicon.ico", icoBuffer);
  fs.writeFileSync("public/apple-touch-icon.png", pngBuffer);
  
  console.log("Favicon generated successfully!");
  await browser.close();
}

generate().catch(err => {
  console.error("Error generating favicon:", err);
  process.exit(1);
});
