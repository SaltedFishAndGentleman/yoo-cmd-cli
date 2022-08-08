const path = require('path');
const { execFileSync } = require('child_process');
const fs = require('fs');
const { promisify } = require('util');
const { cmd, rootDir, pkgConfig } = require('../utils');

const execFilePromise = promisify(execFileSync);
const fsRead = promisify(fs.read);
const fsWrite = promisify(fs.write);

cmd
  .command('init')
  .description('请输入自己的命令行名称')
  .argument('<cmdName>', 'commander name, default: "mycmd"', arg => arg ?? 'mycmd')
  .action(async (...[cmdName]) => {
    const templatePath = path.join(rootDir, 'src/yoo-cmd-template');

    try {
      const { stdout } = await execFilePromise('git', [
        'clone',
        pkgConfig.tempRepository,
        templatePath,
      ]);

      console.log(stdout);

      if (fs.existsSync(templatePath)) {
        const packageJSONBuffer = Buffer.from('');
        const packageJSONPath = path.join(templatePath, 'package.json');
        const { buffer: templatePkgJSONBuffer } = await fsRead(packageJSONPath, packageJSONBuffer);
        const pkgJSON = templatePkgJSONBuffer.toString();

        if (!pkgJSON) {
          throw new Error(`templatPkgJSON read error: ${JSON.stringify(pkgJSON)}`);
        }

        const tempPkgData = JSON.parse(pkgJSON ?? '{}');

        tempPkgData.name = cmdName;

        fsWrite(JSON.stringify(tempPkgData));
      }
    } catch (e) {
      console.error(e);
    }
  });
