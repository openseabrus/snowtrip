const { Markup } = require('telegraf');
const { STREAM } = require('../constants');

const stream = (app) => app.command(STREAM, ({ reply }) => {
  app.action('🇦🇹Schmitten stream', ({ editMessageText }) => {
    editMessageText(STREAM,
      reply('https://s1.live-panorama.com/keblivestreaming/streams/schmittenTVLow.sdp.stream.m3u8'));
  });

  app.action('🇪🇸Sierra Nevada stream', ({ editMessageText }) => {
    editMessageText(STREAM,
      reply('https://stream.viddeon.com/borreguiles/borreguiles.m3u8'));
  });

  return reply(STREAM,
    Markup.inlineKeyboard([
      Markup.callbackButton('🇦🇹Schmitten stream', '🇦🇹Schmitten stream'),
      Markup.callbackButton('🇪🇸Sierra Nevada stream', '🇪🇸Sierra Nevada stream'),
    ]).extra());
});

module.exports = stream;
