import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getFortune } from '../src/utils/fortune.js';
import { getZodiacSign } from '../src/utils/zodiac.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const period = process.argv[2];
assert.match(period || '', /^\d{4}-(0[1-9]|1[0-2])$/, 'Pass a period such as 2026-10');

const archiveDir = join(root, 'data', 'archive');
const archive = JSON.parse(readFileSync(join(archiveDir, `${period}.json`), 'utf8'));
const [year, month] = period.split('-').map(Number);
const names = [
  '山羊座', '水瓶座', '魚座', '牡羊座', '牡牛座', '双子座',
  '蟹座', '獅子座', '乙女座', '天秤座', '蠍座', '射手座'
];

assert.equal(archive.period, period);
assert.deepEqual(Object.keys(archive.signs), names);

const zodiacByName = new Map();
for (let birthMonth = 1; birthMonth <= 12; birthMonth++) {
  const sign = getZodiacSign(birthMonth, 1);
  assert.ok(!zodiacByName.has(sign.name), `Duplicate zodiac sign: ${sign.name}`);
  zodiacByName.set(sign.name, sign);
}
assert.deepEqual([...zodiacByName.keys()].sort(), [...names].sort());

const resultView = readFileSync(join(root, 'src', 'components', 'FortuneResult.jsx'), 'utf8');
assert.ok(resultView.includes(`${year}年${month}月の運勢:`), 'Result heading has the wrong month');
assert.equal(getFortune('不明').score, 0, 'Unknown-sign fallback is missing');

const items = new Set();
const colors = new Set();
for (const name of names) {
  const saved = archive.signs[name];
  const fortune = getFortune(name);
  const zodiac = zodiacByName.get(name);

  for (const field of ['text', 'score', 'advice', 'luckyItem']) {
    assert.equal(fortune[field], saved[field], `${name}: ${field} differs from archive`);
  }
  assert.equal(zodiac.lucky, saved.lucky, `${name}: lucky color differs from archive`);
  assert.ok(zodiac.image, `${name}: zodiac image is missing`);
  assert.ok(fortune.text.startsWith(`${month}月の${name}は、`), `${name}: text has the wrong month`);
  assert.ok(fortune.text.endsWith('。'), `${name}: text needs a final period`);
  assert.ok(Array.from(fortune.text).length >= 80 && Array.from(fortune.text).length <= 110,
    `${name}: text length is outside the monthly range`);
  assert.ok(Number.isInteger(fortune.score) && fortune.score >= 3 && fortune.score <= 5,
    `${name}: score must be 3 to 5`);
  assert.ok(fortune.advice.endsWith('。'), `${name}: advice needs a final period`);
  assert.ok(fortune.luckyItem && !fortune.luckyItem.endsWith('。'),
    `${name}: lucky item must be a short noun phrase`);
  assert.ok(zodiac.lucky);
  assert.ok(!items.has(fortune.luckyItem), `Duplicate lucky item: ${fortune.luckyItem}`);
  assert.ok(!colors.has(zodiac.lucky), `Duplicate lucky color: ${zodiac.lucky}`);
  items.add(fortune.luckyItem);
  colors.add(zodiac.lucky);
}

const previousPeriods = readdirSync(archiveDir)
  .filter(file => /^\d{4}-(0[1-9]|1[0-2])\.json$/.test(file) && file < `${period}.json`)
  .sort()
  .reverse()
  .slice(0, 3);
for (const file of previousPeriods) {
  const previous = JSON.parse(readFileSync(join(archiveDir, file), 'utf8'));
  for (const name of names) {
    if (!previous.signs[name]) continue;
    assert.notEqual(archive.signs[name].luckyItem, previous.signs[name].luckyItem,
      `${name}: lucky item repeats ${file}`);
    assert.notEqual(archive.signs[name].lucky, previous.signs[name].lucky,
      `${name}: lucky color repeats ${file}`);
  }
}

console.log(`Validated ${period}: 12 signs, display month, content, colors, and recent archives.`);
