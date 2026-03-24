import { errorHandler } from '#modules/common/middleware/error-handler.js';
import sampleRoutes from '#modules/samples/routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import process from 'node:process';
import { db } from './db.js';
import loginRoutes from '#modules/routes/login-routes.js';
import registerRoutes from '#modules/routes/register-routes.js';
import memoryRoutes from '#modules/routes/memory-routes.js';
import contactRoutes from '#modules/routes/contact-routes.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

app.get('/ping', cors({ origin: '*' }), (_, res) => {
  res.status(200).json({
    message: 'PONG',
  });
});

// All Global middleware
app.use(
  cors({
    origin: (origin, callback) => {
      const whitelist = ['http://localhost:5173', 'https://geomemorymap.com', 'https://www.geomemorymap.com'];
      if (whitelist.indexOf(origin) === -1) {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      } else {
        callback(null, true);
      }
    },
  }),
);
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('combined'));

// Database connection
await db(process.env.DB_URI);

// Sample route
//app.use('/', sampleRoutes);

app.use('/api/auth', loginRoutes);
app.use('/api/auth', registerRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/contact', contactRoutes);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});
// Error handling middleware, MUST always be the last
app.use(errorHandler);

export default app;
