const { Markup } = require('telegraf');
const { STREAM, resorts } = require('../constants');

const replyStream = (app, resort) => {
  app.action(resort.name, ({ editMessageText, reply }) => {
    editMessageText(STREAM,
      reply(resort.stream));
  });
};

const stream = (app) => app.command(STREAM, ({ reply }) => {
  replyStream(app, resorts.sierranevada);
  replyStream(app, resorts.schmitten);

  return reply(STREAM,
    Markup.inlineKeyboard([
      Markup.callbackButton(resorts.schmitten.name, resorts.schmitten.name),
      Markup.callbackButton(resorts.sierranevada.name, resorts.sierranevada.name),
    ]).extra());
});

module.exports = stream;
