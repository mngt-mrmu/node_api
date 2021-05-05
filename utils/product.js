const product_model = require('../models/product');
const { downloadImage, rename } = require('./fileSystem');

const baseUrl = 'https://sideshop.in/images/';
const localDir = '../public/images/';

function fileArray(files, arr = []) {
  for (let key in files.file) {
    arr.push(files.file[key]);
  }
  return arr;
}

function checkUrl(url) {
  return /^http/.test(url);
}

async function saveImages(id, files, images = []) {
  files = fileArray(files);

  for (let index in images) {
    const { url } = images[index];
    const basename = id + index + '.png';
    images[index] = baseUrl + basename;

    if (checkUrl(url)) {
      downloadImage(url, localDir + basename);
    } else {
      const file = files.splice(0, 1)[0];
      rename(file.path, localDir + basename);
    }
  }
  return images;
}

module.exports = {
  saveImages,
};
