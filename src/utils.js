const { Command } = require('commander');
const path = require('path');
const pkgConfig = require('../package.json');

const rootDir = path.resolve(__dirname, '..');

const cmd = new Command();

module.exports = {
  cmd,
  rootDir,
  pkgConfig,
};
