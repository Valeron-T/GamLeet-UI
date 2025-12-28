import { toast } from "sonner";

async function handleResponse(response: Response) {
    if (response.status === 401) {
        // Only redirect if we're not already on the login page to avoid loops
        if (window.location.pathname !== "/") {
            console.warn("401 Unauthorized detected, redirecting to login...");
            toast.error("Session expired. Please login again.");

            // Small delay to allow toast to be visible before redirect
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        }

        return;
    }

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

export async function apiFetch(path: string, options: RequestInit = {}) {
    const storedBackendUrl = localStorage.getItem('backend_url') || "localhost:8000";
    const storedXapiKey = localStorage.getItem('x_api_key') || import.meta.env.VITE_API_KEY!;

    // Ensure the backend URL has a protocol
    const baseUrl = storedBackendUrl.startsWith('http')
        ? storedBackendUrl
        : `http://${storedBackendUrl}`;

    const response = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers: {
            "X-API-KEY": storedXapiKey,
            ...options.headers,
        },
        credentials: "include",
    });

    return handleResponse(response);
}
