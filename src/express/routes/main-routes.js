'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const api = require(`../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  return res.render(`main`, {articles});
});

mainRouter.get(`/register`, (req, res) => res.render(`register`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));

mainRouter.get(`/search`, async (req, res) => {
  try {
    const {search} = req.query;
    const results = await api.search(search);

    res.render(`search`, {results});
  } catch (err) {
    res.render(`search`, {
      results: []
    });
  }
});

mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRouter;
