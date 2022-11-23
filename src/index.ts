import express from 'express';
import userRoutes from './userRoutes';
import dotenv from 'dotenv';
dotenv.config();

const api = express();
const port = 3000 || process.env.PORT;

api.use('', userRoutes);

api.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

