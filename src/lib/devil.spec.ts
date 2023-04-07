import test from 'ava';

import { devil } from './devil';


test('devil - smoke test', (t) => {
  t.notThrows(() => devil.log("hello world"));
  t.notThrows(() => devil.dim("hello world"));
  t.notThrows(() => devil.trace("hello world"));
  t.notThrows(() => devil.inspect({ hi: "hello world" }));
});