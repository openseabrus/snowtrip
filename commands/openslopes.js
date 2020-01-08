const fetch = require('node-fetch');
const cheerio = require('cheerio');

const { OPENSLOPES, openslopes: slopesUrl } = require('../constants');

const openslopes = (app) => app.command(OPENSLOPES, ({ reply }) => {
  fetch(slopesUrl)
    .then((response) => response.text())
    .then((html) => {
      const $ = cheerio.load(html);

      const slopes = $('div.grey:nth-child(4) > div:nth-child(2) > div:nth-child(2)');
      const openSlopes = slopes.attr('data-text');
      const totalSlopes = slopes.attr('data-info');

      const lifts = $('div.grey:nth-child(4) > div:nth-child(1) > div:nth-child(2)');
      const openLifts = lifts.attr('data-text');
      const totalLifts = lifts.attr('data-info');

      const skiableDistance = $('div.big-padding:nth-child(3) > div:nth-child(3) > p:nth-child(1) > span:nth-child(2) > strong:nth-child(1)').text();

      const date = $('div.grey:nth-child(5) > div:nth-child(1) > p:nth-child(1)').text();
      const state = $('div.miniPanel:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)').text().trim();

      reply(`*Slope report state - ${state}*

*Open slopes:* ${openSlopes} / ${totalSlopes}
*Open lifts:* ${openLifts} / ${totalLifts}
*Total slope distance:* ${skiableDistance} km

_${date}_
`,
      { parse_mode: 'Markdown' });
    });
});

module.exports = openslopes;
