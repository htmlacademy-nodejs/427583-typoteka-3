'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (app, searchService) => {
  route.get(`/`, (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      res.status(HttpCode.NOT_FOUND)
          .json([]);
      return;
    }

    const searchResults = searchService.findAll(query);
    const searchStatus = searchResults > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

    res.status(searchStatus)
      .json(searchResults);
  });

  app.use(`/search`, route);
};
