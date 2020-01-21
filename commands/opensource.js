const { OPENSOURCE, opensource: githubUrl } = require('../constants');

const opensource = (app) => app.command(OPENSOURCE, ({ reply }) => reply(`Hello! I was created by a junior developer which means my code is worse than a caroxo's van 🚚

🚬 If you feel like improving me, just follow ${githubUrl}.`));

module.exports = opensource;
