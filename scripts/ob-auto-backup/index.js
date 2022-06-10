const fs = require('fs');
const client = require('https');

const secret = process.env.OB_SECRET;

const baseFilePath = process.env.OB_BACKUP_PATH;

if (typeof secret !== 'string' || secret.length === 0) {
    throw new Error('Missing env var: OB_SECRET');
}

if (typeof baseFilePath !== 'string' || baseFilePath.length === 0) {
    throw new Error('Missing env var: OB_BACKUP_PATH');
}

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
}

const buildBaseUrl = (secret) => `https://datsan.openbroadcaster.pro/preview.php?x=${secret}&id=`;

const baseUrl = buildBaseUrl(secret);

const buildUrl = (id) => `${baseUrl}${id}`;

const buildFilePath = (id) => `${baseFilePath}${id}`;

const totalNumberOfMediaItems = 20;

const firstId = 2000;

const allPossibleMediaUrls = Array(totalNumberOfMediaItems)
    .fill(0)
    .map((_, index) => (index + firstId).toString());

allPossibleMediaUrls.forEach(async (id) => {
    await downloadImage(buildUrl(id), buildFilePath(id));
});
