import { CandidateModel, ICandidate } from '../models/candidate.model.js';

export class CandidateService {
    
    public static async saveInterviewSummary(
        githubUsername: string,
        fullName: string,
        yearsOfExperience: number,
        interviewNote: string
    ): Promise<ICandidate> {
        
        const candidate = await CandidateModel.findOneAndUpdate(
            { githubUsername: githubUsername.toLowerCase() },
            { 
                $set: { fullName, yearsOfExperience }, // מעדכן שם וניסיון
                $push: { interviewNotes: interviewNote } // מוסיף את ההתרשמות החדשה למערך
            },
            { new: true, upsert: true, runValidators: true }
        );

        return candidate;
    }
}