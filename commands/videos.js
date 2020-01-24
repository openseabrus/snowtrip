const { Markup } = require('telegraf');
const uuidv5 = require('uuid/v5');
const { VIDEOS, resorts } = require('../constants');

async function extracted(reply, replyWithVideo, deleteMessage, webcams) {
  const fetchingId = await reply('Fetching videos...');
  const { message_id: messageId } = fetchingId;
  const filteredVideos = webcams
    .filter((webcam) => webcam.type === 'video');
  // eslint-disable-next-line no-restricted-syntax
  for await (const video of filteredVideos) {
    const videoFilename = `${uuidv5.URL}.mp4`;
    try {
      await replyWithVideo({
        url: video.media,
        filename: videoFilename,
      });
    } catch (error) {
      reply('Ooops, something went wrong 😥');
    }
  }
  deleteMessage(messageId);
}

const replyVIDEOS = (app, resort) => {
  app.action(resort.caption + VIDEOS, ({
    editMessageText, reply, replyWithVideo, deleteMessage,
  }) => {
    editMessageText(VIDEOS,
      extracted(reply, replyWithVideo, deleteMessage, resort.webcams));
  });
};

const videos = (app) => app.command(VIDEOS, ({ reply }) => {
  replyVIDEOS(app, resorts.schmitten);

  return reply(VIDEOS,
    Markup.inlineKeyboard([
      Markup.callbackButton(resorts.schmitten.caption, resorts.schmitten.caption + VIDEOS),
    ]).oneTime().extra());
});

module.exports = videos;
