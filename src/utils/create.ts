import {
  getProjectPath,
  PackageJSON,
  JSON,
  printMsg,
  readJsonFile,
  writeJsonFile,
  clearConsole,
} from "./common";

import { existsSync } from "fs";
import { prompt } from "inquirer";
import { blue, cyan, gray, red, yellow } from "chalk";
import * as shell from "shelljs";
import * as installFeatureMethod from "./installFeature";

enum installType {
  installESLint = "installESLint",
  installPrettier = "installPrettier",
  installCZ = "installCZ",
  installHusky = "installHusky",
  installBuild = "installBuild",
}

/**
 * 验证当前目录下是否已经存在指定文件，如果存在则退出进行
 * @param fileName 文件名
 */
export function isFileExist(fileName: string): void {
  const filePath = getProjectPath(fileName);
  if (existsSync(filePath)) {
    printMsg(red(`${fileName}文件已经存在，请先删除！`));
    process.exit(1);
  }
}

/**
 * 交互式命令行，让用户自己选择需要的功能
 * return ['ESLint', 'Prettier', 'CZ']
 */
export async function selectFeature(): Promise<string[]> {
  clearConsole();
  printMsg(blue(`TS CLI v${require("../../package.json").version}`));
  printMsg("Start initializing the project:");
  printMsg("");

  const { features } = await prompt([
    {
      name: "features",
      type: "checkbox",
      message: "Check the features needed for your project",
      choices: [
        { name: "ESLint", value: "ESLint" },
        { name: "Prettier", value: "Prettier" },
        { name: "CZ", value: "CZ" },
      ],
      validate(answer) {
        if (answer.length < 1) {
          return "You must choose at least one topping.";
        }

        return true;
      },
    },
  ]);

  console.log(`features:${features}`);

  return features as string[];
}

/**
 * 初始化项目目录
 */
export function initProjectDir(projectName: string): void {
  shell.exec(`mkdir ${projectName}`);
  shell.cd(projectName);
  shell.exec("npm init -y");
}

/**
 * 改写项目中的package.json的 name 和 Description
 */
export function changePackageInfo(projectName: string): void {
  const packageJSON: PackageJSON = readJsonFile<PackageJSON>("./package.json");
  packageJSON.name = packageJSON.description = projectName;
  writeJsonFile<PackageJSON>("./package.json", packageJSON);
}

/**
 * 安装typescript 并初始化
 */
export function installTSAndInit(): void {
  shell.exec("npm i typescript -D && npx tsc --init");

  const tsconfigJson: JSON = {
    compilerOnSave: true,
    compilerOptions: {
      target: "ES2018",
      module: "commonjs",
      moduleResolution: "node",
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      inlineSourceMap: true,
      noImplicitThis: true,
      noUnusedLocals: true,
      stripInternal: true,
      pretty: true,
      declaration: true,
      outDir: "lib",
      baseUrl: "./",
      paths: {
        "*": ["src/*"],
      },
    },
    exclude: ["node_modules", "lib"],
  };

  writeJsonFile<JSON>("./tsconfig.json", tsconfigJson);
  shell.exec("mkdir src && touch src/index.ts");
}

/**
 * 安装 @type/node
 * 这是 node.js 的类型定义包
 */
export function installTypesNode(): void {
  shell.exec("npm i @types/node -D");
}

/**
 * 安装开发环境，支持实时编译
 */
export function installDevEnviroment(): void {
  shell.exec("npm i ts-node-dev -D");

  const packageJson = readJsonFile<PackageJSON>("./package.json");
  packageJson.scripts["dev:comment"] = "启动开发环境";
  packageJson.scripts["dev"] =
    "ts-node-dev --respawn --trannsplie-only src/index.ts";

  writeJsonFile<PackageJSON>("./package.json", packageJson);
}

/**
 * 支持用户选择的功能
 * @param feature 功能列表
 */
export function installFeature(feature: Array<string>): void {
  feature.forEach((item) => {
    console.log(item);

    const methodKey = `install${item}` as keyof typeof installType;
    console.log(methodKey);

    const func = installFeatureMethod[methodKey] as unknown as () => void;
    console.log(func);

    func();
  });

  installHusky(feature);

  installFeatureMethod.installBuild(feature);
}

/**
 * 安装 husky 和 lint-staged，并根据功能设置相关命令
 * @param features 用户选择的功能列表
 */
export function installHusky(features: string[]): void {
  const featureBak = JSON.parse(JSON.stringify(features));

  const hooks: any = {};
  if (featureBak.includes("CZ")) {
    hooks["commit-msg"] = "commitlint -E HUSKY_GIT_PARAMS";
  }

  const lintStaged: string[] = [];
  if (featureBak.includes("ESlint")) {
    lintStaged.push("eslint");
  }
  if (featureBak.includes("Prettier")) {
    lintStaged.push("prettier");
  }

  installFeatureMethod.installHusky(hooks, lintStaged);
}

/**
 * 整个项目安装结束，给用户提示信息
 */
export function end(projectName: string): void {
  printMsg(`Successfully created project ${yellow(projectName)}`);
  printMsg("Get started with the follwing commands；");
  printMsg("");
  printMsg(`${gray("$")} ${cyan("cd " + projectName)}`);
  printMsg(`${gray("$")} ${cyan("npm run dev")}`);
  printMsg("");
}
