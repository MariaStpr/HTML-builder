const fs = require('fs');
const path = require('path');
let result = [];
fs.promises.readdir(path.join(__dirname, 'styles')).then((files) => {
  for (let file of files) {
    fs.stat(path.join(__dirname, 'styles', file), (err, stats) => {
      if (stats.isFile() && path.extname(file) === '.css') {
        fs.readFile(
          path.join(__dirname, 'styles', file),
          'utf8',
          (err, data) => {
            result.push(data);
            fs.writeFile(
              path.join(__dirname, 'project-dist', 'bundle.css'),
              result.join(''),
              (err, data) => data);
          })
      }
    });
  }
});