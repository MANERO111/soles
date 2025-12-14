import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../public/img');
const backupPath = path.join(__dirname, '../public/img_backup');

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupPath)) {
    fs.mkdirSync(backupPath);
}

// Function to format file size
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);

        // Skip hidden files/directories and the specific folder itself if referenced somehow (though unlikely in readdir)
        if (file.startsWith('.')) return;

        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error('Error stating file:', file);
                return;
            }

            if (stats.isFile()) {
                const ext = path.extname(file).toLowerCase();
                const fileSizeInBytes = stats.size;
                const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

                // Process images > 0.5 MB or generally compress everything reasonable
                if (fileSizeInMegabytes > 0.5 && ['.jpg', '.jpeg', '.png'].includes(ext)) {
                    console.log(`Processing: ${file} (${formatBytes(fileSizeInBytes)})`);

                    // Backup original
                    fs.copyFileSync(filePath, path.join(backupPath, file));

                    const image = sharp(filePath);

                    // Apply compression based on type
                    if (ext === '.jpg' || ext === '.jpeg') {
                        image
                            .jpeg({ quality: 80, mozjpeg: true })
                            .toBuffer((err, buffer) => {
                                if (err) return console.error(err);
                                fs.writeFile(filePath, buffer, (err) => {
                                    if (err) console.error(err);
                                    else console.log(`Completed: ${file} -> ${formatBytes(buffer.length)}`);
                                });
                            });
                    } else if (ext === '.png') {
                        image
                            .png({ quality: 80, compressionLevel: 9 })
                            .toBuffer((err, buffer) => {
                                if (err) return console.error(err);
                                fs.writeFile(filePath, buffer, (err) => {
                                    if (err) console.error(err);
                                    else console.log(`Completed: ${file} -> ${formatBytes(buffer.length)}`);
                                });
                            });
                    }
                }
            }
        });
    });
});
