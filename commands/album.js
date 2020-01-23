const { Markup } = require('telegraf');
const { ALBUM, resorts } = require('../constants');

async function replyAlbum(reply, replyWithMediaGroup, deleteMessage, webcams) {
  const now = Date.now();

  const fetchingId = await reply('Fetching webcams...');
  const { message_id: messageId } = fetchingId;

  const pictures = webcams
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
}
const registerAlbumAction = (app, resort) => {
  app.action(resort.caption, async ({
    editMessageText, reply, replyWithMediaGroup, deleteMessage,
  }) => {
    editMessageText(ALBUM,
      await replyAlbum(reply, replyWithMediaGroup, deleteMessage, resort.webcams));
  });
};

const album = (app) => app.command(ALBUM, ({ reply }) => {
  registerAlbumAction(app, resorts.sierranevada);
  registerAlbumAction(app, resorts.schmitten);

  return reply(ALBUM,
    Markup.inlineKeyboard([
      Markup.callbackButton(resorts.schmitten.caption, resorts.schmitten.caption),
      Markup.callbackButton(resorts.sierranevada.caption, resorts.sierranevada.caption),
    ]).extra());
});

module.exports = album;
