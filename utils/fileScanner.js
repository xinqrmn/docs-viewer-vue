import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
const scanDirectory = (dir, basePath = '') => {
    return fs.readdirSync(dir).map((item) => {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(basePath, item);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            return {
                key: '' + uuidv4(),
                label: item,
                icon: 'pi pi-fw pi-folder',
                data: `/docs/${relativePath.replaceAll('\\', '/')}`,
                children: scanDirectory(fullPath, relativePath)
            };
        }
        else {
            return {
                key: '' + uuidv4(),
                label: item,
                icon: 'pi pi-fw pi-file',
                ext: path.extname(item).toLowerCase().replace('.', ''),
                data: `/docs/${relativePath.replaceAll('\\', '/')}`,
                children: null
            };
        }
    });
};
const structure = scanDirectory(path.join(process.cwd(), '/public/docs'));
const files = scanDirectory('./public/docs');
fs.writeFileSync(path.join(process.cwd(), 'public/file-structure.json'), JSON.stringify(structure, null, 2), 'utf-8');
console.log(`Found ${files.length} files`);
