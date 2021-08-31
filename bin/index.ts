#!/usr/bin/env node
const program = require('commander');  // commander负责读取命令
const inquirer = require('inquirer');   // inquirer负责问询
const download = require('download-git-repo');   // download-git-repo负责下载对应模板项目的git仓库
const fse = require('fs-extra');   // fs-extra负责文件的复制
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');   // mem-fs-editor负责模板的复制以及嵌入模板字符串，它需要依赖mem-fs
// const { exec } = require('child_process');   // child_process负责执行命令行
const chalk = require('chalk');   // 改变命令行输出样式
// const ora = require('ora'); 

program.command('init <name>')
        .description('init a project')
        .option('-t, --type <type>', 'type of the project to init')
        .action((name, opts) => {
          console.log(name, opts.type);
        })

program.parse(process.argv);