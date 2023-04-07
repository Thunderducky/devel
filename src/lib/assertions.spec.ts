import test from 'ava';

import { asserts } from './assertions';

const { exists } = asserts;
test('assertions - exists', (t) => {
  t.throws(() => exists(null, 'null is not allowed'), { message: 'null is not allowed' }, 'null should not pass allowed');
  t.throws(() => exists(undefined, 'undefined is not allowed'), { message: 'undefined is not allowed' }, 'undefined should not pass allowed');

  t.notThrows(() => exists(0, '0 is allowed'), '0 should not throw');
  t.notThrows(() => exists(NaN, 'NaN is allowed'), 'NaN should not throw');
  t.notThrows(() => exists(false, 'false is allowed'), 'false should not throw');
  t.notThrows(() => exists('', 'empty string is allowed'), 'empty string should not throw');
  t.notThrows(() => exists({}, 'empty object is allowed'), 'empty object should not throw');
  t.notThrows(() => exists([], 'empty array is allowed'), 'empty array should not throw');
});
