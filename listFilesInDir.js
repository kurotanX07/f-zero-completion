const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2];

if (!targetDir) {
  console.error('Error: Target directory not provided.');
  process.exit(1);
}

const absoluteTargetDir = path.resolve(targetDir);

try {
  if (fs.existsSync(absoluteTargetDir)) {
    const files = fs.readdirSync(absoluteTargetDir);
    console.log(`Files in ${absoluteTargetDir}:`);
    console.log(files);
  } else {
    console.log(`Directory ${absoluteTargetDir} does not exist.`);
  }
} catch (error) {
  console.error(`Error reading directory ${absoluteTargetDir}:`, error);
  process.exit(1);
} 