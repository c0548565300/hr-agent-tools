import app from './app.js'; // שים לב לנתיב, בהתאם למיקום הקבצים שלך

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔗 Test link: http://localhost:${PORT}/api/github/profile/octocat`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection! Shutting down...', err.message);
  server.close(() => {
    process.exit(1);
  });
});