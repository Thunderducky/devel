import path from "path";
import { cwd } from "process";

import { asserts } from "./assertions";
import { cache } from "./cache";
import { checks } from "./checks";
import { file } from "./filesystem";
import { loggers } from "./loggers";


// TODO: Inspect, trace, in, out, cache
export const devel = {
  _rootDir: process.env.DEVEL_DIR || cwd(),
  setRootDir: function (dir: string) {
    // eslint-disable-next-line functional/immutable-data, functional/no-this-expression
    this._rootDir = dir;
  },

  read: function (title: string) {
    // eslint-disable-next-line functional/no-this-expression
    const root = this._rootDir
    const fullPath = path.join(root, `${title}.devel.jsonc`);
    return file.read(fullPath);
  },

  cache: function <T>(title: string, fnToCache: () => Promise<T>, bustCache: boolean, cacheOptions: {
    readonly skipCache: boolean,
  }) {
    // eslint-disable-next-line functional/no-this-expression
    const root = this._rootDir
    const fullPath = path.join(root, `${title}.devel.jsonc`);
    cache(fullPath, fnToCache, bustCache, cacheOptions)
  },

  write: function (title: string, data: unknown) {
    // eslint-disable-next-line functional/no-this-expression
    const root = this._rootDir
    const fullPath = path.join(root, `${title}.jsonc`);
    return file.write(fullPath, data);
  },

  // Loggers are some of the most common cases so we won't require the full path
  ...loggers,
  file,
  check: checks,
  asserts
};

