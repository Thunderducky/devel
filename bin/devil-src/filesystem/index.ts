import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import { dim, log } from '../loggers';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');

export const forceErrorType = (e: unknown) => {
  if (typeof e === 'string') {
    return Error(e);
  }
  if (e instanceof Error) {
    return e;
  }
  log('Unknown error type, returning generic error', e);
  return new Error('Unknown error');
};

// Fix BigInts for JSON.stringify
function bigIntFixer<T, U>(_key: T, value: U) {
  return typeof value === 'bigint' ? value.toString() : value; // return everything else unchanged
}

/**
 * Reads a file from the filesystem and returns the results.
 * Auto-parses `JSON` (`*.json`/ `*.jsonc`) files.
 *
 * `JSON` results will be coerced to T if provided, otherwise it'll be any.
 * Non `JSON` results will returned as strings
 *
 * Can be combined with notString (either "assert" or "check" variants)
 * for easy type narrowing.
 *
 * @param fullPath The full path of the file being read
 * @returns the results of the file
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const read = async <T = any>(fullPath: string): Promise<T | string> => {
  dim(`Reading from ${chalk.blue(fullPath)}`);
  try {
    const data = await readFile(fullPath, { encoding: 'utf-8' });
    // Automatically parse JSON & JSON C files
    // eslint-disable-next-line functional/immutable-data
    const ext = fullPath.split('.').pop();
    if (ext === 'json') {
      return JSON.parse(data) as T;
    } else if (ext === 'jsonc') {
      return JSON.parse(
        data.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      ) as T;
    }
    return data;
  } catch (e) {
    log(`${chalk.red('Error')} reading ${chalk.blue(fullPath)}`, e);

    // eslint-disable-next-line functional/no-throw-statement
    throw forceErrorType(e);
  }
};
// Not really intended for public use, to help the cache function
export const _readJsonLike = async <T = unknown>(
  fullPath: string
): Promise<T> => {
  dim(`Reading from ${chalk.blue(fullPath)}`);
  try {
    const data = await readFile(fullPath, { encoding: 'utf-8' });
    // Automatically parse JSON & JSON C files
    // eslint-disable-next-line functional/immutable-data
    const ext = fullPath.split('.').pop();
    if (ext === 'json') {
      return JSON.parse(data) as T;
    } else if (ext === 'jsonc') {
      return JSON.parse(
        data.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      ) as T;
    } else {
      // eslint-disable-next-line functional/no-throw-statement
      throw new Error(
        'Called _readJsonLike on a file that was not .json or .jsonc'
      );
    }
  } catch (e) {
    log(`${chalk.red('Error')} reading ${chalk.blue(fullPath)}`, e);

    // eslint-disable-next-line functional/no-throw-statement
    throw forceErrorType(e);
  }
};

/**
 * Checks synchronously if a file exists.
 * Auto-parses `JSON` (`*.json`/ `*.jsonc`) files.
 *
 * `JSON` results will be coerced to T if provided, otherwise it'll be any.
 * Non `JSON` results will returned as strings
 *
 * @param fullPath The full path of the file being read
 * @returns the results of the file
 */
const exists = (fullPath: string) => {
  // log(`Checking if ${chalk.yellow(title)} exists at ${chalk.blue(fullPath)}`);
  try {
    return existsSync(fullPath);
  } catch (e) {
    log(`Error reading ${chalk.blue(fullPath)}`, e);

    // eslint-disable-next-line functional/no-throw-statement
    throw forceErrorType(e);
  }
};

/**
 * Writes a file to the filesystem
 * Auto-converts files written to `JSON` filepaths (`*.json`/ `*.jsonc`).
 * Otherwise, input is "stringified"
 *
 * @param fullPath The full path of the file being read
 * @returns the results of the file
 */
const write = (fullPath: string, data: unknown) => {
  try {
    // eslint-disable-next-line functional/immutable-data
    const ext = fullPath.split('.').pop();
    if (ext === 'jsonc' || ext === 'json') {
      dim(`Writing as JSON to ${chalk.blue(fullPath)}`);
      return writeFile(fullPath, JSON.stringify(data, bigIntFixer, 2));
    } else {
      dim(`Writing as string to ${chalk.blue(fullPath)}`);
      return writeFile(fullPath, `${data}`);
    }
  } catch (e) {
    log(`Error writing to ${chalk.blue(fullPath)}`, e);

    // eslint-disable-next-line functional/no-throw-statement
    throw forceErrorType(e);
  }
};

export const file = {
  read,
  exists,
  write,
};
