const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
const writer = csvWriter({ headers: ['File Type', 'Count'] });
const normalizedPath = path.normalize('F:\\code\\2023\\0422');
 const directoryPath = normalizedPath;
const counts = {};
 // Recursively find all files in the directory
function findFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Recursively find files in subdirectories
      findFiles(filePath);
    } else {
      // Get the file extension
      const ext = path.extname(file).toLowerCase();
      if (ext in counts) {
        // Increment the count
        counts[ext]++;
      } else {
        // Initialize the count
        counts[ext] = 1;
      }
    }
  });
}
 // Output the counts to a CSV file
writer.pipe(fs.createWriteStream('file-count.csv'));
findFiles(directoryPath);
for (const ext in counts) {
  writer.write({ 'File Type': ext, 'Count': counts[ext] });
}
writer.end();