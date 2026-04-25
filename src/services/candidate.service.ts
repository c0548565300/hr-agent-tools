import { CandidateModel, ICandidate } from '../models/candidate.model.js';

export const saveInterviewSummary = async (
    githubUsername: string,
    fullName: string,
    yearsOfExperience: number,
    interviewNote: string
): Promise<ICandidate> => {
    
    const candidate = await CandidateModel.findOneAndUpdate(
        { githubUsername: githubUsername.toLowerCase() },
        { 
            $set: { fullName, yearsOfExperience }, 
            $push: { interviewNotes: interviewNote } 
        },
        { returnDocument: 'after', upsert: true, runValidators: true }
    );

    return candidate;
};