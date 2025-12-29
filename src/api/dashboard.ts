import { apiFetch } from "./client";

export interface DailyQuestions {
  easy: { title: string; topics: string; slug: string; status: "unattempted" | "attempted" | "completed" };
  medium: { title: string; topics: string; slug: string; status: "unattempted" | "attempted" | "completed" };
  hard: { title: string; topics: string; slug: string; status: "unattempted" | "attempted" | "completed" };
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
  return apiFetch("/user/sync", {
    method: "POST",
  });
}

export async function updateDifficulty(difficulty_mode: string) {
  return apiFetch("/user/difficulty", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ difficulty_mode }),
  });
}

export async function disconnectZerodha() {
  return apiFetch("/user/disconnect-zerodha", {
    method: "POST",
  });
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

export async function updateLeetCodeCredentials(username: string, session: string, allow_paid: number = 0) {
  return apiFetch("/user/leetcode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, session, allow_paid }),
  });
}

export async function updateZerodhaCredentials(api_key: string, api_secret: string) {
  return apiFetch("/user/zerodha", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ api_key, api_secret }),
  });
}
