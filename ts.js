const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const lessToScss = require('less-scss-convertor');

console.log(lessToScss)
 const lessFiles = [];
 function getLessFiles(filePath) {
  const files = fs.readdirSync(filePath);
   files.forEach(file => {
    const fileFullPath = path.join(filePath, file);
     if (fs.statSync(fileFullPath).isDirectory()) {
      getLessFiles(fileFullPath);
    } else if (path.extname(fileFullPath) === '.less') {
      lessFiles.push({File_Name: file, Path: fileFullPath});
    }
  });
}
const normalizedPath = path.normalize('F:\\code\\2023\\0422');
 getLessFiles(normalizedPath);
 lessFiles.forEach(file => {
  const {File_Name, Path} = file;
   const scssFileName = File_Name.replace('.less', '.scss');
   const scssFileFullPath = Path.replace('.less', '.scss');
   const scssContent = lessToScss(fs.readFileSync(Path, 'utf8'));
   fs.writeFileSync(scssFileFullPath, scssContent);
});