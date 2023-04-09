/* eslint-disable functional/no-throw-statement */
// This file THROWS exceptions when violated, since this is a scripting focused library
// Sometimes you just want whatever you're doing to panic
/**
 * Assert a value is not null or undefined.
 * Throws an error if the value is null or undefined.
 * This is useful for type narrowing for typescript
 *
 * #### Usage
 * ```js
 * import { devil } from 'devil';
 *
 * type Foo = {
 *  bar: string
 * };
 *
 * const foo:Foo | null = maybeFoo(); // returns a value or null or undefined
 *
 * // Will throw new Error if foo is null or undefined
 * devil.asserts.exists(foo, 'foo is null or undefined');
 *
 * // foo is now narrowed to Foo, so we won't get a type error here
 * console.log(foo.bar);
 * ```
 * #### Related
 * - **devil.checks.exists** returns a boolean instead of throwing and can still be used for type errors
 *
 * @param input the value to check if it's not null or undefined
 * @param message, this is the message of the error that will get thrown if the assertion is broken
 */
function exists<T>(
  input: T,
  message: string
  // eslint-disable-next-line @typescript-eslint/ban-types
): asserts input is T & {} {
  if (input === null || input === undefined) {
    throw new Error(message);
  }
}

/**
 * Assert a value is not a string, commonly combined with the fileSystem.read function
 * Throws an error if the value is a string.
 * This is useful for type narrowing for typescript
 *
 * #### Usage
 * ```js
 * import { devil } from 'devil';
 *
 * const foo = devil.read<('foo.json')
 *
 * const foo:Foo | null = maybeFoo(); // returns a value or null or undefined
 *
 * // Will throw new Error if foo is null or undefined
 * devil.assert.exists(foo, 'foo is null or undefined');
 *
 * // foo is now narrowed to Foo, so we won't get a type error here
 * console.log(foo.bar);
 * ```
 * #### Related
 * - **devil.check.exists** returns a boolean instead of throwing and can still be used for type errors
 *
 * @param input the value to check if it's not null or undefined
 * @param message, this is the message of the error that will get thrown if the assertion is broken
 */
function notString<T>(
  input: T,
  message: string
): asserts input is Exclude<T, string> {
  if (typeof input === 'string') {
    throw new Error(message);
  }
}

export const asserts = {
  exists,
  notString,
};
