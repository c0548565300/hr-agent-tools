import { Request, Response } from 'express';
import { CandidateService } from '../services/candidate.service.js';

export class CandidateController {

    public static async saveCandidateProfile(req: Request, res: Response): Promise<void> {
        try {
            // חילוץ הנתונים שהגיעו מהסוכנת הקולית בסוף הראיון
            const { githubUsername, fullName, yearsOfExperience, interviewNote } = req.body;

            // שמירה ישירה ב-DB
            const savedCandidate = await CandidateService.saveInterviewSummary(
                githubUsername,
                fullName,
                yearsOfExperience,
                interviewNote
            );

            res.status(200).json({
                success: true,
                data: savedCandidate
            });

        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message || "Internal server error while saving candidate summary"
            });
        }
    }
}