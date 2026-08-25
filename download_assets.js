import fs from 'fs';
import path from 'path';
import https from 'https';

const IMAGES = [
  { url: 'https://www.image2url.com/r2/default/images/1787655265737-0d6ed930-1c8b-4530-bff6-7eff7115f174.jpg', dest: 'logo.jpg' },
  { url: 'https://www.image2url.com/r2/default/images/1787655260441-d48b9cda-e3d0-4b1c-9aaa-35d520454c52.jpg', dest: 'banner.jpg' },
  { url: 'https://www.image2url.com/r2/default/images/1787655274692-81eb6642-cce5-4a4a-a755-32b51c4b7ebd.png', dest: 'img_1.png' },
  { url: 'https://www.image2url.com/r2/default/images/1787655270347-e9bf9605-cb0a-4839-ac1d-9db2768b3aaa.png', dest: 'img_2.png' },
  { url: 'https://www.image2url.com/r2/default/images/1787655256176-09e86a9f-20dc-4925-b0e8-0bfe553f469a.png', dest: 'img_3.png' },
  { url: 'https://www.image2url.com/r2/default/images/1787655251425-6a518eac-5b6b-471f-90e6-555edc6fc1c6.png', dest: 'img_4.png' },
  { url: 'https://www.image2url.com/r2/default/images/1787655245869-13aaba7a-8d64-4970-8e12-153291ffe901.png', dest: 'img_5.png' },
  { url: 'https://www.image2url.com/r2/default/images/1787655226576-eb9033e1-28d2-44d1-938b-90cef67b5932.png', dest: 'img_6.png' }
];

const publicImagesDir = path.join(process.cwd(), 'public', 'images');

// Ensure public/images/ directory exists
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

const agent = new https.Agent({
  rejectUnauthorized: false
});

const downloadImage = (url, destPath) => {
  return new Promise((resolve, reject) => {
    https.get(url, { agent }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${url} -> ${destPath}`);
        resolve();
      });
      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const run = async () => {
  console.log('Starting asset download pre-build step...');
  for (const img of IMAGES) {
    const destPath = path.join(publicImagesDir, img.dest);
    try {
      await downloadImage(img.url, destPath);
    } catch (err) {
      console.error(`Error downloading ${img.url}:`, err.message);
    }
  }
  console.log('Pre-build assets ready!');
};

run();
