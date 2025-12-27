const BASE_API =
  import.meta.env.VITE_BASE_API_URL || "http://localhost:8000";

const DEFAULT_HEADERS = {
  "X-API-KEY": import.meta.env.VITE_API_KEY!,
};

export interface DailyQuestions {
  easy: { title: string; topics: string; slug: string; status: "unattempted" | "attempted" | "completed" };
  medium: { title: string; topics: string; slug: string; status: "unattempted" | "attempted" | "completed" };
  hard: { title: string; topics: string; slug: string; status: "unattempted" | "attempted" | "completed" };
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

export async function fetchUserMargins() {
  return apiFetch("/user/margins");
}

export async function syncUserProgress() {
  const response = await fetch(`${BASE_API}/user/sync`, {
    method: "POST",
    headers: DEFAULT_HEADERS,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export async function updateDifficulty(difficulty_mode: string) {
  const response = await fetch(`${BASE_API}/user/difficulty`, {
    method: "POST",
    headers: {
      ...DEFAULT_HEADERS,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ difficulty_mode }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export async function disconnectZerodha() {
  const response = await fetch(`${BASE_API}/user/disconnect-zerodha`, {
    method: "POST",
    headers: DEFAULT_HEADERS,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export interface InventoryItem {
  item_id: string;
  quantity: number;
  acquired_at?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  unlocked_at?: string;
  progress?: number;
  target?: number;
}

export async function fetchUserInventory(): Promise<{ items: InventoryItem[] }> {
  return apiFetch("/user/inventory");
}

export async function fetchUserAchievements(): Promise<{ achievements: Achievement[] }> {
  return apiFetch("/user/achievements");
}

export async function updateLeetCodeCredentials(username: string, session: string) {
  const response = await fetch(`${BASE_API}/user/leetcode`, {
    method: "POST",
    headers: {
      ...DEFAULT_HEADERS,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, session }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
