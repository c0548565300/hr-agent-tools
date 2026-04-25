import { Request, Response } from 'express';
import { saveInterviewSummary } from '../services/candidate.service.js';
export class CandidateController {

    public static async saveCandidateProfile(req: Request, res: Response): Promise<void> {
        try {
           
            const { githubUsername, fullName, yearsOfExperience, interviewNote } = req.body;

            const savedCandidate = await saveInterviewSummary(
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