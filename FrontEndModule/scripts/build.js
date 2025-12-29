import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function main() {
    try {
        execSync('npx vite build', { stdio: 'inherit', cwd: path.resolve(dirname, '..') });

        const sourceDistDir = path.resolve(dirname, '../dist');
        const resourcesDir = path.resolve(dirname, '../../Resources');
        const targetDistDir = path.resolve(resourcesDir, 'frontendModuleDist');

        if (!fs.existsSync(sourceDistDir)) {
            throw new Error(`Source directory does not exist: ${sourceDistDir}`);
        }

        if (!fs.existsSync(resourcesDir)) {
            throw new Error(`Resources directory does not exist: ${resourcesDir}`);
        }

        if (fs.existsSync(targetDistDir)) {
            fs.rmSync(targetDistDir, { recursive: true, force: true });
        }

        copyDirectory(sourceDistDir, targetDistDir);
        console.log(`Successfully copied dist directory to ${targetDistDir}`);

        process.exit(0);
    } catch (error) {
        console.error('Build failed:', error.message);
        process.exit(1);
    }
}

main();