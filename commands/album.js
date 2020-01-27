const { Markup } = require('telegraf');
const { ALBUM, resorts } = require('../constants');

async function extracted(reply, replyWithMediaGroup, deleteMessage, webcams) {
  const now = Date.now();

  const fetchingId = await reply('Fetching webcams...');
  const { message_id: messageId } = fetchingId;

  const pictures = webcams
    .filter((webcam) => webcam.type === 'photo')
    .map((webcam) => ({
      ...webcam,
      media: `${webcam.media}${now}`,
    }));

  try {
    await replyWithMediaGroup(pictures);
  } catch (error) {
    console.log(error)
    reply('Ooops, something went wrong 😥');
  }
  deleteMessage(messageId);
}
const replyAlbum = (app, resort) => {
  app.action(resort.caption + ALBUM, async ({
    editMessageText, reply, replyWithMediaGroup, deleteMessage,
  }) => {
    editMessageText(ALBUM,
      await extracted(reply, replyWithMediaGroup, deleteMessage, resort.webcams));
  });
};

const album = (app) => app.command(ALBUM, ({ reply }) => {
  replyAlbum(app, resorts.sierranevada);
  replyAlbum(app, resorts.schmitten);
  replyAlbum(app, resorts.serradaestrela);

  return reply(ALBUM,
    Markup.inlineKeyboard([
      Markup.callbackButton(resorts.schmitten.caption, resorts.schmitten.caption + ALBUM),
      Markup.callbackButton(resorts.sierranevada.caption, resorts.sierranevada.caption + ALBUM),
      Markup.callbackButton(resorts.serradaestrela.caption, resorts.serradaestrela.caption + ALBUM),
    ]).oneTime().extra());
});

module.exports = album;
