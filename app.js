require('dotenv').config();
const Telegraf = require('telegraf');
const commands = require('./commands');

const bot = new Telegraf(process.env.BOT_TOKEN);

Object.values(commands).map((command) => command(bot));

bot.launch();
