#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const log = console.log;
const chokidar = require('chokidar');

const homeDir = require('os').homedir();

const listeningDirectoryPath = `${homeDir}/Desktop/changesvg`;

if (!fs.existsSync(listeningDirectoryPath)) {
  log(chalk.bold.white(`No directory on Desktop...`));
  fs.mkdirSync(listeningDirectoryPath);
  log(chalk.bold.white(`Created a directory named changesvg on your Desktop.`));
}

log(chalk.bold.white(`Place an svg file in your desktop folder named changesvg.`));
log(chalk.bold.white(`If you would like to stop this program press CTRL & C then type exit to close the terminal.`));

chokidar
  .watch(listeningDirectoryPath, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  })
  .on('add', (path, event) => {
    try {
      if (path.includes('.svc')) {
        const readFile = fs.readFileSync(path);
        const updatedFile = readFile.toString().replace('<defs>', '').replace('</defs>', '');
        fs.writeFileSync(path, updatedFile);
      }

      log(chalk.bold.white('UPDATED FILE of <def> and </def>@', path));
    } catch (error) {
      //   log(error);
      process.exit(0);
    }
  });
