'use strict';

const fs = require(`fs`).promises;

const {
  getRandomInt,
  shuffle,
  getRandomDateWithinThreeMonths
} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  Message,
  GENERATE_COMMAND,
  ExitCode,
  MAX_ANNOUNCE_COUNT
} = require(`../../constants`);
const chalk = require(`chalk`);

const path = require(`path`);

const FILE_SENTENCES_PATH = path.resolve(__dirname, `../../../data`, `sentences.txt`);
const FILE_TITLES_PATH = path.resolve(__dirname, `../../../data`, `titles.txt`);
const FILE_CATEGORIES_PATH = path.resolve(__dirname, `../../../data`, `categories.txt`);

const generatePosts = (count, titles, sentences, categories) => (
  Array(count)
    .fill({})
    .map(() => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(1, MAX_ANNOUNCE_COUNT).join(` `),
      fullText: shuffle(sentences).slice(0, getRandomInt(1, titles.length - 1)).join(` `),
      createdDate: getRandomDateWithinThreeMonths(),
      category: shuffle(categories).slice(0, getRandomInt(1, titles.length - 1))
    }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `UTF-8`);
    return content.split(`\n`).filter((stringItem) => stringItem !== ``);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  name: GENERATE_COMMAND,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countPost = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countPost > 1000) {
      console.error(chalk.red(Message.ERROR_MAX_COUNT));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generatePosts(countPost, titles, sentences, categories));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(Message.SUCCESS));
    } catch (err) {
      console.error(chalk.red(Message.ERROR_WRITE));
    }
  }
};
