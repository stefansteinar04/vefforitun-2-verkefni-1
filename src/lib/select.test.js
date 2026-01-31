import test from 'node:test';
import assert from 'node:assert/strict';
import { selectQuestions } from './select.js';

test('selectQuestions filters by difficulty and caps per category', () => {
  const qs = [];
  for (let i = 0; i < 150; i++) {
    qs.push({ category: 'Tónlist', question: `Q${i}`, answer: 'A', difficulty: 2, quality: 2 });
  }
  qs.push({ category: 'Tónlist', question: 'bad', answer: 'A', difficulty: 1, quality: 2 });

  const byCat = selectQuestions(qs, { difficulty: 2, minQuality: null });
  assert.equal(byCat.get('Tónlist').length, 100);
});
