const { STREAM } = require('../constants');

const stream = (app) => app.command(STREAM, (ctx) => ctx.reply('https://stream.viddeon.com/borreguiles/borreguiles.m3u8'));

module.exports = stream;
