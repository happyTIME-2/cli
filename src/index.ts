const program = require('commander');  // commander负责读取命令
const inquirer = require('inquirer');   // inquirer负责问询
const download = require('download-git-repo');   // download-git-repo负责下载对应模板项目的git仓库
const fse = require('fs-extra');   // fs-extra负责文件的复制
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');   // mem-fs-editor负责模板的复制以及嵌入模板字符串，它需要依赖mem-fs
// const { exec } = require('child_process');   // child_process负责执行命令行
const chalk = require('chalk');   // 改变命令行输出样式
// const ora = require('ora'); 
const semver = require('semver');   // semver负责检查版本号
const didYouMean = require('didyoumean');   // didyoumean负责提示用户是否需要更改

const requiredNodeVersion = require('../package.json').engines.node;

didYouMean.threshold = 0.6;

function checkNodeVersion(wanted: string, cliName: string) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        'You are using Node ' + 
        process.version +
        ', but this version of ' +
        cliName +
        ' requires Node ' +
        wanted +
        '.\nPlease upgrade your Node version.'
      ) 
    );
    process.exit(1);
  }
}

function validateArgsLen(argvLen: number, maxArgvLens: number) {
  if (argvLen > maxArgvLens) {
    console.log(chalk.red('Too many arguments.\n'));
    program.help();
  }
}

// 检测node版本号
checkNodeVersion(requiredNodeVersion, 'cli-demo');

program.version(require('./package.json').version, '-v, --version')
      .usage('<command> [options]');

// 初始化项目模板
program.command('create <template-name> <project-name>')
        .description('create a new project from a template')
        .option('-t, --type <type>', 'type of the project to init')
        .action((templateName: any, projectName: any, cmd: any) => {
          validateArgsLen(process.argv.length, 5);
          require('../lib/create')(templateName.toLowerCase, projectName);
        })

// program.parse(process.argv);