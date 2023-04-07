#!/usr/bin/env node
'use strict';
const fs = require('fs-extra');
const path = require('path');
const args = process.argv.slice(2);
const long_flags = args
  .filter((arg) => arg.startsWith('--'))
  .map((arg) => arg.replace('--', ''));

// Todo: expand this option
const targetRoot = process.cwd();
const packageRoot = __dirname;


function leftTrimmed(strings, ...values) {
  // Interweave the strings with the
  // substitution vars first.
  let output = '';
  for (let i = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];

  // Split on newlines.
  let lines = output.split(/(?:\r\n|\n|\r)/);

  // Rip out the leading whitespace.
  return lines
    .map((line) => {
      return line.replace(/^\s+/gm, '');
    })
    .join('\n')
    .trim();
}

const options = {};
const emptyFlag = Symbol('flag');
long_flags.forEach((flag) => {
  if (!flag.includes('=')) {
    options[flag] = emptyFlag;
  } else {
    const [key, value] = flag.split('=');
    options[key] = value;
  }
});
if (options['help'] || long_flags.length === 0) {
  console.log(
    leftTrimmed`
      👺 DevIL CLI Commands
      NOTE:
      Devil is primarily meant to be used as a library, not a CLI, but here are some commands
      Usage: "npx devil --<flag>" or "--<flag>=<value>"
      --help      See the help menu
      --inject    Injects Devil into the current project, see the package README for more info
    `
  );
} else if (options['inject']) {
  injectDevil();
}

function injectDevil() {
  // check for a src directory
  let relativePath = '';
  if (fs.existsSync(path.join(targetRoot, 'src'))) {
    relativePath = 'src';
  }
  const fullPath = path.join(targetRoot, relativePath, 'devil');
  // create a folder at relativePath called 'devel'
  if (fs.pathExistsSync(fullPath)) {
    console.log('\n👺 Devil has already been injected, skipping...');
    return;
  }

  fs.mkdirSync(fullPath);
  fs.copySync(path.join(packageRoot, 'devil-src'), fullPath);

  console.log('\n👺 Devil injected @ ' + fullPath + ' 🤘 Happy hacking!');
}
