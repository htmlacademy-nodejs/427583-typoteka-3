'use strict';

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./category`);
const CategoryService = require(`../data-service/category`);

const {
  HttpCode
} = require(`../../constants`);
const {
  categoryMockData,
  mockCategories
} = require(`../mocks`);


const app = express();
app.use(express.json());
category(app, new CategoryService(categoryMockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/category`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 4 categories`, () => expect(response.body.length).toBe(4));
  test(`Category names are   "Программирование", "Кино", "Железо", "Музыка"`,
      () => expect(response.body).toEqual(expect.arrayContaining(mockCategories))
  );
});
