import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parseQuestions } from './parse.js';

describe('parse', () => {
  describe('parseQuestions', () => {
    it('parses valid lines into questions array', () => {
      const txt = [
        '6,Tónlist,2,2,"Spurning 1",Svar1',
        '6,Tónlist,2,,"Spurning 2",Svar2',
      ].join('\n');

      const result = parseQuestions(txt);

      assert.equal(result.errors.length, 0);
      assert.equal(result.questions.length, 2);
      assert.equal(result.questions[1].quality, null);
    });

    it('collects errors for invalid lines', () => {
      const txt = [
        '6,Tónlist,2,2,"Spurning 1",Svar1',
        'bad,line,that,is,too,short',
      ].join('\n');

      const result = parseQuestions(txt);

      assert.equal(result.questions.length, 1);
      assert.equal(result.errors.length, 1);
    });
  });
});
