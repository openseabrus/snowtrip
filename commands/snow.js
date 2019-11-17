const { SNOW, webcams } = require('../constants');

const snow = (app) => app.command(SNOW, ({ replyWithPhoto }) => replyWithPhoto(`${webcams.mobotix.media}${Date.now()}`));

module.exports = snow;
