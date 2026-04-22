export interface GithubProfileRaw {
    login: string;
    name: string | null;
    bio: string | null;
    public_repos: number;
    followers: number;
}

export interface GithubRepoRaw {
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    updated_at: string | null;
}

export interface ProcessedCandidateProfile {
    username: string;
    fullName: string;
    summary: string;
    totalPublicRepos: number;
    topLanguages: string[];
    recentProjects: {
        name: string;
        description: string;
        language: string;
    }[];
}