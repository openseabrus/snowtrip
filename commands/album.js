const { ALBUM, webcams } = require('../constants');

const album = (app) => app.command(ALBUM, ({ reply, replyWithMediaGroup }) => {
  const now = Date.now();

  reply('Fetching webcams...');

  const pictures = Object.values(webcams).map((webcam) => ({
    ...webcam,
    media: `${webcam.media}${now}`,
  }));

  replyWithMediaGroup(pictures);
});

module.exports = album;
