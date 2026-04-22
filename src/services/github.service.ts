import { Octokit, RequestError } from 'octokit';
import { GithubProfileRaw, GithubRepoRaw, ProcessedCandidateProfile } from '../models/github.types.js';

export class GithubService {
    private static octokitClient = new Octokit();

    
    public static async getCandidateSummary(username: string): Promise<ProcessedCandidateProfile> {
        const [profileData, reposData] = await Promise.all([
            this.getUserProfile(username),
            this.getUserRepositories(username, 5)
        ]);

        
        const languagesSet = new Set<string>();
        reposData.forEach(repo => {
            if (repo.language) {
                languagesSet.add(repo.language);
            }
        });
        const topLanguages = Array.from(languagesSet);

        
        return {
            username: profileData.login,
            fullName: profileData.name || profileData.login, 
            summary: profileData.bio || "No bio provided by the candidate.",
            totalPublicRepos: profileData.public_repos,
            topLanguages: topLanguages,
            recentProjects: reposData.map(repo => ({
                name: repo.name,
                description: repo.description || "No description",
                language: repo.language || "Unknown",
            }))
        };
    }

    
    private static async getUserProfile(username: string): Promise<GithubProfileRaw> {
        try {
            const response = await this.octokitClient.rest.users.getByUsername({
                username,
            });

            return {
                login: response.data.login,
                name: response.data.name,
                bio: response.data.bio,
                public_repos: response.data.public_repos,
                followers: response.data.followers,
            };
        } catch (error: unknown) {
            this.handleGithubError(error, username);
        }
    }

    private static async getUserRepositories(username: string, limit: number = 10): Promise<GithubRepoRaw[]> {
        try {
            const response = await this.octokitClient.rest.repos.listForUser({
                username,
                sort: 'updated',
                per_page: limit,
            });

            return response.data.map((repo) => ({
                name: repo.name,
                description: repo.description ?? null,
                language: repo.language ?? null,
                stargazers_count: repo.stargazers_count ?? 0,
                updated_at: repo.updated_at ?? null,
            }));
        } catch (error: unknown) {
            this.handleGithubError(error, username);
        }
    }

    private static handleGithubError(error: unknown, username: string): never {
        if (error instanceof RequestError) {
            if (error.status === 404) {
                throw new Error(`Candidate profile '${username}' was not found on GitHub.`);
            }
            if (error.status === 403) {
                throw new Error('GitHub API rate limit exceeded (60 requests/hr). Please wait or add a token.');
            }
        }
        throw new Error(`Failed to fetch data from GitHub: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}