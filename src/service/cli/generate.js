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
const {
  TITLES,
  ANNOUNCES,
  FULL_TEXTS,
  CATEGORIES
} = require(`../../mocks/mocks`);
const chalk = require(`chalk`);

const generatePosts = (count) => (
  Array(count)
    .fill({})
    .map(() => ({
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      announce: shuffle(ANNOUNCES).slice(1, MAX_ANNOUNCE_COUNT).join(` `),
      fullText: shuffle(FULL_TEXTS).slice(0, getRandomInt(1, TITLES.length - 1)).join(` `),
      createdDate: getRandomDateWithinThreeMonths(),
      category: shuffle(CATEGORIES).slice(0, getRandomInt(1, TITLES.length - 1))
    }))
);

module.exports = {
  name: GENERATE_COMMAND,
  async run(args) {
    const [count] = args;
    const countPost = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countPost > 1000) {
      console.error(chalk.red(Message.ERROR_MAX_COUNT));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generatePosts(countPost));


    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(Message.SUCCESS));
    } catch (err) {
      console.error(chalk.red(Message.ERROR_WRITE));
    }
  }
};
