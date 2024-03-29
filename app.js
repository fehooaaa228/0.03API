const express = require('express');
const app = express();
const token = "6472460834:AAEK33il0Q9_m-V44fyZejoW-hUMI38_zXM";
const TelegramApi = require('node-telegram-bot-api');
const bot = new TelegramApi(token, {polling: true});
const port = 8080;
let messages = [];

const cleaner = setInterval(function() {
    for(let i = 0; i < messages.length; i++){
        if(Date.now() - messages[i].time > 3000){
            messages.splice(i, 1)
        }
    }
}, 1000);

bot.on('message', function(message) {
    console.log("new message received: " + message.text);

    messages.push({
        text: message.text,
        id: message.from.id,
        time: Date.now()
    });
})

app.get('/:chatId', (req, res) => {
    if(messages.length != 0){
        let found = false;

        for(let i = messages.length - 1; i >= 0; i--){
            if(messages[i].id == +req.params.chatId){
                found = true;
                res.end(messages[i].text);
                break;
            }
        }

        if(!found){
            res.end("none");
        }
    }
    else {
        res.end("none");
    }
});

app.listen(port, (err) => {
    if(err) console.log(err);
    else console.log("Server has been started on port " + port);
});