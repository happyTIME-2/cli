"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearConsole = exports.printMsg = exports.getProjectPath = exports.writeJsonFile = exports.readJsonFile = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var clear = __importStar(require("clear-console"));
/**
 * 读取指定路径的 json文件
 * @param filename json 文件路径
 */
function readJsonFile(filename) {
    var content = (0, fs_1.readFileSync)(filename, { encoding: "utf-8", flag: "r" });
    return JSON.parse(content);
}
exports.readJsonFile = readJsonFile;
/**
 * 覆写指定路径下的 json 文件
 * @param filename json 文件的路径
 * @param content  json 内容
 */
function writeJsonFile(filename, content) {
    (0, fs_1.writeFileSync)(filename, JSON.stringify(content, null, 2));
}
exports.writeJsonFile = writeJsonFile;
/**
 * 获取项目绝对路径
 * @param projectName 项目名
 */
function getProjectPath(projectName) {
    return (0, path_1.resolve)(process.cwd(), projectName);
}
exports.getProjectPath = getProjectPath;
/**
 * 打印信息
 * @param msg 信息
 */
function printMsg(msg) {
    console.log(msg);
}
exports.printMsg = printMsg;
/**
 * 清空命令行
 */
function clearConsole() {
    if (typeof clear === "function") {
        clear();
    }
}
exports.clearConsole = clearConsole;
//# sourceMappingURL=common.js.map