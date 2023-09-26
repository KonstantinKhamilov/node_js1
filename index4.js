// Импортируем необходимые модули
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Функция для копирования файлов
const copyFile = (src, dest) => {
  const readStream = fs.createReadStream(src);
  const writeStream = fs.createWriteStream(dest);
  const totalSize = fs.statSync(src).size;
  let progress = 0;

  readStream.on('data', (chunk) => {
    progress += chunk.length;
    console.log(`Прогресс: ${Math.round((progress / totalSize) * 100)}%`);
    writeStream.write(chunk);
  });

  readStream.on('end', () => {
    writeStream.end();
    console.log('Копирование завершено');
  });
};

// Функция для кодирования файлов
const encodeFile = (src, encodingTablePath) => {
  const encodingTable = fs.readFileSync(encodingTablePath, 'utf-8').split('\n').reduce((acc, line) => {
    const [sym, replacer] = line.split(':');
    acc[sym] = replacer;
    return acc;
  }, {});

  const data = fs.readFileSync(src, 'utf-8');
  const encodedData = data.split('').map(char => encodingTable[char] || char).join('');
  
  fs.writeFileSync(src, encodedData);
};

// Функция для раскодирования файлов
const decodeFile = (src, encodingTablePath) => {
  const encodingTable = fs.readFileSync(encodingTablePath, 'utf-8').split('\n').reduce((acc, line) => {
    const [sym, replacer] = line.split(':');
    acc[replacer] = sym;
    return acc;
  }, {});

  const data = fs.readFileSync(src, 'utf-8');
  const decodedData = data.split('').map(char => encodingTable[char] || char).join('');
  
  fs.writeFileSync(src, decodedData);
};

// Функция для отображения прогресса текущей задачи
const printProgress = () => {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  
  // Отображаем только 4 кусочка пиццы в любой момент времени
  const pizza = '🍕'.repeat(progress % 5);
  
  process.stdout.write(`Прогресс: ${progress}% ${pizza}`);
  
  if (progress >= 100) {
    console.log('\nПроцесс завершен!');
    clearInterval(interval);
    return;
  }
  
  progress += Math.floor(Math.random() * (10 - 1 + 1)) + 1;
};

// Запускаем функции в зависимости от переданных аргументов
switch (process.argv[2]) {
case 'copy':
  copyFile(path.resolve(process.argv[3]), path.resolve(process.argv[4]));
  break;
case 'encode':
  encodeFile(path.resolve(process.argv[3]), path.resolve(process.argv[4]));
  break;
case 'decode':
  decodeFile(path.resolve(process.argv[3]), path.resolve(process.argv[4]));
  break;
default:
  console.log('Неизвестная команда');
}

// Запускаем отображение прогресса
let progress = 0;
const interval = setInterval(printProgress, 500);
