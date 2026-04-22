import 'dotenv/config';
import app from './app.js'; 
import { connectDB } from './src/config/database.js'; 

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔗 Test GitHub link: http://localhost:${PORT}/api/github/profile/octocat`);
  });

  process.on('unhandledRejection', (err: Error) => {
    console.error('Unhandled Rejection! Shutting down...', err.message);
    server.close(() => {
      process.exit(1);
    });
  });
};

startServer();