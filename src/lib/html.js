import fs from 'node:fs/promises';

/**
 * Skrifa HTML fyrir yfirlit í index.html
 * @param {any} data Gögn til að skrifa
 * @returns {Promise<void>}
 */
export async function generateIndex(data) {
    const htmlFilePath = 'dist/index.html';
  
    /*
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    */
  
    //let html = '';
  
    /*
    for (let i = 0; i < data.length; i++) {
      html += `<li>${data[i].title}</li>\n`;
    }
    */
  
    /*
    for (let item of data) {
      html += `<li>${item.title}</li>\n`;
    }
    */
  
    const html = data.map((item) => `<li>${item.title}</li>`).join('\n');
  
    // EKKI GOTT HTML!
    const htmlContent = `
  <!doctype html>
  <html>
    <head>
      <title>v1</title>
    </head>
    <body>
      <ul>
        ${html}
      </ul>
    </body>
  </html>
  `;
  
    fs.writeFile(htmlFilePath, htmlContent, 'utf8');
  }

async function generateQuestionPages(data) {
    
}