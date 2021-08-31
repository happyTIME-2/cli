inquirer.prompt([{
  type: 'input',
  name: 'projectName',
  message: '请输入项目名：',
  validate(input) {
    if (!input) {
      return '项目名不能为空';
    }
    if (fse.existsSync(input)) {
      return '当前目录已存在同名项目，请更换项目名';
    }
    return true;
  }
}]);