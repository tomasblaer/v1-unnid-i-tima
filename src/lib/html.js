import fs from 'node:fs/promises';
import { folderExists } from './file.js';

/**
 * Preemptive fall sem kallar í generation föllin, og passar
 * að /dist sé til
 * @param {any} indexData gögn fyrir index.html
 * @param {any} questionData gögn fyrir spurningasiður
 * @returns {Promise<void>}
 */
export async function generateHtml(indexData, questionData) {
  if (!(await folderExists('dist'))) {
    await fs.mkdir('dist');
  }
  generateIndex(indexData);
  generateQuestionPages(questionData);
}

/**
 * Skrifa HTML fyrir yfirlit í index.html
 * @param {any} data Gögn til að skrifa
 * @returns {Promise<void>}
 */
async function generateIndex(data) {
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
  
  const html = data.map((item) => `<li><a href="${item.title.toLowerCase() + '.html'}">${item.title}</a></li>`).join('\n');

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

function escapeHTML(str) {
  return str?.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function generateQuestionPages(data) {
  data.forEach((page) => {
    const filePath = `dist/${page.title.toLowerCase()}.html`;

    const questionGroups = [];

    page.questions.forEach((question, index) => {
      let { question: questionTitle, answers } = question;
      if (!Array.isArray(answers)) {
        return ;
      }
      answers = answers.filter((answer) => answer.hasOwnProperty('answer') && answer.hasOwnProperty('correct'));
      const questionHtml = `
        <h2>${escapeHTML(questionTitle)}</h2>
        <ul>
        ${answers.map((answer, aIndex) => `
          <li>
            <input type="radio" class="${answer.correct}" name="${index}" id="${aIndex}">${escapeHTML(answer.answer)}</input>
          </li>`).join('')}
        </ul>
      `;

      questionGroups.push(questionHtml);
    });
    
    const html = `
    <!doctype html>
    <html>
      <head>
        <title>${page.title} Quiz</title>
        <script src="public/questions.js" type="module"></script>
      </head>
      <body>
        <h1>${page.title} Quiz</h1>
      </body>
      <section>
        ${questionGroups.join('')}
      </section>
      <footer>
        <button class="submit">Senda svör</button>
      </footer>
    </html>
    `

    fs.writeFile(filePath, html, 'utf8');
  })
}