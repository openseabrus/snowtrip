const { SNOW } = require('../constants');

const snow = (app) => app.command(SNOW, ({ telegram, chat }) => telegram.sendPhoto(chat.id, `https://sierranevada.es/_extras/fotos_camaras/mobotix/current.jpg?IPIGNORE=TRUE&timestamp=${Date.now()}`));

module.exports = snow;
