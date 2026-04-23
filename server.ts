import 'dotenv/config';
import app from './app.js';
import { connectDB } from './src/config/database.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
   
    console.log('⏳ Connecting to database...');
    await connectDB();
    console.log('✅ Database connected successfully.');

    // 2. הפעלת השרת
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is live and listening on port ${PORT}`);
    });

    // 3. סגירה נקייה (Graceful Shutdown)
    const shutdown = (signal: string) => {
      console.log(`\n👋 ${signal} received. Starting graceful shutdown...`);
      server.close(() => {
        console.log('🛑 HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('unhandledRejection', (err: Error) => {
      console.error('❌ Unhandled Rejection! Shutting down...', err.message);
      server.close(() => {
        process.exit(1);
      });
    });

  } catch (error) {
    console.error('💥 Critical failure during startup:', error);
    process.exit(1);
  }
};

startServer();