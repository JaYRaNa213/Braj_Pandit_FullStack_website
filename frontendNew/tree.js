//  Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

//  Code developed by Jay Rana © 2025. Not for reuse or redistribution

// Use import statements instead of require
import fs from "fs";
import path from "path";

// Define the root directory of the frontend
const ROOT_DIR = "./";

// Max depth level to traverse
const MAX_DEPTH = 5;

// Folders to ignore while generating the tree
const IGNORE_FOLDERS = [
  "node_modules",
  ".git",
  ".next",
  "dist",
  ".cache",
  ".idea",
  ".vscode",
];

// File to save tree output
const OUTPUT_FILE = "./frontend_tree.txt";

let treeOutput = "📂 Religious Website Frontend Tree Structure\n\n";

// Function to generate directory tree recursively
function generateTree(dirPath, prefix = "", depth = 0) {
  if (depth > MAX_DEPTH) return;

  const files = fs.readdirSync(dirPath);

  files.forEach((file, index) => {
    const filePath = path.join(dirPath, file);
    const isDirectory = fs.statSync(filePath).isDirectory();
    const isLast = index === files.length - 1;
    const newPrefix = prefix + (isLast ? "└── " : "├── ");

    // Skip ignored folders
    if (IGNORE_FOLDERS.includes(file)) return;

    // Print and save the file/folder name
    console.log(newPrefix + file);
    treeOutput += newPrefix + file + "\n";

    // If it's a directory, recurse and create a tree for subdirectories
    if (isDirectory) {
      const nextPrefix = prefix + (isLast ? "    " : "│   ");
      generateTree(filePath, nextPrefix, depth + 1);
    }
  });
}

// Start generating tree from the ROOT_DIR
console.log("📂 Generating Religious Website Frontend Tree Structure...\n");
generateTree(ROOT_DIR);
console.log("\n Tree generation complete!");

// Save the output to the file
fs.writeFileSync(OUTPUT_FILE, treeOutput);
console.log(`\n📄 Tree saved to ${OUTPUT_FILE}`);
