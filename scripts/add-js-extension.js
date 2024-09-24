import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function addJsExtension(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      addJsExtension(filePath);
    } else if (path.extname(file) === '.js') {
      const content = fs.readFileSync(filePath, 'utf-8');
      const updatedContent = content.replace(/from\s+['"](.+?)['"]/g, (match, p1) => {
        if (!p1.endsWith('.js') && !p1.startsWith('@') && !p1.includes('node_modules')) {
          let newPath;
          if (p1.startsWith('.')) {
            newPath = path.join(path.dirname(p1), path.basename(p1) + '.js').replace(/\\/g, '/');
          } else {
            newPath = p1 + '.js';
          }
          return `from '${newPath}'`;
        }
        return match;
      });
      fs.writeFileSync(filePath, updatedContent);
    }
  }
}

const distDir = path.resolve(__dirname, '..', 'dist');
addJsExtension(distDir);
console.log('JS extensions added successfully.');