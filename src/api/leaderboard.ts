import { apiFetch } from "./client";

export interface LeaderboardEntry {
    rank: number;
    name: string;
    total_xp: number;
    problems_solved: number;
    current_streak: number;
    public_id: string;
}

export interface LeaderboardResponse {
    entries: LeaderboardEntry[];
}

export async function fetchLeaderboard(): Promise<LeaderboardResponse> {
    return apiFetch("/leaderboard");
}
