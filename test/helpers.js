/* @flow */

import fs from 'fs';
import path from 'path';
import * as babel from 'babel-core';

const fixtures = path.join(__dirname, 'fixtures');

export const transform = (filename: string): Promise<string> => {
  const file = path.join(fixtures, filename);
  const options = {
    presets: [ ['env', { targets: { node: 'current' } }] ],
    plugins: [
      ['../../src/plugin.js', {
        config: path.join(fixtures, 'postcss.config.js'),
      }],
    ],
  };

  return new Promise((resolve: (any) => void, reject: (Error) => void) => {
    babel.transformFile(file, options, (err: ?Error, result: any) => {
      if (err) { reject(err); }
      else { resolve(result.code); }
    });
  });
};

export const read = (filename: string): Promise<string> => {
  const file = path.join(fixtures, filename);
  const options = {
    encoding: 'utf8',
  };

  return new Promise((resolve: (any) => void, reject: (Error) => void) => {
    fs.readFile(file, options, (err: ?ErrnoError, result: string) => {
      if (err) { reject(err); }
      else { resolve(result); }
    });
  });
};
