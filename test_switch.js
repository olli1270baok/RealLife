const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const htmlContent = fs.readFileSync('./src/app/app/anzeigen-cockpit/page.tsx', 'utf-8');
const bodyMatch = htmlContent.match(/<div className="anzeigen-cockpit-wrapper">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/main>/);
let html = bodyMatch ? bodyMatch[1] : '';
// replace className with class
html = html.replace(/className=/g, 'class=');

const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="root">${html}</div></body></html>`, { runScripts: "dangerously" });
const window = dom.window;
global.window = window;
global.document = window.document;
global.navigator = { clipboard: {} };

try {
    let logicCode = fs.readFileSync('./src/app/app/anzeigen-cockpit/logic.js', 'utf-8');
    logicCode = logicCode.replace(/export function initCockpit\(\) \{/, 'function initCockpit() {');
    
    // Evaluate logic.js
    window.eval(logicCode);
    window.eval('initCockpit()');
    console.log("logic.js initialized successfully!");
    
    console.log("Switching to ordnungsamt...");
    window.switchModule('ordnungsamt');
    console.log("Switch successful!");
} catch (e) {
    console.error("Error during execution:", e);
}
