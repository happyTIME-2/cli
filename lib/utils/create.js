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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = exports.installHusky = exports.installFeature = exports.installDevEnviroment = exports.installTypesNode = exports.installTSAndInit = exports.changePackageInfo = exports.initProjectDir = exports.selectFeature = exports.isFileExist = void 0;
var common_1 = require("./common");
var fs_1 = require("fs");
var inquirer_1 = require("inquirer");
var chalk_1 = require("chalk");
var shell = __importStar(require("shelljs"));
var installFeatureMethod = __importStar(require("./installFeature"));
var installType;
(function (installType) {
    installType["installESLint"] = "installESLint";
    installType["installPrettier"] = "installPrettier";
    installType["installCZ"] = "installCZ";
    installType["installHusky"] = "installHusky";
    installType["installBuild"] = "installBuild";
})(installType || (installType = {}));
/**
 * 验证当前目录下是否已经存在指定文件，如果存在则退出进行
 * @param fileName 文件名
 */
function isFileExist(fileName) {
    var filePath = (0, common_1.getProjectPath)(fileName);
    if ((0, fs_1.existsSync)(filePath)) {
        (0, common_1.printMsg)((0, chalk_1.red)(fileName + "\u6587\u4EF6\u5DF2\u7ECF\u5B58\u5728\uFF0C\u8BF7\u5148\u5220\u9664\uFF01"));
        process.exit(1);
    }
}
exports.isFileExist = isFileExist;
/**
 * 交互式命令行，让用户自己选择需要的功能
 * return ['ESLint', 'Prettier', 'CZ']
 */
function selectFeature() {
    return __awaiter(this, void 0, void 0, function () {
        var features;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, common_1.clearConsole)();
                    (0, common_1.printMsg)((0, chalk_1.blue)("TS CLI v" + require("../../package.json").version));
                    (0, common_1.printMsg)("Start initializing the project:");
                    (0, common_1.printMsg)("");
                    return [4 /*yield*/, (0, inquirer_1.prompt)([
                            {
                                name: "features",
                                type: "checkbox",
                                message: "Check the features needed for your project",
                                choices: [
                                    { name: "ESLint", value: "ESLint" },
                                    { name: "Prettier", value: "Prettier" },
                                    { name: "CZ", value: "CZ" },
                                ],
                                validate: function (answer) {
                                    if (answer.length < 1) {
                                        return "You must choose at least one topping.";
                                    }
                                    return true;
                                },
                            },
                        ])];
                case 1:
                    features = (_a.sent()).features;
                    console.log("features:" + features);
                    return [2 /*return*/, features];
            }
        });
    });
}
exports.selectFeature = selectFeature;
/**
 * 初始化项目目录
 */
function initProjectDir(projectName) {
    shell.exec("mkdir " + projectName);
    shell.cd(projectName);
    shell.exec("npm init -y");
}
exports.initProjectDir = initProjectDir;
/**
 * 改写项目中的package.json的 name 和 Description
 */
function changePackageInfo(projectName) {
    var packageJSON = (0, common_1.readJsonFile)("./package.json");
    packageJSON.name = packageJSON.description = projectName;
    (0, common_1.writeJsonFile)("./package.json", packageJSON);
}
exports.changePackageInfo = changePackageInfo;
/**
 * 安装typescript 并初始化
 */
function installTSAndInit() {
    shell.exec("npm i typescript -D && npx tsc --init");
    var tsconfigJson = {
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
    (0, common_1.writeJsonFile)("./tsconfig.json", tsconfigJson);
    shell.exec("mkdir src && touch src/index.ts");
}
exports.installTSAndInit = installTSAndInit;
/**
 * 安装 @type/node
 * 这是 node.js 的类型定义包
 */
function installTypesNode() {
    shell.exec("npm i @types/node -D");
}
exports.installTypesNode = installTypesNode;
/**
 * 安装开发环境，支持实时编译
 */
function installDevEnviroment() {
    shell.exec("npm i ts-node-dev -D");
    var packageJson = (0, common_1.readJsonFile)("./package.json");
    packageJson.scripts["dev:comment"] = "启动开发环境";
    packageJson.scripts["dev"] =
        "ts-node-dev --respawn --trannsplie-only src/index.ts";
    (0, common_1.writeJsonFile)("./package.json", packageJson);
}
exports.installDevEnviroment = installDevEnviroment;
/**
 * 支持用户选择的功能
 * @param feature 功能列表
 */
function installFeature(feature) {
    feature.forEach(function (item) {
        console.log(item);
        var methodKey = "install" + item;
        console.log(methodKey);
        var func = installFeatureMethod[methodKey];
        console.log(func);
        func();
    });
    installHusky(feature);
    installFeatureMethod.installBuild(feature);
}
exports.installFeature = installFeature;
/**
 * 安装 husky 和 lint-staged，并根据功能设置相关命令
 * @param features 用户选择的功能列表
 */
function installHusky(features) {
    var featureBak = JSON.parse(JSON.stringify(features));
    var hooks = {};
    if (featureBak.includes("CZ")) {
        hooks["commit-msg"] = "commitlint -E HUSKY_GIT_PARAMS";
    }
    var lintStaged = [];
    if (featureBak.includes("ESlint")) {
        lintStaged.push("eslint");
    }
    if (featureBak.includes("Prettier")) {
        lintStaged.push("prettier");
    }
    installFeatureMethod.installHusky(hooks, lintStaged);
}
exports.installHusky = installHusky;
/**
 * 整个项目安装结束，给用户提示信息
 */
function end(projectName) {
    (0, common_1.printMsg)("Successfully created project " + (0, chalk_1.yellow)(projectName));
    (0, common_1.printMsg)("Get started with the follwing commands；");
    (0, common_1.printMsg)("");
    (0, common_1.printMsg)((0, chalk_1.gray)("$") + " " + (0, chalk_1.cyan)("cd" + projectName));
    (0, common_1.printMsg)((0, chalk_1.gray)("$") + " " + (0, chalk_1.cyan)("npm run dev"));
    (0, common_1.printMsg)("");
}
exports.end = end;
//# sourceMappingURL=create.js.map