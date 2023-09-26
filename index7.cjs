/*const buf1 = Buffer.from('text1');
const buf2 = Buffer.from('2text');
buf2.copy(buf1,2,2,3);
console.log(String(buf1));*/

//Compression
/*import zlib from 'zlib';
import fs from 'fs';

const gzip = zlib.createGzip();

const r = fs.createReadStream("./1.txt");
const w = fs.createWriteStream("./1.txt.gz");

r.pipe(gzip).pipe(w);*/

/*import zlib from 'zlib';
import fs from 'fs';

const gzip = zlib.createGzip();

const r = fs.createReadStream("./1.txt");
const w = fs.createWriteStream("./2.txt.gz");

r.pipe(unzip).pipe(w);*/

// std-in std-out

/*process.stdin.on('data',(data) => {

    if(data === 'pizza'){
        console.log('pizza')
    } else {
        console.log('not pizza')
    }
})*/

// Импортируем необходимые модули Node.js
const fs = require('fs'); // Для работы с файловой системой
const zlib = require('zlib'); // Для сжатия и распаковки файлов
const readline = require('readline'); // Для взаимодействия с пользователем через консоль

// Создаем интерфейс readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Переменная для режима "cherry"
let cherry = false;

// Главное меню приложения
function mainMenu() {
  // Задаем пользователю вопрос и обрабатываем его ответ
  rl.question('Выберите команду (compress, uncompress, help, end): ', (command) => {
    // Если пользователь ввел "cherry", переключаем режим "cherry" и возвращаемся в главное меню
    if (command === 'cherry') {
      cherry = !cherry;
      return mainMenu();
    }

    // В зависимости от команды пользователя вызываем соответствующую функцию
    if (command === 'compress') {
      compressFile();
    } else if (command === 'uncompress') {
      uncompressFile();
    } else if (command === 'help') {
      console.log('compress: сжимает файл\nuncompress: распаковывает файл\nend: завершает работу приложения');
      mainMenu();
    } else if (command === 'end') {
      rl.close();
    } else {
      console.log('Неизвестная команда. Попробуйте еще раз.');
      mainMenu();
    }
  });
}

// Функция для сжатия файла
function compressFile() {
  // Запрашиваем у пользователя путь к файлу для сжатия и путь для сохранения сжатого файла
  rl.question('Введите путь к файлу для сжатия: ', (inputPath) => {
    rl.question('Введите путь для сохранения сжатого файла: ', (outputPath) => {
      // Создаем потоки чтения и записи и объект Gzip для сжатия файла
      const gzip = zlib.createGzip();
      const source = fs.createReadStream(inputPath);
      const destination = fs.createWriteStream(outputPath.endsWith('.gz') ? outputPath : `${outputPath}.gz`);

      // Сжимаем файл и выводим сообщение об успешном сжатии
      source.pipe(gzip).pipe(destination).on('finish', () => {
        console.log(cherry ? '🍒 Файл успешно сжат!' : 'Файл успешно сжат!');
        mainMenu();
      });
    });
  });
}

// Функция для распаковки файла
function uncompressFile() {
  // Запрашиваем у пользователя путь к файлу для распаковки
  rl.question('Введите путь к файлу для распаковки: ', (inputPath) => {
    // Проверяем, имеет ли файл расширение .gz
    if (!inputPath.endsWith('.gz')) {
      console.log('Файл должен иметь расширение .gz');
      return uncompressFile();
    }

    // Создаем потоки чтения и записи и объект Gunzip для распаковки файла
    const gunzip = zlib.createGunzip();
    const source = fs.createReadStream(inputPath);
    const destination = fs.createWriteStream(inputPath.slice(0, -3));

    // Распаковываем файл и выводим сообщение об успешной распаковке
    source.pipe(gunzip).pipe(destination).on('finish', () => {
      console.log(cherry ? '🍒 Файл успешно распакован!' : 'Файл успешно распакован!');
      mainMenu();
    });
  });
}

// Запускаем главное меню приложения
mainMenu();
