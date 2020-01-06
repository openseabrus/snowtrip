const { OPENSLOPES } = require('../constants');

const openslopes = (app) => app.command(OPENSLOPES, ({ replyWithAudio }) => replyWithAudio({ source: './assets/fuck-you.mp3' }));

module.exports = openslopes;
