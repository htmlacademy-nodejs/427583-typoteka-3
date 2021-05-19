'use strict';

const {articleKeys, HttpCode, Message} = require(`../../constants`);

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keyExists = articleKeys.every((key) => keys.includes(key));

  if (!keyExists) {
    return res.status(HttpCode.BAD_REQUEST)
              .send(Message.BAD_REQUEST);
  }

  return next();
};
