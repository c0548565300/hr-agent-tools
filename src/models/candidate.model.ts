import mongoose, { Schema, Document } from 'mongoose';

export interface ICandidate extends Document {
    githubUsername: string;
    fullName: string;
    yearsOfExperience: number;
    interviewNotes: string[];
    createdAt: Date;
    updatedAt: Date;
}

const candidateSchema = new Schema<ICandidate>({
    githubUsername: { type: String, required: true, unique: true, trim: true, lowercase: true },
    fullName: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    interviewNotes: { type: [String], default: [] }
}, {
    timestamps: true,
    collection: 'chana' 
});

export const CandidateModel = mongoose.model<ICandidate>('Candidate', candidateSchema);