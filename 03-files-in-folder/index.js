const fs = require('fs');
const path = require('path');
fs.promises
  .readdir(path.join(__dirname, 'secret-folder'))
  .then((filenames) => {
    for (let filename of filenames) {
      fs.stat(path.join(__dirname, 'secret-folder', filename), (err, stats) => {
        if (stats.isFile()) 
          console.log(`
          ${filename} - ${path.extname(filename)} - ${stats.size / 1024}kb`);
      });
    }
  })
  .catch((err) => console.log(err));