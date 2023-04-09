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
 * if(devil.checks.exists(foo, 'foo is null or undefined')) {
 *  // foo is now narrowed to Foo, so we won't get a type error here
 *  console.log(foo.bar);
 * }
 *
 * ```
 * #### Related
 * - **devil.asserts.exists** throws an error and doesn't require if branching
 * @param input the value to check if it's not null or undefined
 */
const exists = <T>(
  input: T
  // eslint-disable-next-line @typescript-eslint/ban-types
): input is T & {} => {
  return !(input === null || input === undefined);
};

const notString = <T>(input: T | string): input is T => {
  return typeof input !== 'string';
};

export const checks = {
  exists,
  notString,
};
