// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// 🔐 Code developed by Jay Rana © 2025. Not for reuse or redistribution.
// insert-watermark.js
// ✅ Inserts watermark comment at the top of all .js and .jsx files in your project

const fs = require('fs');
const path = require('path');

// 🔐 Your watermark
const watermark = `// 🔐 Code developed by Jay Rana © 2025. Not for reuse or redistribution.\n`;

function addWatermark(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  if (!data.startsWith(watermark)) {
    const updatedData = watermark + data;
    fs.writeFileSync(filePath, updatedData, 'utf8');
    console.log(`✅ Watermark added: ${filePath}`);
  } else {
    console.log(`🔁 Already watermarked: ${filePath}`);
  }
}

function processDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath); // recursive call
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx'))
 {
      addWatermark(fullPath);
    }
  });
}

// Change this path to your project root or frontend/backend folder
const targetDirectory = './'; // current folder

processDirectory(targetDirectory);
