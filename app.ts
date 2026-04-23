import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import githubRoutes from './src/routes/github.routes.js';
import candidateRoutes from './src/routes/candidate.routes.js';
import { errorHandler } from './src/middlewares/error.middleware.js';
import { authMiddleware } from './src/middlewares/auth.middleware.js';

const app = express();

// --- תשתית גלובלית ---
app.use(cors()); // חובה כדי לאפשר ל-Frontend לגשת לשרת
app.use(express.json());


app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: "up", timestamp: new Date().toISOString() });
});


app.use('/api/github/profile', authMiddleware, githubRoutes);
app.use('/api/candidates', authMiddleware, candidateRoutes);


app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.use(errorHandler);

export default app;