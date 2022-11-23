import express from 'express';
import fs from 'fs';
const webhook = express();

webhook.post('/updateuser', async (req, res) => {
    const { eventName, payload} = req.body;
    const updatedUserData = JSON.stringify(payload);

    console.log('TradeCore sent an event with the payload: ', eventName);
    fs.writeFile('userUpdated.txt', updatedUserData, function (err) {
        if (err) return console.log(err);
    });
    res.sendStatus(200);
})

export default webhook;