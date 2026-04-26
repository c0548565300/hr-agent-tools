import { z } from 'zod';

export const saveCandidateSchema = z.object({
  body: z.object({
    githubUsername: z.string({
      error: (issue) => issue.input === undefined ? "GitHub username is required" : "GitHub username must be a string",
    }).min(1, { message: "GitHub username cannot be empty" }),
    
    fullName: z.string({
      error: (issue) => issue.input === undefined ? "Full name is required" : "Full name must be a string",
    }).min(2, { message: "Full name must be at least 2 characters" }),
    
    yearsOfExperience: z.number({
      error: (issue) => issue.input === undefined ? "Years of experience is required" : "Years of experience must be a number",
    }).min(0, { message: "Years of experience cannot be negative" }),

    interviewNote: z.string({
      error: (issue) => issue.input === undefined ? "Interview note is required" : "Interview note must be a string",
    }).min(1, { message: "Interview note cannot be empty" })
  })
});