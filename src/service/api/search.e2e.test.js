'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const SearchService = require(`../data-service/search`);

const {HttpCode} = require(`../../constants`);
const {searchMockData} = require(`../mocks`);


const app = express();
app.use(express.json());
search(app, new SearchService(searchMockData));

describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `успеха`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`RSAcLK`));

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
});
