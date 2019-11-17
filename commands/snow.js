const snow = app => app.command("snow", ctx => ctx.telegram.sendPhoto(ctx.chat.id,`https://sierranevada.es/_extras/fotos_camaras/mobotix/current.jpg?IPIGNORE=TRUE&timestamp=${Date.now()}`));

module.exports = snow;