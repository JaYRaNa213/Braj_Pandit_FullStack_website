// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// File: backendNew/tree.js
// Use import statements instead of require
import fs from 'fs';
import path from 'path';

// Directory to start from (usually 'src' or current directory '.')
const ROOT_DIR = './';

// Max depth level to traverse
const MAX_DEPTH = 5;

// Folder to ignore
const IGNORE_FOLDERS = ['node_modules', '.git', '.next', 'dist', '.cache', '.idea', '.vscode'];

// File to save tree output
const OUTPUT_FILE = './backend_tree.txt'; // ✅ Uncommented and set to the desired file name

// Initialize content for writing
let treeOutput = '📂 Religious website backend Tree structure\n\n';

// Function to print directory tree
function printTree(dirPath, prefix = '', depth = 0) {
  if (depth > MAX_DEPTH) return;

  let files;
  try {
    files = fs.readdirSync(dirPath);
  } catch (e) {
    console.error(`Error reading directory ${dirPath}: ${e.message}`);
    treeOutput += `${prefix} [Error reading directory]\n`;
    return;
  }


  files.forEach((file, index) => {
    const filePath = path.join(dirPath, file);
    let isDirectory;
    try {
      isDirectory = fs.statSync(filePath).isDirectory();
    } catch (e) {
       console.error(`Error stating file ${filePath}: ${e.message}`);
       // If stat fails, assume it's not a directory or skip
       return;
    }

    const isLast = index === files.length - 1;
    const newPrefix = prefix + (isLast ? '└── ' : '├── ');

    // Skip ignored folders
    if (isDirectory && IGNORE_FOLDERS.includes(file)) return;

    // Print and save the file/folder name
    console.log(newPrefix + file);
    treeOutput += newPrefix + file + '\n';

    if (isDirectory) {
      const nextPrefix = prefix + (isLast ? '    ' : '│   ');
      printTree(filePath, nextPrefix, depth + 1);
    }
  });
}

// Start printing from the ROOT_DIR
console.log('📂 Religious website Tree structure\n');
printTree(ROOT_DIR);
console.log('\n✅ Tree generation complete!');

// Save the output to the file
try {
    fs.writeFileSync(OUTPUT_FILE, treeOutput);
    console.log(`\n📄 Tree saved to ${OUTPUT_FILE}`);
} catch (e) {
    console.error(`Error writing tree to file ${OUTPUT_FILE}: ${e.message}`);
}

