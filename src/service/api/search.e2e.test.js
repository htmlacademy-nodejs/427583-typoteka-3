'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const SearchService = require(`../data-service/search`);

const {HttpCode} = require(`../../constants`);

const mockData = [{
  "id": `RSAcLK`,
  "title": `Как достигнуть успеха не вставая с кресла`,
  "announce": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Как начать действовать? Для начала просто соберитесь. Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов.`,
  "fullText": `Он написал больше 30 хитов. Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Собрать камни бесконечности легко, если вы прирожденный герой.`,
  "createdDate": `2021-03-13 05:58:36`,
  "category": [`Кино`],
  "comments": [{
    "id": `l0wMy8`,
    "text": `Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты? Плюсую, но слишком много буквы! Совсем немного... Согласен с автором! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
  }, {
    "id": `hWulk7`,
    "text": `Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-) Это где ж такие красоты? Согласен с автором! Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы!`
  }]
}, {
  "id": `fShzyU`,
  "title": `Учим HTML и CSS`,
  "announce": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Программировать не настолько сложно, как об этом говорят. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Простые ежедневные упражнения помогут достичь успеха.`,
  "fullText": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
  "createdDate": `2021-04-26 12:31:59`,
  "category": [`Кино`, `Музыка`, `Разное`, `За жизнь`, `Железо`],
  "comments": [{
    "id": `SurfYJ`,
    "text": `Совсем немного... Хочу такую же футболку :-) Плюсую, но слишком много буквы! Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором!`
  }, {
    "id": `bCJYx2`,
    "text": `Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
  }, {
    "id": `Yp0k1P`,
    "text": `Хочу такую же футболку :-) Это где ж такие красоты? Плюсую, но слишком много буквы! Планируете записать видосик на эту тему? Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
  }, {
    "id": `NCyL1u`,
    "text": `Мне кажется или я уже читал это где-то? Совсем немного... Согласен с автором! Плюсую, но слишком много буквы! Это где ж такие красоты? Планируете записать видосик на эту тему? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
  }]
}, {
  "id": `3lqU0W`,
  "title": `Борьба с прокрастинацией`,
  "announce": `Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Программировать не настолько сложно, как об этом говорят. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  "fullText": `Как начать действовать? Для начала просто соберитесь. Простые ежедневные упражнения помогут достичь успеха. Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Программировать не настолько сложно, как об этом говорят. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  "createdDate": `2021-03-01 06:13:34`,
  "category": [`Музыка`, `Разное`, `Программирование`, `Без рамки`, `Железо`, `Кино`, `IT`, `Деревья`, `За жизнь`],
  "comments": [{
    "id": `HjbxF2`,
    "text": `Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-) Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором! Планируете записать видосик на эту тему? Это где ж такие красоты?`
  }, {
    "id": `efsENE`,
    "text": `Согласен с автором! Плюсую, но слишком много буквы! Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты? Совсем немного...`
  }]
}, {
  "id": `6UIwGT`,
  "title": `Как собрать камни бесконечности`,
  "announce": `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Золотое сечение — соотношение двух величин, гармоническая пропорция. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь.`,
  "fullText": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Из под его пера вышло 8 платиновых альбомов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Как начать действовать? Для начала просто соберитесь.`,
  "createdDate": `2021-04-24 07:51:07`,
  "category": [`Кино`, `IT`, `Музыка`, `Без рамки`, `Деревья`, `Программирование`],
  "comments": [{
    "id": `J1gR88`,
    "text": `Совсем немного... Хочу такую же футболку :-) Согласен с автором! Планируете записать видосик на эту тему? Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
  }, {
    "id": `DJ6C13`,
    "text": `Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то? Согласен с автором! Плюсую, но слишком много буквы! Планируете записать видосик на эту тему? Совсем немного...`
  }, {
    "id": `jKduKQ`,
    "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором! Совсем немного... Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`
  }, {
    "id": `PSDHzj`,
    "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором! Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы! Совсем немного... Это где ж такие красоты?`
  }]
}, {
  "id": `nQMDCk`,
  "title": `Ёлки. История деревьев`,
  "announce": `Собрать камни бесконечности легко, если вы прирожденный герой. Он написал больше 30 хитов. Первая большая ёлка была установлена только в 1938 году. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  "fullText": `Достичь успеха помогут ежедневные повторения. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  "createdDate": `2021-05-02 13:35:02`,
  "category": [`Разное`, `Железо`, `Музыка`, `IT`, `Кино`, `За жизнь`],
  "comments": [{
    "id": `zaUW-Z`,
    "text": `Согласен с автором! Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы! Это где ж такие красоты? Планируете записать видосик на эту тему? Совсем немного...`
  }]
}];

const app = express();
app.use(express.json());
search(app, new SearchService(mockData));

describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `успеха`
      });
    console.log(response);
  });


  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`RSAcLK`));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({
        query: `sncnsncjsjc`
      })
      .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpCode.BAD_REQUEST)
);
