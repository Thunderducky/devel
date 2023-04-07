import test from 'ava';

import { checks } from './checks';

const { exists } = checks;
test('checks - exists', (t) => {
  t.false(() => exists(null), 'null should return false');
  t.false(() => exists(undefined), 'undefined should return false');

  t.true(() => exists(0), '0 should return true');
  t.true(() => exists(NaN), 'NaN should return true');
  t.true(() => exists(false), 'false should return true');
  t.true(() => exists(''), 'empty string should return true');
  t.true(() => exists({}), 'empty object should return true');
  t.true(() => exists([]), 'empty array should return true');
});

const { notString } = checks;
test('checks - notString', (t) => {
  t.false(() => notString(''), 'strings return false');
  t.true(() => notString(0), '0 should return true');
  t.true(() => notString(null), '0 should return true');
  t.true(() => notString(false), '0 should return true');
  t.true(() => notString({}), '0 should return true');
  t.true(() => notString([]), '0 should return true');
  t.true(() => notString(NaN), '0 should return true');
});
