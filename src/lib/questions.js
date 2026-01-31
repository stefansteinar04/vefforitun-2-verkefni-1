import fs from 'node:fs/promises';
import { parseQuestions } from './parse.js';

export async function readQuestionsCsv(filePath) {
  const txt = await fs.readFile(filePath, 'utf-8');
  const { questions, errors } = parseQuestions(txt);

  for (const e of errors) console.warn(`Skipping ${e}`);

  return questions;
}
