import { parseIndexJson, parseQuestionJson, readJson, readQuestionJson } from './file.js';
import { generateIndex } from './html.js';

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

  generateIndex(indexData);


  /*
  if (!Array.isArray(indexData)) {
    console.error('index.json is not an array. Check the file format.');
    return [];
  }

  // Read other JSON files listed in index.json
  const allData = await Promise.all(
    indexData.map(async (item) => {
      const filePath = `./data/${item.file}`;
      const fileData = await readJson(filePath);
      return fileData ? { ...item, content: fileData } : null;
    }),
  );
  */
}

main();

/*
// Eftirfarandi kóði kom frá ChatGTP eftir að hafa gefið
// MJÖG einfalt prompt ásamt allri verkefnalýsingu
async function readAllData() {
  const indexPath = './data/index.json';

  try {
    // Read index.json
    const indexData = await readJSON(indexPath);

    if (!Array.isArray(indexData)) {
      console.error('index.json is not an array. Check the file format.');
      return [];
    }

    // Read other JSON files listed in index.json
    const allData = await Promise.all(
      indexData.map(async (item) => {
        const filePath = `./data/${item.file}`;
        const fileData = await readJSON(filePath);
        return fileData ? { ...item, content: fileData } : null;
      }),
    );

    return allData.filter(Boolean); // Remove null entries if any file failed to load
  } catch (error) {
    console.error('Error reading data files:', error.message);
    return [];
  }
}


readAllData().then((data) => console.log(data));
*/
