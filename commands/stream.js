const { keyboard } = require('telegraf/markup');
const { STREAM } = require('../constants');

const stream = (app) => {
  app.hears('🇦🇹Schmitten stream', ({ reply }) => reply(
    'https://s1.live-panorama.com/keblivestreaming/streams/schmittenTVLow.sdp.stream.m3u8',
  ));

  app.hears('🇪🇸Sierra Nevada stream',
    ({ reply }) => reply('https://stream.viddeon.com/borreguiles/borreguiles.m3u8'));

  return app.command(STREAM, ({ reply }) => reply('One time keyboard',
    keyboard(['🇪🇸Sierra Nevada stream', '🇦🇹Schmitten stream'])
      .oneTime()
      .resize()
      .extra()));
};

module.exports = stream;
