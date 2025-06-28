// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// ✅ Updated: Always replaces or inserts watermark in .js/.jsx/.ts/.tsx files

const fs = require('fs');
const path = require('path');

// ✅ The latest watermark you want
const watermark = `// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.\n// If you theft this code, you will be punished or may face legal action by the owner.\n\n`;

// Regex to detect any previous watermark-style comment
const watermarkPattern = /^\/\/ 🔐 Code developed by Jay Rana[\s\S]*?\n{1,2}/;

function addOrReplaceWatermark(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');

  let updatedData;

  if (watermarkPattern.test(data)) {
    // Replace existing watermark
    updatedData = data.replace(watermarkPattern, watermark);
    console.log(`♻️ Replaced old watermark: ${filePath}`);
  } else {
    // Insert new watermark
    updatedData = watermark + data;
    console.log(`✅ Added new watermark: ${filePath}`);
  }

  fs.writeFileSync(filePath, updatedData, 'utf8');
}

function processDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath); // recursive
    } else if (
      file.endsWith('.js') ||
      file.endsWith('.jsx') ||
      file.endsWith('.ts') ||
      file.endsWith('.tsx')
    ) {
      addOrReplaceWatermark(fullPath);
    }
  });
}

// 🔧 Set this to your frontend/backend folder or project root
const targetDirectory = './'; // current folder

processDirectory(targetDirectory);
