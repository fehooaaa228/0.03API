const express = require('express');
const app = express();
const token = "6378658163:AAF-dzV7Tb6QOAtSDyD02hLhSgduDEC3r44";
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

    if(messages.length != 0){
        for(let i = messages.length - 1; i >= 0; i--){
            if(messages[i].id == +req.params.chatId){
                res.end(messages[i].text);
                break;
            }
        }
    }
    else {
        res.end("");
    }
});

app.listen(port);