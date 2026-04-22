import express, { Request, Response, NextFunction } from 'express';
import githubRoutes from './src/routes/github.routes.js';
import { errorHandler } from './src/middlewares/error.middleware.js';
const app = express();


app.use(express.json());


app.use('/api/github/profile', githubRoutes);


app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.use(errorHandler);
export default app;