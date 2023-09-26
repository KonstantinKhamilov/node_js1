/* Паттерн “Медиатор”. Этот паттерн используется для упрощения взаимодействия между набором объектов.
 Вместо того чтобы каждый объект напрямую связывался с другими объектами, все взаимодействия проходят
  через один центральный “медиатор”. Это уменьшает связность между объектами и упрощает их повторное использование.
Паттерн “Фасад” предоставляет упрощенный интерфейс к сложной системе классов, библиотеке или фреймворку. Вместо того
 чтобы работать с десятками классов, клиентский код может просто вызвать несколько методов фасада.
 В этом примере ChatRoom является медиатором, который управляет всем взаимодействием между пользователями.
  Класс User представляет собой фасад, который предоставляет простой интерфейс для взаимодействия с чат-комнатой.
   Вместо того чтобы напрямую обрабатывать сообщения между пользователями, все сообщения отправляются через ChatRoom.
Этот пример демонстрирует, как паттерны “Медиатор” и “Фасад” могут быть использованы для упрощения сложных взаимодействий
 между большим количеством объектов. “Медиатор” упрощает связность между объектами, а “Фасад” предоставляет простой
  интерфейс для работы со сложной системой.*/

// Медиатор
class ChatRoom {
    constructor() {
      this.users = {};
    }
  
    register(user) {
      this.users[user.name] = user;
      user.chatroom = this;
    }
  
    send(message, from, to) {
      if (to) {
        // один-к-одному
        to.receive(message, from);
      } else {
        // вещание
        for (let key in this.users) {
          if (this.users[key] !== from) {
            this.users[key].receive(message, from);
          }
        }
      }
    }
  }
  
  // Пользователи - это фасады для взаимодействия с чат-комнатой (медиатором)
  class User {
    constructor(name) {
      this.name = name;
      this.chatroom = null;
    }
  
    send(message, to) {
      this.chatroom.send(message, this, to);
    }
  
    receive(message, from) {
      console.log(`${from.name} to ${this.name}: ${message}`);
    }
  }
  
  const chat = new ChatRoom();
  
  const brad = new User('Brad');
  const jeff = new User('Jeff');
  const sara = new User('Sara');
  
  chat.register(brad);
  chat.register(jeff);
  chat.register(sara);
  
  brad.send('Hello Jeff', jeff);
  sara.send('Hello Brad, you are the best dev ever!', brad);
  jeff.send('Hello Everyone!!!!');
  