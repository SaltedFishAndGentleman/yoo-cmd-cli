#!/user/bin/env node
const fs = require('fs');
const path = require('path');
const utils = require('./utils');

const { cmd, rootDir, pkgConfig } = utils;

/**
 *  * 1. 创建时需要输入自己的命令名 done
 *
 *   yoo-cmd-cli init --cmd testCmd
 *
 *
 *  * 2.支持重设自己的命令名
 *
 *  yoo-cmd-cli  cmd  set xxx
 *
 *  win
 * setx PATH "%PATH%;D:\Program Files\"
 */

cmd.version(pkgConfig.version);

/**
 * 载入命令
 */
try {
  const fileList = fs.readdir(rootDir);

  fileList.forEach(fileName => {
    const filePath = path.join(rootDir, fileName);
    require.resolve(filePath);
  });
} catch (e) {
  console.error(e);
}
