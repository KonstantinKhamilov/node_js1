// Импортируем модуль 'chalk' для работы с цветом текста в консоли
import chalk from 'chalk';

// Импортируем модуль 'figlet' для создания ASCII-арт текста
import figlet from 'figlet';

// Получаем аргументы командной строки, переданные при запуске скрипта
const args = process.argv.slice(2);

// Первый аргумент - это номер пакета (1 или 2)
const packageNum = args[0];

// Второй аргумент - это сообщение, которое нужно вывести
const message = args[1];

// Если первый аргумент равен '666'
if (packageNum === '666') {
  // Выводим обычное сообщение 'production mode'
  console.log('production mode');
} else if (packageNum % 2 === 0) { // Если первый аргумент - четное число
  // Используем пакет 'chalk' для вывода сообщения синим цветом
  console.log(chalk.blue(message));
} else { // В противном случае (если первый аргумент - нечетное число)
  // Используем пакет 'figlet' для вывода сообщения в виде ASCII-арт
  console.log(figlet.textSync(message));
}
