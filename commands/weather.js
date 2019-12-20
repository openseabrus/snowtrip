const fetch = require('node-fetch');
const { WEATHER, weather } = require('../constants');

const stream = (app) => app.command(WEATHER, ({ reply }) => {
  fetch(weather)
    .then((response) => response.json())
    .then(({ currently, daily }) => {
      const { data } = daily;
      const [today] = data;
      reply(
        `Current weather in Sierra Nevada: ${currently.summary}
  - *Current Temperature* ${currently.temperature} C
  - *Apparent Temperature* ${currently.apparentTemperature} C
  - *Wind Speed* ${(currently.windSpeed * 3.6).toFixed(2)} km/h
  
Additional information: ${daily.summary}
  - *Precipitation Probability* ${today.precipProbability * 100}% (type: ${today.precipType})`,
        { parse_mode: 'Markdown' },
      );
    });
});

module.exports = stream;
