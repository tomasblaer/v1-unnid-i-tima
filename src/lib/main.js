import { parseIndexJson, parseQuestionJson, readJson, readQuestionJson } from './file.js';
import { generateHtml } from './html.js';

const INDEX_PATH = './data/index.json';


/**
 * Keyrir forritið okkar:
 * 1. Sækir gögn
 * 2. Staðfestir gögn (validation)
 * 3. Skrifar út HTML
 */
async function main() {
  const indexJson = await readJson(INDEX_PATH);

  const indexData = await parseIndexJson(indexJson);

  const questionJson = await readQuestionJson(indexData);

  const questionData = await parseQuestionJson(questionJson);

  generateHtml(indexData, questionData);
}

main();
