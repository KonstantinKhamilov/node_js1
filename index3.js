// Создаем объект "тикер", который будет генерировать события
const ticker = {
    events: {},
    // Метод для подписки на события
    subscribe(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    },
    // Метод для генерации событий
    emit(event, data) {
      if (this.events[event]) {
        this.events[event].forEach(callback => callback(data));
      }
    }
  };
  
  // Настраиваем тикер на генерацию событий каждые 5, 10 и 15 секунд
  setInterval(() => ticker.emit('week'), 5000);
  setInterval(() => ticker.emit('month'), 10000);
  setInterval(() => ticker.emit('year'), 15000);
  
  // Создаем объект социальной сети
  const socialNet = {
    users: [],
    posts: [],
    // Инициализация социальной сети
    init() {
      // Подписываемся на события тикера
      ticker.subscribe('week', () => {
        const newUsersCount = Math.floor(Math.random() * 4);
        for (let i = 0; i < newUsersCount; i++) {
          const user = new User();
          this.users.push(user);
          user.subscribe(this);
        }
      });
      ticker.subscribe('year', () => {
        console.log(`Отчет за год: ${this.users.length} пользователей, ${this.posts.length} публикаций`);
        console.log('Топ-3 публикации:');
        this.posts.sort((a, b) => b.likes - a.likes).slice(0, 3).forEach(post => console.log(`- ${post.text} (${post.likes} лайков)`));
      });
    },
    // Метод для подписки на события пользователей
    subscribe(user) {
      user.on('post', post => {
        this.posts.push(post);
        this.emit('socialNetPost', post);
      });
      user.on('like', post => post.likes++);
    },
    // Метод для генерации событий
    emit(event, data) {
      this.users.forEach(user => user.emit(event, data));
    }
  };
  
  // Инициализируем социальную сеть
  socialNet.init();
  
  // Создаем класс для постов
  class Post {
    constructor(text) {
      this.text = text;
      this.likes = 0;
    }
  }
  
  // Создаем класс для пользователей
  class User {
    constructor() {
      this.events = {};
      // Подписываемся на события тикера
      ticker.subscribe('month', () => this.createPost());
    }
    
    // Метод для создания постов
    createPost() {
      const words = ['кошка', 'собака', 'рыба', 'птица', 'хомяк', 'слон', 'жираф', 'тигр', 'лев', 'заяц', 'белка', 'енот', 'лиса', 'волк', 'медведь'];
      const text = Array.from({length:3}, () => words[Math.floor(Math.random() * words.length)]).join(' ');
      const post = new Post(text);
      this.emit('post', post);
    }
    
    // Метод для подписки на события
    on(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    }
    
    // Метод для генерации событий
    emit(event, data) {
      if (this.events[event]) {
        this.events[event].forEach(callback => callback(data));
      }
      
      if (event === 'socialNetPost' && Math.random() > 0.5) {
        this.emit('like', data);
      }
    }
    
    // Метод для подписки на события социальной сети
    subscribe(socialNet) {
      socialNet.subscribe(this);
    }
  }
  