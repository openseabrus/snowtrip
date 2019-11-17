const { ROAD, webcams } = require('../constants');

const road = (app) => app.command(ROAD, ({ replyWithPhoto }) => replyWithPhoto(`${webcams.road}${Date.now()}`));

module.exports = road;
