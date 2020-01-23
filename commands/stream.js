const { Markup } = require('telegraf');
const { STREAM, resorts } = require('../constants');

const replyStream = (app, resort) => {
  app.action(resort.caption, ({ editMessageText, reply }) => {
    editMessageText(STREAM,
      reply(resort.stream));
  });
};

const stream = (app) => app.command(STREAM, ({ reply }) => {
  replyStream(app, resorts.sierranevada);
  replyStream(app, resorts.schmitten);

  return reply(STREAM,
    Markup.inlineKeyboard([
      Markup.callbackButton(resorts.schmitten.caption, resorts.schmitten.caption),
      Markup.callbackButton(resorts.sierranevada.caption, resorts.sierranevada.caption),
    ]).extra());
});

module.exports = stream;
