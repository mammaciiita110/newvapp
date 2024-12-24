const fs = require('fs');
const path = require('path');

function copyFile(srcDir, destDir, fileName) {
  const srcPath = path.join(srcDir, fileName);
  const destPath = path.join(destDir, fileName);
  fs.copyFileSync(srcPath, destPath);
  console.log(`${fileName} was copied to ${destDir}`);
}

const srcDir = path.join(__dirname, 'src');
const destDir = path.join(__dirname, 'dist');
const jsDestDir = path.join(destDir, 'js'); // Destination directory for JS files

// Ensure the destination directory for JS files exists
if (!fs.existsSync(jsDestDir)){
  fs.mkdirSync(jsDestDir);
}

// Copy files
copyFile(srcDir, destDir, 'login.html');
copyFile(path.join(srcDir, 'js'), jsDestDir, 'login.js');
