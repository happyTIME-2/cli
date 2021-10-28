import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import * as clear from "clear-console";

export interface PackageJSON extends JSON {
  name: string;
  description: string;
  scripts: {
    [key: string]: any;
  };
}

export interface JSON {
  [key: string]: unknown;
}

/**
 * 读取指定路径的 json文件
 * @param filename json 文件路径
 */
export function readJsonFile<T>(filename: string): T {
  const content = readFileSync(filename, { encoding: "utf-8", flag: "r" });
  return JSON.parse(content);
}

/**
 * 覆写指定路径下的 json 文件
 * @param filename json 文件的路径
 * @param content  json 内容
 */
export function writeJsonFile<T>(filename: string, content: T): void {
  writeFileSync(filename, JSON.stringify(content, null, 2));
}

/**
 * 获取项目绝对路径
 * @param projectName 项目名
 */
export function getProjectPath(projectName: string): string {
  return resolve(process.cwd(), projectName);
}

/**
 * 打印信息
 * @param msg 信息
 */
export function printMsg(msg: string): void {
  console.log(msg);
}

/**
 * 清空命令行
 */
export function clearConsole(): void {
  if (typeof clear === "function") {
    clear();
  }
}
