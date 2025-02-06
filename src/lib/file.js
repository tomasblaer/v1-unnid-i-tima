import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Tjekkar hvort file se til
 * @param {string} path 
 * @returns 
 */
async function fileExists(path) {
    try {
        await fs.readFile('./data/'+ path);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * Tjekkar hvort dir se til
 * @param {string} path 
 * @returns {boolean}
 */
export async function folderExists(path) {
    try {
      await fs.readdir(path);
    } catch (e) {
      return false;
    }
    return true;
}

/**
 *
 * @param {unknown} data
 * @returns {any}
 */
export async function parseIndexJson(data) {
    const sanitizedData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].hasOwnProperty('title') && data[i].hasOwnProperty('file')) {
            const doesExist = await fileExists(data[i].file);
            if (doesExist) {
              let obj = await fs.readFile('./data/' + data[i].file);
              obj = JSON.parse(obj);
              if (obj.hasOwnProperty('title') && Array.isArray(obj.questions)) {
                sanitizedData.push(data[i]);
              }
            }
        }
    }
    return sanitizedData;
  }

  /**
 *
 * @param {unknown} data
 * @returns {any}
 */
export async function parseQuestionJson(data) {
    const sanitizedData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].hasOwnProperty('questions') && data[i].questions !== null) {
            sanitizedData.push(data[i]);
        }
    }
    return sanitizedData;
  }

/**
 * Les skrá og skilar gögnum eða null.
 * @param {string} filePath Skráin sem á að lesa
 * @returns {Promise<unknown | null>} Les skrá úr `filePath` og skilar innihaldi. Skilar `null` ef villa kom upp.
 */
export async function readJson(filePath) {
    let data;
    try {
      data = await fs.readFile(path.resolve(filePath), 'utf-8');
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error.message);
      return null;
    }
  
    try {
      const parsed = JSON.parse(data);
      return parsed;
    } catch (error) {
      console.error('error parsing data as json');
      return null;
    }
  }

export async function readQuestionJson(sanitizedData) {
    const questionData = [];
    for (let i = 0; i < sanitizedData.length; i++) {
        const data = await readJson('./data/' + sanitizedData[i].file);
        questionData.push(data)
    }
    return questionData;
}