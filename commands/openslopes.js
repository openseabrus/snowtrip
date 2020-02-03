const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { Markup } = require('telegraf');


const { OPENSLOPES, resorts } = require('../constants');

const openSlopesSierraNevadaHandler = (resort, reply) => {
  const {
    url,
    slopes: slopesScrape,
    dataText,
    dataInfo,
    lifts: liftsScrape,
    distance,
    date: dateScrape,
    state: stateScrape,
  } = resort.openslopes;
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const $ = cheerio.load(html);

      const slopes = $(slopesScrape);
      const openSlopes = slopes.attr(dataText);
      const totalSlopes = slopes.attr(dataInfo);

      const lifts = $(liftsScrape);
      const openLifts = lifts.attr(dataText);
      const totalLifts = lifts.attr(dataInfo);

      const skiableDistance = $(distance)
        .text();

      const date = $(dateScrape)
        .text();
      const state = $(stateScrape)
        .text()
        .trim();

      reply(`*Slope report state - ${resort.caption}*
*Status:* ${state}
*Open slopes:* ${openSlopes} / ${totalSlopes}
*Open lifts:* ${openLifts} / ${totalLifts}
*Total slope distance:* ${skiableDistance}

_${date}_
`,
      { parse_mode: 'Markdown' });
    });
};

const openSlopesSchmittenHandler = (resort, reply) => {
  const {
    url,
  } = resort.openslopes;

  fetch(url)
    .then((response) => response.json())
    .then((status) => {
      const {
        slopes = [],
        lifts = [],
        lastUpdate = '',
      } = status;

      const openLifts = lifts.filter((lift) => lift.status === 'open').length;
      const totalLifts = lifts.length;

      const totalNumberOfSlopes = slopes.length;
      const numberOfOpenSlopes = slopes.filter((slope) => slope.status === 'open').length;
      const numberOfOpenSlopesEasy = slopes.filter((slope) => slope.status === 'open' && slope.popup['clients-sub-id'] === 2614).length;
      const numberOfOpenSlopesMedium = slopes.filter((slope) => slope.status === 'open' && slope.popup['clients-sub-id'] === 2615).length;
      const numberOfOpenSlopesHard = slopes.filter((slope) => slope.status === 'open' && slope.popup['clients-sub-id'] === 2616).length;
      const numberOfOpenSlopesOffPiste = slopes.filter((slope) => slope.status === 'open' && slope.popup['clients-sub-id'] === 2617).length;
      const lastUpdateFormattedDay = new Date(lastUpdate).toLocaleDateString();
      const lastUpdateFormattedHours = new Date(lastUpdate).toLocaleTimeString();
      reply(`*Slope report state - ${resort.caption}*

*⛷️Open slopes:* ${numberOfOpenSlopes} / ${totalNumberOfSlopes}
*🚠Open lifts:* ${openLifts} / ${totalLifts}
*🔵Easy slopes:* ${numberOfOpenSlopesEasy}
*🔴Medium slopes:* ${numberOfOpenSlopesMedium}
*⚫Hard slopes:* ${numberOfOpenSlopesHard}
*🟠Off piste:* ${numberOfOpenSlopesOffPiste}
_Generated in ${lastUpdateFormattedDay}_ at ${lastUpdateFormattedHours}
`,
      { parse_mode: 'Markdown' });
    });
};

const openSlopesHandler = (resort, reply) => {
  switch (resort.caption) {
    case resorts.sierranevada.caption:
      return openSlopesSierraNevadaHandler(resort, reply);
    case resorts.schmitten.caption:
      return openSlopesSchmittenHandler(resort, reply);
    default:
      return reply('No handler defined. try /opensource to contribute');
  }
};

const replyOpenSlopes = (app, resort) => {
  app.action(resort.caption + OPENSLOPES, async ({ editMessageText, reply }) => {
    editMessageText(OPENSLOPES,
      await openSlopesHandler(resort, reply));
  });
};

const openslopes = (app) => app.command(OPENSLOPES, ({ reply }) => {
  replyOpenSlopes(app, resorts.sierranevada);
  replyOpenSlopes(app, resorts.schmitten);
  return reply(OPENSLOPES,
    Markup.inlineKeyboard([
      Markup.callbackButton(resorts.schmitten.caption, resorts.schmitten.caption + OPENSLOPES),
      Markup.callbackButton(resorts.sierranevada.caption,
        resorts.sierranevada.caption + OPENSLOPES),
    ]).oneTime().extra());
});

module.exports = openslopes;
