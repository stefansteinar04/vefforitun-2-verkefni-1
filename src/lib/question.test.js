import test from 'node:test';
import assert from 'node:assert/strict';
import { parseQuestions } from './parse.js';

test('parses questions with optional quality', () => {
  const txt = [
    '6,Tónlist,2,2,"Hvaða hljómsveit gerði lagið ""Rangur maður""",Sólstrandargæjarnir',
    '6,Tónlist,2,,"Hver kvað ""Smíða skútu""",Bjartmar Guðlaugsson',
  ].join('\n');

  const result = parseQuestions(txt);

  assert.equal(Array.isArray(result.questions), true);
  assert.equal(result.questions.length, 2);

  assert.equal(result.questions[0].quality, 2);
  assert.equal(result.questions[1].quality, null);
});
