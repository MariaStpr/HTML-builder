const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

fs.writeFile(path.join(__dirname, 'text.txt'), '', (err, data) => {});
stdout.write('Hello!\nEnter your message.\n');
stdin.on('data', (data) => {
  if (data === 'exit') {
    console.log('Goodbye!');
    process.exit();
  }
  let res = data.toString();
  fs.readFile(path.join(__dirname, 'text.txt'), 'utf-8', (err, data) => {
    fs.writeFile((path.join(__dirname, 'text.txt')), data + res, (err, data) => {
    });
  });
});

process.on('SIGINT', () => {
  console.log('\nCheck text file!\nGoodbye!');
  process.exit();
});