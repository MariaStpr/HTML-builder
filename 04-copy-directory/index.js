const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname, 'files-copy'), (err, data) => data);
fs.promises.readdir(path.join(__dirname, 'files')).then((files) => {
  for (let file of files) {
    fs.writeFile(
      path.join(__dirname, 'files-copy', file),
      '',
      (err, data) => data);
    fs.copyFile(
      path.join(__dirname, 'files', file),
      path.join(__dirname, 'files-copy', file),
      (err, data) => data);
  }
})
