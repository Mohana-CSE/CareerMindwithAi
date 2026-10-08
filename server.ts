import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import apiRouter from './server/routes';
import { connectDB } from './server/config/db';
import { seedDatabase } from './server/data/seedData';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Body parsers
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Mount API routes
app.use('/api', apiRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'CareerMind AI Intelligence Engine',
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  try {
    // Initialize DB and Seed data
    await connectDB();
    seedDatabase();

    if (!isProduction) {
      // Dev mode: Mount Vite middleware
      const { createServer } = await import('vite');
      const vite = await createServer({
        server: {
          middlewareMode: true,
          watch: {
            usePolling: false,
          },
        },
        appType: 'spa',
      });

      app.use(vite.middlewares);
    } else {
      // Production mode: Serve dist folder
      const distPath = path.resolve(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 CareerMind AI server is live on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('Fatal server startup error:', err);
    process.exit(1);
  }
}

startServer();
