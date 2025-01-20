const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, data) => {
  let template = data;
  let tagsName = template.match(/{{[a-z]+}}/gi).map((el) => el.slice(2, -2));
  tagsName.forEach((tagName) => {
    fs.readFile(
      path.join(__dirname, 'components', `${tagName}.html`),
      'utf8',
      (err, data) => {
        template = template.replace(`{{${tagName}}}`, data);
        fs.mkdir(path.join(__dirname, 'project-dist'), (err) => err);
        fs.writeFile(
          path.join(__dirname, 'project-dist', 'index.html'),
          template,
          (err, data) => data);
      });
  });
});

fs.mkdir(`${__dirname}/project-dist/assets`, (err) => err);
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
              path.join(__dirname, 'project-dist', 'style.css'),
              result.join(''),
              (err, data) => data);
          })
      }
    });
  }
});

