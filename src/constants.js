'use strict';

const DEFAULT_COMMAND = `--help`;

const GENERATE_COMMAND = `--generate`;

const HELP_COMMAND = `--help`;

const VERSION_COMMAND = `--version`;

const SERVER_COMMAND = `--server`;

const DEFAULT_PORT = 3000;

const USER_ARGV_INDEX = 2;

const ExitCode = {
  error: 1,
  success: 0,
};

const DEFAULT_COUNT = 1;

const FILE_NAME = `mocks.json`;

const MAX_ANNOUNCE_COUNT = 5;

const Message = {
  ERROR_WRITE: `Can't write data to file...`,
  ERROR_MAX_COUNT: `Not more than 1000 publications`,
  ERROR_CREATE_SERVER: `Server creation error`,
  SUCCESS: `Operation success. File created.`,
  AWAITING_CONNECTIONS: `Ожидаю соединений на `,
  NOT_FOUND: `Not found`,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const MAX_ID_LENGTH = 6;

const articleKeys = [
  `title`,
  `announce`,
  `fullText`,
  `createdDate`,
  `category`,
];

const commentKeys = [`text`];

const API_PREFIX = `/api`;

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  DEFAULT_COMMAND,
  GENERATE_COMMAND,
  HELP_COMMAND,
  SERVER_COMMAND,
  VERSION_COMMAND,
  USER_ARGV_INDEX,
  DEFAULT_PORT,
  ExitCode,
  DEFAULT_COUNT,
  FILE_NAME,
  Message,
  MAX_ANNOUNCE_COUNT,
  HttpCode,
  MAX_ID_LENGTH,
  articleKeys,
  commentKeys,
  API_PREFIX,
  Env,
};
