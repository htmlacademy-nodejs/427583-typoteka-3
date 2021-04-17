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
  ERROR_MAX_COUNT: `Не больше 1000 публикаций`,
  ERROR_CREATE_SERVER: `Ошибка при создании сервера`,
  SUCCESS: `Operation success. File created.`,
  AWAITING_CONNECTIONS: `Ожидаю соединений на `,
  NOT_FOUND: `Not found`,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
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
};
