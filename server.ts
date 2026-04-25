import 'dotenv/config';
import app from './app.js';
import { connectDB } from './src/config/database.js';

const PORT = Number(process.env.PORT || 3000);
 const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(` Server is live and listening on port ${PORT}`);
    });
const startServer = async () => {
  try {
   
    
    await connectDB();

    const shutdown = (signal: string) => {
      console.log(`\n${signal} received. Starting graceful shutdown...`);
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('unhandledRejection', (err: Error) => {
      console.error(' Unhandled Rejection! Shutting down...', err.message);
      server.close(() => {
        process.exit(1);
      });
    });

  } catch (error) {
    console.error(' Critical failure during startup:', error);
    process.exit(1);
  }
};

startServer();
