require('dotenv').config();
const commands = require('./commands');
const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

commands.snow(bot);
commands.stream(bot);

bot.launch();
