const BASE_API =
  import.meta.env.VITE_BASE_API_URL || "http://localhost:8000";

const DEFAULT_HEADERS = {
  "X-API-KEY": import.meta.env.VITE_API_KEY!,
};

export interface DailyQuestions {
  easy: { title: string; topics: string; slug: string };
  medium: { title: string; topics: string; slug: string };
  hard: { title: string; topics: string; slug: string };
}

async function apiFetch(path: string) {
  const response = await fetch(`${BASE_API}${path}`, {
    method: "GET",
    headers: DEFAULT_HEADERS,
    credentials: "include", // ⬅️ THIS sends cookies
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export async function fetchDailyQuestions() {
  const data = await apiFetch("/daily-questions");
  return data.problems;
}

export async function fetchUserStats() {
  return apiFetch("/user/stats");
}
