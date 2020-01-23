const { Markup } = require('telegraf');
const { STREAM, resorts } = require('../constants');

const stream = (app) => app.command(STREAM, ({ reply }) => {
  app.action(resorts.schmitten.name, ({ editMessageText }) => {
    editMessageText(STREAM,
      reply(resorts.schmitten.stream));
  });

  app.action(resorts.sierranevada.name, ({ editMessageText }) => {
    editMessageText(STREAM,
      reply(resorts.sierranevada.stream));
  });

  return reply(STREAM,
    Markup.inlineKeyboard([
      Markup.callbackButton(resorts.schmitten.name, resorts.schmitten.name),
      Markup.callbackButton(resorts.sierranevada.name, resorts.sierranevada.name),
    ]).extra());
});

module.exports = stream;
