'use strict';

const DEFAULT_COMMAND = `--help`;

const GENERATE_COMMAND = `--generate`;

const HELP_COMMAND = `--help`;

const VERSION_COMMAND = `--version`;

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
  SUCCESS: `Operation success. File created.`
};

module.exports = {
  DEFAULT_COMMAND,
  GENERATE_COMMAND,
  HELP_COMMAND,
  VERSION_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  DEFAULT_COUNT,
  FILE_NAME,
  Message,
  MAX_ANNOUNCE_COUNT,
};
