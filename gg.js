const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const normalizedPath = path.normalize('F:\\code\\2023\\0422');
 const convertLessToScss = () => {
  const lessFolderPath = normalizedPath; // 要转换的less文件所在的文件夹路径
  const scssFolderPath = `${lessFolderPath}-converted`; // 转换后的scss文件夹路径
   // 如果scss文件夹不存在，则创建
  if (!fs.existsSync(scssFolderPath)) {
    fs.mkdirSync(scssFolderPath);
  }
   // 执行转换命令
  exec(`less-scss-convertor ${lessFolderPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行转换命令时出错：${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`转换命令输出错误：${stderr}`);
      return;
    }
    console.log(`转换命令输出：${stdout}`);
  });
};
 convertLessToScss(); // 调用函数进行转换