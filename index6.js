// Импортируем необходимые модули
const { Readable, Writable, Transform } = require('stream');
const fs = require('fs');

// Создаем класс для пользовательского потока чтения
class MyReadable extends Readable {
  constructor(options) {
    super(options);
    // Устанавливаем размер буфера
    this.bufferSize = options.highWaterMark;
    // Инициализируем отложенный блок данных
    this.deferredChunk = '';
  }

  _read(size) {
    let chunk = this.getChunk(size);
    if (chunk.endsWith(' ')) {
      let lastSpaceIndex = chunk.lastIndexOf(' ');
      this.deferredChunk = chunk.slice(lastSpaceIndex + 1);
      chunk = chunk.slice(0, lastSpaceIndex);
    }
    console.log(`Reading data: ${chunk}`); // Вывод текущего блока данных
    this.push(chunk);
  }
  

  getChunk(size) {
    // Получаем отложенный блок данных
    let chunk = this.deferredChunk;
    this.deferredChunk = '';
    // Читаем данные до тех пор, пока не заполним буфер
    while (chunk.length < size) {
      let additionalData = this.getData(size - chunk.length);
      if (!additionalData) break;
      chunk += additionalData;
    }
    return chunk;
  }

  getData(size) {
    // Здесь должен быть ваш код для получения данных.
  }
}

// Создаем класс для пользовательского потока записи
class MyWritable extends Writable {
  constructor(options) {
    super(options);
    // Сохраняем путь к файлу и максимальный размер файла
    this.filePath = options.filePath;
    this.maxSize = options.maxSize;
  }

  _write(chunk, encoding, callback) {
    const fileSize = fs.statSync(this.filePath).size;
    if (fileSize + chunk.length > this.maxSize) {
      fs.unlinkSync(this.filePath);
      this.destroy();
      console.log('Error: File size exceeded the maximum limit'); // Вывод ошибки
      callback(new Error('File size exceeded the maximum limit'));
    } else {
      fs.appendFileSync(this.filePath, chunk);
      callback();
    }
  }
  
}

// Создаем класс для пользовательского потока трансформации
class MyTransform extends Transform {
  constructor(options) {
    super(options);
    // Сохраняем функцию обратного вызова для трансформации данных
    this.transformCallback = options.transformCallback;
  }

  _transform(chunk, encoding, callback) {
    let result = this.transformCallback(chunk.toString());
    if (result.length > this._writableState.highWaterMark) {
      console.log(`Lost data: ${result.slice(this._writableState.highWaterMark)}`); // Вывод потерянных данных
      result = result.slice(0, this._writableState.highWaterMark);
    }
    callback(null, result);
  }
}
