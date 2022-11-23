import express from 'express';
import dotenv from 'dotenv';
const app = express();

dotenv.config();

// From .env files
const TC_API_KEY = process.env.TC_API_KEY
const TC_BASE_URL = process.env.TC_BASE_URL
const TC_SIGNUP_PATH = process.env.TC_SIGNUP_PATH
const TC_APPLICATION_ID = process.env.TC_APPLICATION_ID

app.use(express.json())

app.get('/', (_, res) => {
  res.send('Welcome to the TradeCore API tutorial!');
});

type SignupRequest = {
  email: string,
  password: string,
  reference: string,
  referenceId: string | undefined
}

app.post('/signup', async (req, res) => {
  const { email, password} = req.body;

  const SIGN_UP_REQUEST: SignupRequest = {
    email,
    password,
    reference: "application",
    referenceId: TC_APPLICATION_ID
  }
  
  const fetchOptions = {
    method: 'POST',
    headers: {
      'x-tradecore-auth': TC_API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
        body: JSON.stringify(SIGN_UP_REQUEST),
  }

  try {
    await fetch(`${TC_BASE_URL}/${TC_SIGNUP_PATH}`, fetchOptions)
    .then(async data => {
      const USER_CREATED = await data.json();
      console.log(USER_CREATED);
      res.status(USER_CREATED.code || 200).send(USER_CREATED);
    });

  }
  
  catch (error) {
    console.log('Uh-oh, something went wrong!', error);
  }
});

// ADD USER UPDATING LOGIC HERE!


export default app;