'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const multer = require(`multer`);
const {nanoid} = require(`nanoid`);
const path = require(`path`);

const UPLOAD_DIR = `../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

const articlesRouter = new Router();

articlesRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  res.render(`articles/new-post`, {categories});
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;

  try {
    const [article, categories] = await Promise.all([
      api.getArticle(id),
      api.getCategories()
    ]);

    res.render(`articles/edit-post`, {article, categories});
  } catch (err) {
    res.status(404).render(`errors/404`);
  }
});

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));

articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));

articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  const {body, file} = req;

  const articleData = {
    picture: file.filename,
    title: body.title,
    announce: body.announcement,
    fullText: body[`full-text`],
    createdDate: body.date,
    category: Array.isArray(body.category) ? body.category : [body.category],
  };

  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (err) {
    res.redirect(`back`);
  }
});

module.exports = articlesRouter;
