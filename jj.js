const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
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
 const csvWriter = createCsvWriter({
  path: 'less_files.csv',
  header: [
    {id: 'File_Name', title: 'File Name'},
    {id: 'Path', title: 'Path'},
  ]
});
 csvWriter
  .writeRecords(lessFiles)
  .then(() => console.log('Less files has been saved to CSV file'));