import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import routes from './routes';

const app = express();

// Application-Level Middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/public', routes.publicApi);
app.use('/protected', routes.protectedApi);
app.use('/admin', routes.adminApi);

// Start
app.listen(process.env.PORT, () =>
  console.log(`AAD protected API app listening on port ${process.env.PORT}!`),
);
