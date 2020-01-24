const { Markup } = require('telegraf');
const { VIDEOS, resorts } = require('../constants');

async function extracted(reply, replyWithVideo, deleteMessage, webcams) {
  const fetchingId = await reply('Fetching videos...');
  const { message_id: messageId } = fetchingId;

  const filteredVideos = webcams
    .filter((webcam) => webcam.type === 'video')
    .map((webcam) => ({
      ...webcam,
      media: `${webcam.media}`,
    }));

  try {
    await replyWithVideo(filteredVideos);
  } catch (error) {
    reply('Ooops, something went wrong 😥');
  }
  deleteMessage(messageId);
}
const replyVIDEOS = (app, resort) => {
  app.action(resort.caption + VIDEOS, async ({
    editMessageText, reply, replyWithMediaGroup, deleteMessage,
  }) => {
    editMessageText(VIDEOS,
      await extracted(reply, replyWithMediaGroup, deleteMessage, resort.webcams));
  });
};

const videos = (app) => app.command(VIDEOS, ({ reply }) => {
  replyVIDEOS(app, resorts.schmitten);

  return reply(VIDEOS,
    Markup.inlineKeyboard([
      Markup.callbackButton(resorts.schmitten.caption, resorts.schmitten.caption + VIDEOS),
      Markup.callbackButton(resorts.sierranevada.caption, resorts.sierranevada.caption + VIDEOS),
    ]).oneTime().extra());
});

module.exports = videos;
