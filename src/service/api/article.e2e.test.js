'use strict';

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const {
  HttpCode
} = require(`../../constants`);
const {
  articleMockData
} = require(`../mocks`);


const createAPI = () => {
  const app = express();
  const clonedData = JSON.parse(JSON.stringify(articleMockData));

  app.use(express.json());
  article(app, new ArticleService(clonedData), new CommentService());

  return app;
};

const newArticle = {
  title: `Лучшие рок-музыканты 20-века`,
  announce: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  fullText: `Он написал больше 30 хитов.`,
  createdDate: `2021-05-03 19:07:05`,
  category: [`IT`, `Программирование`]
};


describe(`API returns a list of all articles`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));
  test(`First article's id equals "KSYUdB"`, () => expect(response.body[0].id).toBe(`KSYUdB`));
});


describe(`API returns an article with given id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/KSYUdB`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Article's title is "Лучшие рок-музыканты 20-века"`,
      () => expect(response.body.title).toBe(`Лучшие рок-музыканты 20-века`));
});


describe(`API creates an article if data is valid`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Articles count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6)));
});


describe(`API refuses to create an article if data is invalid`, () => {
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {

      const badArticle = {
        ...newArticle
      };
      delete badArticle[key];

      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`Without any required property response body is equal an empty object`, async () => {
    for (const key of Object.keys(newArticle)) {

      const badArticle = {
        ...newArticle
      };
      delete badArticle[key];

      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect((res) => expect(res.body).toEqual({}));
    }
  });
});


describe(`API changes existent article`, () => {
  const app = createAPI();
  let response;

  const invalidArticle = {
    title: `Лучшие рок-музыканты 20-века`,
    announce: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    fullText: `Он написал больше 30 хитов.`,
    category: [`IT`, `Программирование`]
  };

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/KSYUdB`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Article is really changed`, () => request(app)
    .get(`/articles/KSYUdB`)
    .expect((res) => expect(res.body.title).toBe(`Лучшие рок-музыканты 20-века`)));

  test(`API returns status code 404 when trying to change non-existent article`, () => {
    return request(app)
      .put(`/articles/NOEXST`)
      .send(newArticle)
      .expect(HttpCode.NOT_FOUND);
  });

  test(`API returns an empty object when trying to change non-existent article`, () => {
    return request(app)
      .post(`/articles/NOEXST`)
      .send(newArticle)
      .expect((res) => expect(res.body).toEqual({}));
  });

  test(`API returns status code 400 when trying to change an article with invalid data`, () => {
    return request(app)
      .put(`/articles/KSYUdB`)
      .send(invalidArticle)
      .expect(HttpCode.BAD_REQUEST);
  });

  test(`API returns an empty object in the response body when trying to change an article with invalid data`, () => {
    return request(app)
      .post(`/articles/KSYUdB`)
      .send(invalidArticle)
      .expect((res) => expect(res.body).toEqual({}));
  });
});


describe(`API returns a list of comments to given article`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/KSYUdB/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 4 comments`, () => expect(response.body.length).toBe(4));
  test(`First comment's id is "dE0raH"`, () => expect(response.body[0].id).toBe(`dE0raH`));
});


describe(`API creates a comment`, () => {
  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/KSYUdB/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));
  test(`Comments count is changed`, () => request(app)
    .get(`/articles/KSYUdB/comments`)
    .expect((res) => expect(res.body.length).toBe(5)));

  test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
    return request(app)
      .post(`/articles/NOEXST/comments`)
      .send(newComment)
      .expect(HttpCode.NOT_FOUND);
  });

  test(`API refuses to create a comment to non-existent article and returns an empty object in the response body`, () => {
    return request(app)
      .post(`/articles/NOEXST/comments`)
      .send(newComment)
      .expect((res) => expect(res.body).toEqual({}));
  });

  test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {
    return request(app)
      .post(`/articles/KSYUdB/comments`)
      .send({})
      .expect(HttpCode.BAD_REQUEST);
  });

  test(`API refuses to create a comment when data is invalid, and returns an empty object instead of response body`, () => {
    return request(app)
      .post(`/articles/KSYUdB/comments`)
      .send({})
      .expect((res) => expect(res.body).toEqual({}));
  });
});


describe(`API correctly deletes a comment`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/KSYUdB/comments/dE0raH`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`dE0raH`));
  test(`Comments count is 4 now`, () => request(app)
    .get(`/articles/KSYUdB/comments`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

  test(`API refuses to delete non-existent comment`, () => {
    return request(app)
      .delete(`/articles/KSYUdB/comments/NOEXST`)
      .expect(HttpCode.NOT_FOUND);
  });

  test(`API refuses to delete non-existent comment and returns an empty object in the response body`, () => {
    return request(app)
      .post(`/articles/KSYUdB/comments/NOEXST`)
      .expect((res) => expect(res.body).toEqual({}));
  });

  test(`API refuses to delete a comment to non-existent article`, () => {
    return request(app)
      .delete(`/articles/NOEXST/comments/dE0raH`)
      .expect(HttpCode.NOT_FOUND);
  });

  test(`API refuses to delete a comment to non-existent article and returns an empty object in the response body`, () => {
    return request(app)
      .post(`/articles/NOEXST/comments/dE0raH`)
      .expect((res) => expect(res.body).toEqual({}));
  });
});
