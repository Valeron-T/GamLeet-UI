const BASE_API =
    import.meta.env.VITE_BASE_API_URL || "http://localhost:8000";

const DEFAULT_HEADERS = {
    "X-API-KEY": import.meta.env.VITE_API_KEY!,
};

async function apiFetch(path: string) {
    const response = await fetch(`${BASE_API}${path}`, {
        method: "GET",
        headers: DEFAULT_HEADERS,
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

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
