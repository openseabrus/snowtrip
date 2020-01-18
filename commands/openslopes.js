const fetch = require('node-fetch');
const cheerio = require('cheerio');

const { OPENSLOPES, openslopes: slopesInfo } = require('../constants');

const openslopes = (app) => app.command(OPENSLOPES, ({ reply }) => {
  const {
    url,
    slopes: slopesScrape,
    dataText,
    dataInfo,
    lifts: liftsScrape,
    distance,
    date: dateScrape,
    state: stateScrape,
  } = slopesInfo;
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

      const skiableDistance = $(distance).text();

      const date = $(dateScrape).text();
      const state = $(stateScrape).text().trim();

      reply(`*Slope report state - ${state}*

*Open slopes:* ${openSlopes} / ${totalSlopes}
*Open lifts:* ${openLifts} / ${totalLifts}
*Total slope distance:* ${skiableDistance}

_${date}_
`,
      { parse_mode: 'Markdown' });
    });
});

module.exports = openslopes;
