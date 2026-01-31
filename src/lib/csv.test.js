import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCsvLine } from './csv.js';

test('parseCsvLine parses simple CSV', () => {
  assert.deepEqual(parseCsvLine('a,b,c'), ['a', 'b', 'c']);
});

test('parseCsvLine parses quoted commas', () => {
  assert.deepEqual(parseCsvLine('"a,b",c'), ['a,b', 'c']);
});

test('parseCsvLine parses escaped quotes', () => {
  assert.deepEqual(parseCsvLine('"a""b",c'), ['a"b', 'c']);
});
