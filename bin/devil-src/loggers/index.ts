/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/prefer-readonly-type */
import { inspect as _inspect } from 'util';

import chalk from 'chalk';

import { trace } from './trace';

// TODO: allow override
const prefix = '👺';

// NOTE: I don't know how to write "test" for this super well :/
// this relies on a lot of what console.logs natural functionality is

/**
 * A Replacement for console.log, just with the Devil prefix so you can have it stand out against other logs.
 * @param data What you want to log (just like console.log)
 */
export const log = (first?: unknown, ...data: unknown[]) => {
  if (data.length > 0 && typeof data[0] == 'string') {
    console.log(`${prefix} ${first}`, ...data);
  } else {
    console.log(prefix, first, ...data);
  }
};

/**
 * 🔅 Use this to log something that you want to be dimmed.
 * Commonly used for when you want to check something happened but not draw attention to it.
 *
 * @param data What you want to log (just like console.log)
 */
export const dim = (...data: unknown[]) => {
  log(prefix, ...data.map((d) => chalk.dim(d.toString())));
};

/**
 * The console normally truncates objects, this will print the full object.
 * @param data the object (or any other value) you want to inspect
 */
const inspect = (...data: unknown[]) => {
  log(prefix, ...data.map((d) => _inspect(d, false, null, true)));
};

export const loggers = {
  log,
  dim,
  inspect,
  trace,
};
