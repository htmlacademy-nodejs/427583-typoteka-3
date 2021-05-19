'use strict';

const {HttpCode, Messages} = require(`../../constants`);

module.exports = (articleService) => (req, res, next) => {
  const {articleId} = req.params;
  const article = articleService.findOne(articleId);

  if (!article) {
    return res.status(HttpCode.NOT_FOUND)
              .send(`${articleId} ${Messages.NOT_FOUND}`);
  }

  res.locals.article = article;

  return next();
};
