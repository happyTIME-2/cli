/**
 * create 命令的具体任务
 */

import {
  changePackageInfo,
  end,
  initProjectDir,
  installDevEnviroment,
  installFeature,
  installTSAndInit,
  installTypesNode,
  isFileExist,
  selectFeature,
} from "../utils/create";

export default async function create(projectName: string): Promise<void> {
  isFileExist(projectName);
  const feature = await selectFeature();

  console.log("feature", feature);

  initProjectDir(projectName);
  changePackageInfo(projectName);
  installTSAndInit();
  installTypesNode();
  installDevEnviroment();
  installFeature(feature);
  end(projectName);
}
