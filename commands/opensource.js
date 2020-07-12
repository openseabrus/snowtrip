const { OPENSOURCE, opensource: repoMessage } = require('../constants');

const opensource = (app) => app.command(OPENSOURCE, ({ reply }) => reply(repoMessage));

module.exports = opensource;
