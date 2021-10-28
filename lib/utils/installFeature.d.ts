/**
 * 安装ESLint
 */
export declare function installESLint(): void;
/**
 * 安装Prettier
 */
export declare function installPrettier(): void;
/**
 * 安装CZ, 规范git 提交信息
 */
export declare function installCZ(): void;
/**
 * 安装husky 和 lint-staged， 以安装git commit 时自动化校验
 * @param hooks 需要自动执行的钩子
 * @param lintStaged，需要钩子运行的命令
 */
export declare function installHusky(hooks: {
    [key: string]: string;
}, lintStaged: string[]): void;
/**
 * 安装构建工具，例如webpack
 */
export declare function installBuild(features: Array<string>): void;
