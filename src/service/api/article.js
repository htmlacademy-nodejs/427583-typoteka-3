'use strict';

const {Router} = require(`express`);
const {HttpCode, Message} = require(`../../constants`);
const articleExist = require(`../middlewares/articleExist`);
const articleValidator = require(`../middlewares/articleValidator`);
const commentValidator = require(`../middlewares/commentValidator`);

const route = new Router();

module.exports = (app, articleService, commentService) => {
  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();

    return res.status(HttpCode.OK)
              .json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
                .json(`${articleId} ${Message.NOT_FOUND}`);
    }

    return res.status(HttpCode.OK)
              .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);

    return res.status(HttpCode.CREATED)
              .json(article);
  });

  route.put(`/:articleId`, articleValidator, (req, res) => {
    const {articleId} = req.params;
    const existArticle = articleService.findOne(articleId);

    if (!existArticle) {
      return res.status(HttpCode.NOT_FOUND)
                .json(`${articleId} ${Message.NOT_FOUND}`);
    }

    const updatedArticle = articleService.update(articleId, req.body);

    return res.status(HttpCode.OK)
              .json(updatedArticle);
  });

  route.delete(`/:articleId`, articleExist(articleService), (req, res) => {
    const {articleId} = req.params;
    const article = articleService.drop(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
                .json(`${articleId} ${Message.NOT_FOUND}`);
    }

    return res.status(HttpCode.OK)
              .json(article);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentService.findAll(article);

    res.status(HttpCode.OK)
        .json(comments);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const comment = commentService.create(article, req.body);

    res.status(HttpCode.CREATED)
        .json(comment);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(article, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
                .json(`${commentId} ${Message.NOT_FOUND}`);
    }

    return res.status(HttpCode.OK)
              .json(deletedComment);
  });

  app.use(`/articles`, route);
};
