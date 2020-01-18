const { ALBUM, webcams } = require('../constants');

const album = (app) => app.command(ALBUM, async ({ reply, replyWithMediaGroup, deleteMessage }) => {
  const now = Date.now();

  const fetchingId = await reply('Fetching webcams...');
  const { message_id: messageId } = fetchingId;

  const pictures = Object.values(webcams)
    .filter((webcam) => !!webcam.type)
    .map((webcam) => ({
      ...webcam,
      media: `${webcam.media}${now}`,
    }));

  try {
    await replyWithMediaGroup(pictures);
  } catch (error) {
    reply('Ooops, something went wrong 😥');
  }
  deleteMessage(messageId);
});

module.exports = album;
