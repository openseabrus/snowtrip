const { WEED } = require('../constants');

const weed = (app) => app.command(WEED, ({ replyWithAudio }) => replyWithAudio({ source: './assets/snoop-dogg-smoke-weed-everyday.mp3' }));

module.exports = weed;
