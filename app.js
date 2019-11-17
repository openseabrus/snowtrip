const commands = require('./commands');
const Telegraf = require("telegraf");
const bot = new Telegraf("959034713:AAFPzKWjtnLYLgy5hz8NWboCJcHs8f_t25k");

commands.snow(bot);
commands.stream(bot);

bot.launch();
