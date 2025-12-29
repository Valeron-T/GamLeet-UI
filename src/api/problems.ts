import { apiFetch } from "./client";

export interface Problem {
    id: number;
    title: string;
    slug: string;
    difficulty: string;
    topics: string | null;
    acc_rate: string | null;
    paid_only: number;
    completed: boolean;
}

export interface ProblemsResponse {
    problems: Problem[];
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export interface TopicsResponse {
    topics: string[];
}

export interface ProblemSheet {
    id: string;
    name: string;
    description: string;
    problem_count: number;
}

export interface SheetsResponse {
    sheets: ProblemSheet[];
}

export interface NeetCodeProblem {
    title: string;
    slug: string;
    difficulty: string;
    neetcode_url: string;
    leetcode_url: string;
    id: number | null;
    completed: boolean;
    in_database: boolean;
}

export interface NeetCode150Response {
    categories: Record<string, NeetCodeProblem[]>;
    stats: {
        total: number;
        completed: number;
        percentage: number;
    };
}

export interface ProblemSetPreference {
    type: "default" | "topics" | "sheet";
    topics: string[] | null;
    sheet: string | null;
}

export async function fetchAllProblems(
    page: number = 1,
    limit: number = 50,
    difficulty?: string,
    topic?: string,
    search?: string
): Promise<ProblemsResponse> {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    if (difficulty) params.set("difficulty", difficulty);
    if (topic) params.set("topic", topic);
    if (search) params.set("search", search);

    return apiFetch(`/problems/all?${params.toString()}`);
}

export async function fetchTopics(): Promise<TopicsResponse> {
    return apiFetch("/problems/topics");
}

export async function fetchSheets(): Promise<SheetsResponse> {
    return apiFetch("/problems/sheets");
}

export async function fetchNeetCode150(): Promise<NeetCode150Response> {
    return apiFetch("/problems/sheets/neetcode150");
}

export async function fetchProblemSetPreference(): Promise<ProblemSetPreference> {
    return apiFetch("/problems/preference");
}

export async function updateProblemSetPreference(preference: {
    type: "default" | "topics" | "sheet";
    topics?: string[];
    sheet?: string;
}): Promise<{ success: boolean; preference: ProblemSetPreference }> {
    return apiFetch("/problems/preference", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
    });
}
