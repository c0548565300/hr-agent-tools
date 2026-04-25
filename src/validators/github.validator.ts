import { z } from 'zod';

export const githubProfileSchema = z.object({
  params: z.object({
    username: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "Username parameter is required"
          : "Username must be a valid string",
    })
    .min(1, { message: "Username cannot be empty" })
    .max(39, { message: "Github username cannot exceed 39 characters" })
    .regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, { message: "Invalid Github username format" })
  })
});

export type GithubProfileRequest = z.infer<typeof githubProfileSchema>;