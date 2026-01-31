import fs from 'node:fs/promises';
import path from 'node:path';

import { readQuestionsCsv } from './lib/questions.js';
import { selectQuestions } from './lib/select.js';
import { slugify } from './lib/slug.js';
import { renderIndex, renderCategoryPage } from './lib/templates.js';

const DATA_FILE = path.join('data', 'questions.csv');
const DIST_DIR = 'dist';

const FILTER = {
  difficulty: 2,
  minQuality: null,
};

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  await ensureDir(DIST_DIR);

  const questions = await readQuestionsCsv(DATA_FILE);
  const byCat = selectQuestions(questions, FILTER);

  const pages = [];

  for (const [category, qs] of byCat.entries()) {
    if (qs.length === 0) continue;

    const slug = slugify(category);
    pages.push({ name: category, slug, count: qs.length });

    const html = renderCategoryPage(category, qs);
    await fs.writeFile(path.join(DIST_DIR, `${slug}.html`), html, 'utf-8');
  }

  pages.sort((a, b) => a.name.localeCompare(b.name, 'is'));

  const indexHtml = renderIndex(pages);
  await fs.writeFile(path.join(DIST_DIR, 'index.html'), indexHtml, 'utf-8');

  console.log(`Generated ${pages.length} categories + index.html`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
