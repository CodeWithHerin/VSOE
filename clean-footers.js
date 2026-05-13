const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('c:/Users/Asus/Desktop/VSOE/web/src');
const layoutPath = path.normalize('c:/Users/Asus/Desktop/VSOE/web/src/app/[lang]/layout.tsx');

let removedCount = 0;

for (const file of files) {
    if (file === layoutPath) continue; // Keep it in root layout

    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Remove Footer imports
    if (content.match(/import\s+Footer\s+from\s+['"].*Footer['"];?/g)) {
        content = content.replace(/import\s+Footer\s+from\s+['"].*Footer['"];?\n?/g, '');
        changed = true;
    }
    // Remove <Footer />
    if (content.match(/<Footer\s*\/>/g)) {
        content = content.replace(/<Footer\s*\/>\n?/g, '');
        changed = true;
    }

    // Remove Navbar imports
    if (content.match(/import\s+Navbar\s+from\s+['"].*Navbar['"];?/g)) {
        content = content.replace(/import\s+Navbar\s+from\s+['"].*Navbar['"];?\n?/g, '');
        changed = true;
    }
    if (content.match(/<Navbar\s*\/>/g)) {
        content = content.replace(/<Navbar\s*\/>\n?/g, '');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log('Cleaned: ' + file);
        removedCount++;
    }
}
console.log('Total files cleaned:', removedCount);
