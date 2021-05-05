const axios = require('axios');
const fs = require('fs');

const defaultUrl = 'https://www.google.com/images/srpr/logo11w.png';
const sizeLimit = 1024 * 1024; // 1MB

async function downloadImage(url = defaultUrl, pathname) {
  const res = await axios({ url, responseType: 'stream' });
  if (pathname && res.headers['content-length'] < sizeLimit) {
    res.data.pipe(fs.createWriteStream(pathname));
    return { status: 'success' };
  } else {
    return { err: 'image size limit exceeds' };
  }
}

function saveImage(pathName, imageData) {
  return new Promise((resolve) => {
    fs.writeFile(pathName, imageData, (err) => {
      if (err) return { err };
      resolve({ status: 'success' });
    });
  });
}

function rename(oldPath, newPath) {
  return new Promise((resolve) => {
    fs.rename(oldPath, newPath, (err, res) => {
      if (err) return { err };
      resolve({ newPath, status: 'success' });
    });
  });
}

function getAllFiles(folderName = '../public/images') {
  return new Promise((resolve) => {
    fs.readdir(folderName, (err, files) => {
      if (err) return { err };
      resolve({ files, status: 'success' });
    });
  });
}

function deleteFile(dirname) {
  return new Promise((resolve) => {
    fs.unlink(dirname, (err) => {
      if (err) return { err };
      resolve({ status: 'success' });
    });
  });
}

module.exports = {
  downloadImage,
  saveImage,
  rename,
  getAllFiles,
  deleteFile,
};
