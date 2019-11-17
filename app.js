require('dotenv').config();
const Telegraf = require('telegraf');
const commands = require('./commands');

const bot = new Telegraf(process.env.BOT_TOKEN);

commands.snow(bot);
commands.stream(bot);

bot.launch();
