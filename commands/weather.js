const { Markup } = require('telegraf');
const fetch = require('node-fetch');
const {
  WEATHER, icons, resorts,
} = require('../constants');

const getWeather = async (resort, reply) => {
  await fetch(resort.weatherUrl)
    .then((response) => response.json())
    .then(({ currently, daily }) => {
      const { data } = daily;
      const [today] = data;
      return reply(
        `Current weather in ${resort.caption}: ${currently.summary} ${icons[currently.icon]}
  - *Current Temperature* ${currently.temperature} °C
  - *Apparent Temperature* ${currently.apparentTemperature} °C
  - *Wind Speed* ${(currently.windSpeed * 3.6).toFixed(2)} km/h
  
Additional information: ${daily.summary}
  - *Precipitation Probability* ${today.precipProbability * 100}% (type: ${today.precipType})`,
        { parse_mode: 'Markdown' },
      );
    })
    .catch((error) => {
      console.log(error);
      reply('Ooops, something went wrong 😥');
    });
};

const registerWeather = (app, resort) => {
  app.action(resort.caption + WEATHER, ({ editMessageText, reply }) => {
    editMessageText(WEATHER,
      getWeather(resort, reply));
  });
};


const weather = (app) => app.command(WEATHER, ({ reply }) => {
  registerWeather(app, resorts.sierranevada);
  registerWeather(app, resorts.schmitten);

  return reply(WEATHER,
    Markup.inlineKeyboard([
      Markup.callbackButton(resorts.schmitten.caption, resorts.schmitten.caption + WEATHER),
      Markup.callbackButton(resorts.sierranevada.caption, resorts.sierranevada.caption + WEATHER),
    ])
      .oneTime()
      .extra());
});

module.exports = weather;
