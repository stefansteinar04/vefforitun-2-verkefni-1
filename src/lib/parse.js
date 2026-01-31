import { parseCsvLine } from './csv.js';

function toIntOrNull(value) {
  const v = String(value ?? '').trim();
  if (v === '') return null;
  const n = Number(v);
  return Number.isInteger(n) ? n : null;
}


export function parseQuestions(text) {
  const lines = String(text ?? '').split(/\r?\n/).filter((l) => l.trim() !== '');

  const questions = [];
  const errors = [];

  for (let i = 0; i < lines.length; i++) {
    const lineNo = i + 1;
    const fields = parseCsvLine(lines[i]);

    if (fields.length < 6) {
      errors.push(`line ${lineNo}: expected 6 fields, got ${fields.length}`);
      continue;
    }

    const categoryId = toIntOrNull(fields[0]);
    const category = String(fields[1] ?? '').trim();
    const difficulty = toIntOrNull(fields[2]);
    const quality = toIntOrNull(fields[3]); // má vera null
    const question = String(fields[4] ?? '').trim();
    const answer = String(fields[5] ?? '').trim();

    if (!category || !question || !answer) {
      errors.push(`line ${lineNo}: missing category/question/answer`);
      continue;
    }
    if (categoryId == null) {
      errors.push(`line ${lineNo}: invalid categoryId`);
      continue;
    }
    if (difficulty == null) {
      errors.push(`line ${lineNo}: invalid difficulty`);
      continue;
    }

    questions.push({
      categoryId,
      category,
      difficulty,
      quality,
      question,
      answer,
    });
  }

  return { questions, errors };
}
