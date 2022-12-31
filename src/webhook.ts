import express from 'express';
import crypto from 'crypto';
import fs from 'fs';
const webhook = express();

const USER_UPDATED = 'user.updated';

// From .env files
const TC_API_KEY = process.env.TC_API_KEY
const TC_BASE_URL = process.env.TC_BASE_URL

const randomId = crypto.randomBytes(20).toString('hex');

webhook.post('/updateuser', async (req, res) => {
    const { eventName, payload} = req.body;
    console.log('Payload', payload);
    const { status, id} = payload;

    const fetchOptions = {
    method: 'PATCH',
    headers: {
      'x-tradecore-auth': TC_API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        idempotenceId: randomId,
    })
  }

try {
    if (eventName === USER_UPDATED
    && status === 'complete') {
        await fetch(`${TC_BASE_URL}/users/${id}/applicant/onfido`, fetchOptions)
            .then(async (res) => {
                const data = await res.json();
                await fetch(`${TC_BASE_URL}/users/${id}/kyc-reports/onfido/identity`,
                {
                    method: 'POST',
                    headers: {
                        'x-tradecore-auth': TC_API_KEY,
                    }
                })
                .then(async (res) => {
                    const data = await res.json();
                    console.log('Second wave', data);
                    await fetch(`${TC_BASE_URL}/users/${id}/kyc-reports/complyAdvantage/pepsAndSanctions`, {method: 'POST'})
                })
            })
    }
    res.sendStatus(200);
} catch (error) {
    console.log('Whoopsie!', error);
}
})

export default webhook;