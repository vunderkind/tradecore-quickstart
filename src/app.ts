import express from 'express';
import dotenv from 'dotenv';
const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());


app.get('/', (_, res) => {
  res.send('Welcome to the TradeCore API tutorial!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});