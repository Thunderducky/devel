/* eslint-disable functional/prefer-readonly-type */
import { checks } from './checks';
import { _readJsonLike, file, forceErrorType } from './filesystem';
import { log } from './loggers';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');

/**
 * This function is intended to be used to cache the results of a function.
 * It will first try to read the file from the cache. If it fails, it will run the function and write the result to the cache.
 * It's largely used to do things like cache the results of an API/DB call or other expensive operation
 * An important note is that it does stringify and parse the results, this can be particularly problematic for dates
 * So some manual intervention may be required
 * @param fullPath the filepath to the cache file
 * @param fnToCache a function that returns the value to cache, when using the cache it will not be called but is helpful for determining the types of the kit
 * @param bustCache if set to true will always run the function and write the result to the cache
 * @param _options space for custom options, including temp overrides to skip the cache
 */
export const cache = async <TCacheValue extends Exclude<unknown, string>>(
  fullPath: string,
  fnToCache: () => Promise<TCacheValue>,
  bustCache = false,
  _options: Partial<{
    skipCache: boolean;
  }> = {
    skipCache: false,
  }
): Promise<TCacheValue> => {
  const options = {
    ...{
      skipCache: false,
    },
    ..._options,
  };
  try {
    const value =
      !bustCache && checks.exists(fullPath)
        ? await _readJsonLike<TCacheValue>(fullPath)
        : await fnToCache();
    // If you want to cache a string result it'll need a workaround :shrug:
    if (!options.skipCache) {
      await file.write(fullPath, value);
    }
    if (checks.notString(value)) {
      return value;
    } else {
      // eslint-disable-next-line functional/no-throw-statement
      throw new Error(
        'Unexpected string result from cache, this is likely a bug'
      );
    }
  } catch (e: unknown) {
    const error = forceErrorType(e);
    log(
      `${chalk.red('Error')} using cache at${chalk.blue(fullPath)}`,
      error.message
    );
    // eslint-disable-next-line functional/no-throw-statement
    throw error;
  }
};

cache('', () => Promise.resolve(''));
