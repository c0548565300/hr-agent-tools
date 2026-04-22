import { Request, Response } from 'express';
import { GithubService } from '../services/github.service.js';

export class GithubController {

    public static async getCandidateSummary(req: Request, res: Response): Promise<void> {
        try {

            const username = req.params.username as string;

            const summary = await GithubService.getCandidateSummary(username);

            res.status(200).json({
                success: true,
                data: summary
            });

        } catch (error: any) {
            const isRateLimit = error.message?.includes('rate limit');
            const isNotFound = error.message?.includes('not found');

            const statusCode = isRateLimit ? 429 : isNotFound ? 404 : 500;

            res.status(statusCode).json({
                success: false,
                error: error.message || "Internal server error while fetching GitHub data"
            });
        }
    }
}