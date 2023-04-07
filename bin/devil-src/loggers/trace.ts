/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/prefer-readonly-type */
import chalk from 'chalk';

import { get as stackGet } from './stack-helper';

import { log } from './index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shortTrace = (location: any) => `${location.getFileName()}`;

// NOTE: We are using shortTrace because it gets the file name at least
// but the line number is inaccurate because of the compilation and I don't know enough
// to fix it and for me file helps a lot as an easy thing to jump to in vscode

/**
 * 👁 Trace *tries* 🤞 to figure out which file you are in at this time and logs it out
 *
 * I use it to easily find where I am in the code when I am debugging.
 * @param first Can be treated like a label as a string, but not necessary
 * @param data Any follow up objects that you want to be logged out
 */
export const trace = (first: unknown, ...data: unknown[]) => {
  const location = stackGet()[1];
  if (typeof first === 'string') {
    // Treat it like a label and color it
    const location = stackGet()[1];
    log(
      `${chalk.redBright(first)}`,
      ...data,
      `@ ${chalk.blue(shortTrace(location))}`
    );
  } else {
    log(first, ...data, `@ ${chalk.blue(shortTrace(location))}`);
  }
};
