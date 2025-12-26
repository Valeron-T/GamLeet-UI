const BASE_API = import.meta.env.VITE_BASE_API_URL || "http://localhost:8000";

export async function fetchDailyQuestions() {
  try {
    const response = await fetch(`${BASE_API}/daily-questions`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return data.problems;
  } catch (error) {
    console.error("Error fetching daily questions:", error);
    throw error;
  }
}
