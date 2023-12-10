const express = require('express');
const app = express();
const token = "6439888258:AAG4F7OwfniDg-i8Dp2M4kcILRDIQqez28Y";
const TelegramApi = require('node-telegram-bot-api');
const bot = new TelegramApi(token, {polling: true});
const port = 8080;
let messages = [];

bot.on('message', function(message) {
    messages.push({
        text: message.text,
        id: message.from.id,
        time: Date.now()
    });
})

app.get('/:chatId', (req, res) => {
    for(let i = 0; i < messages.length; i++){
        if(Date.now() - messages[i].time > 3000){
            messages.splice(i, 1)
        }
    }

    console.log(messages);

    if(messages.length != 0){
        for(let i = messages.length - 1; i >= 0; i++){
            if(messages[i].id == +req.params.chatId){
                res.end(JSON.stringify(messages[i]));
            }
        }
    }
    else {
        res.end("");
    }
});

app.listen(port);