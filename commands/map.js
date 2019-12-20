const { MAP, map: mapPic } = require('../constants');

const map = (app) => app.command(MAP, ({ reply, replyWithPhoto }) => {
  replyWithPhoto({ source: './assets/trailmap.jpg' })
    .then(() => reply(`You can also check a 3D version here: ${mapPic}`));
});

module.exports = map;
