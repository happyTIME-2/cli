import * as shell from "shelljs";
import { writeFileSync } from "fs";
import { PackageJSON, printMsg, readJsonFile, writeJsonFile } from "./common";
import { red } from "chalk";

/**
 * 安装ESLint
 */
export function installESLint(): void {
  shell.exec(
    "npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D"
  );

  const eslintrc = `module.exports = {
    "env": {
      "node": true,
      "es2021": true,
    },
    "extends": [
      "plugin:@typescript-eslint/recommended",
      "eslint: recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": [
      "@typescript-eslint"
    ],
    "rules": {
    }
  };`;

  try {
    writeFileSync("./.eslintrc.js", eslintrc, { encoding: "utf8" });
  } catch (error) {
    printMsg(`${red("Failed to write .eslintrc file content")}`);
    printMsg(`${red("Please add the following content in .eslintrc.js")}`);
    printMsg(`${red(eslintrc)}`);
  }

  const packageJson = readJsonFile("./package.json") as PackageJSON;
  packageJson.scripts["eslint:comment"] =
    "使用 ESLint 检查并自动修复 src 目录下所有扩展名为 .ts 的文件";
  packageJson.scripts["eslint"] = "eslint --fix src --ext .ts --max-warnings=0";
  writeJsonFile<PackageJSON>("./package.json", packageJson);
}

/**
 * 安装Prettier
 */
export function installPrettier(): void {
  shell.exec("npm i prettier -D");

  const prettierrc = `module.exports = {
    // 一行最多 80 字符
    printWidth: 80,
    // 使用 2 个空格缩进
    tabWidth: 2,
    // 不使用 tab 缩进，而使用空格
    useTabs: false,
    // 行尾需要有分号
    semi: true,
    // 使用单引号代替双引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // jsx 不使用单引号，而使用双引号
    jsxSingleQuote: false,
    // 末尾使用逗号
    trailingComma: 'all',
    // 大括号内的首尾需要空格 { foo: bar }
    bracketSpacing: true,
    // jsx 标签的反尖括号需要换行
    jsxBracketSameLine: false,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf
    endOfLine: 'lf'
  };`;

  try {
    writeFileSync("./.prettierrc.js", prettierrc, { encoding: "utf8" });
  } catch (error) {
    printMsg(`${red("Failed to write .prettierrc.js file content")}`);
    printMsg(`${red("Please add the following content in .prettierrc.js")}`);
    printMsg(`${red(prettierrc)}`);
  }

  const packageJson = readJsonFile("./package.json") as PackageJSON;
  packageJson.scripts["prettier:comment"] =
    "自动格式化 src 目录下的所有 .ts 文件";
  packageJson.scripts["prettier"] = 'prettier --write "src/**/*.ts"';
  writeJsonFile<PackageJSON>("./package.json", packageJson);
}

/**
 * 安装CZ, 规范git 提交信息
 */
export function installCZ(): void {
  shell.exec(
    "npx commitizen init cz-conventional-changelog --save --save-exact"
  );
  shell.exec("npm i @commitlint/cli @commitlint/config-conventional -D");

  const commitlint = `modeule.exports = {
    extends: ['@commitlint/config-conventional']
  };`;

  try {
    writeFileSync("./commitlint.config.js", commitlint, { encoding: "utf8" });
  } catch (error) {
    printMsg(`${red("Failed to write commitlint.config.js file content")}`);
    printMsg(
      `${red("Please add the following content in commitlint.config.js")}`
    );
    printMsg(`${red(commitlint)}`);
  }

  const packageJson = readJsonFile("./package.json") as PackageJSON;
  packageJson.scripts["cz:comment"] = "使用 CZ 提交信息规范";
  packageJson.scripts["cz"] = "cz --preset angular";
  writeJsonFile<PackageJSON>("./package.json", packageJson);
}

/**
 * 安装husky 和 lint-staged， 以安装git commit 时自动化校验
 * @param hooks 需要自动执行的钩子
 * @param lintStaged，需要钩子运行的命令
 */
export function installHusky(
  hooks: { [key: string]: string },
  lintStaged: string[]
): void {
  shell.exec("git init");
  shell.exec("npm i husky lint-staged -D");

  const packageJson = readJsonFile("./package.json") as PackageJSON;
  packageJson["husky"] = {
    hooks: {
      "pre-commit": "lint-staged",
      ...hooks,
    },
  };
  packageJson["lint-staged"] = {
    "*.ts": lintStaged.map((item) => `npm run ${item}`),
  };

  writeJsonFile<PackageJSON>("./package.json", packageJson);
}

/**
 * 安装构建工具，例如webpack
 */
export function installBuild(features: Array<string>): void {
  const packageJson = readJsonFile("./package.json") as PackageJSON;
  packageJson.scripts["build:comment"] = "构建";
  let order = "";
  if (features.includes("ESLint")) {
    order += "npm run eslint";
  }
  if (features.includes("Prettier")) {
    order += " && npm run prettier";
  }

  order += " && rm -rf lib && tsc --build";
  packageJson.scripts["build"] = order;
  writeJsonFile<PackageJSON>("./package.json", packageJson);
}
