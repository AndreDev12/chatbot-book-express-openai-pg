import bodyParser from 'body-parser';
import express from 'express';

import { router } from './routes/chatbot.js';

const app = express();
app.use(bodyParser.json());
app.use('/api/chatbot', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server listening on port http://localhost:${PORT}`)
);
