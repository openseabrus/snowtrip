const Telegraf = require("telegraf");

const bot = new Telegraf("959034713:AAFPzKWjtnLYLgy5hz8NWboCJcHs8f_t25k");
bot.start(ctx => ctx.reply("Let's SKI boys!"));
bot.command("snow", ctx => ctx.telegram.sendPhoto(ctx.chat.id,`https://sierranevada.es/_extras/fotos_camaras/mobotix/current.jpg?IPIGNORE=TRUE&timestamp=${Date.now()}`));
bot.command("stream", ctx => ctx.reply("https://stream.viddeon.com/borreguiles/borreguiles.m3u8"));
bot.launch();
