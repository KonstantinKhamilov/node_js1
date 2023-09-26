const fs = require('fs');
const path = require('path');
const filePath = '1.txt';

// Проверяем, существует ли уже папка "fs_test_directory"
if (!fs.existsSync(path.join(__dirname, 'fs_test_directory'))) {
    // Создаем папку "fs_test_directory"
    fs.mkdirSync(path.join(__dirname, 'fs_test_directory'));
}

// Добавляем .html файл и картинку в папку
fs.copyFileSync(path.join(__dirname, 'mystat 2.1.html'), path.join(__dirname, 'fs_test_directory', 'mystat 2.1.html'));
fs.copyFileSync(path.join(__dirname, '___-1.gif'), path.join(__dirname, 'fs_test_directory', '___-1.gif'));

// 1. Скрипт для создания 50 файлов с одним словом из стиха в каждом
const poem = "Мы живем, под себя не заметя страны";
const words = poem.split(' ');
for (let i = 0; i < 50; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    fs.writeFileSync(path.join(__dirname, 'fs_test_directory', `file${i}.txt`), word);
}
console.log('files created');

// 2. Скрипт для удаления всех файлов в папке (кроме .html)
let files = fs.readdirSync(path.join(__dirname, 'fs_test_directory'));
const filesToDelete = files.filter(file => !file.endsWith('.html'));
if (filesToDelete.length === 0) {
    console.log('directory already clear');
} else {
    filesToDelete.forEach(file => {
        fs.unlinkSync(path.join(__dirname, 'fs_test_directory', file));
    });
    console.log('remove done');
}

// 3. Скрипт для дозаписи случайной цифры в каждый файл в папке (только .txt)
files = fs.readdirSync(path.join(__dirname, 'fs_test_directory'));
const txtFiles = files.filter(file => file.endsWith('.txt'));
txtFiles.forEach(file => {
    const randomNumber = Math.floor(Math.random() * 10);
    fs.appendFileSync(path.join(__dirname, 'fs_test_directory', file), randomNumber.toString());
});
console.log('append done');

// 4. Скрипт для вывода содержимого директории
function printDirectoryContents(directoryPath) {
    if (!directoryPath) {
        console.log("path is required");
        return;
    }
    const files = fs.readdirSync(directoryPath);
    console.log(`Contents of ${directoryPath}:`);
    files.forEach(file => console.log(`- ${file}`));
}

// Указываем путь к каталогу
const directoryPath = 'node_js1';

// Выводим содержимое каталога
printDirectoryContents(directoryPath);
