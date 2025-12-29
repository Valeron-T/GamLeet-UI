import { apiFetch } from "./client";

export interface AuthResponse {
    message: string;
    user: {
        email: string;
        name: string;
    }
}

export interface User {
    id: string;
    email: string;
    name: string;
    picture?: string;
    provider: string;
}

export async function loginWithGoogle(token: string): Promise<AuthResponse> {
    return apiFetch("/auth/google", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });
}

export async function loginDev(email: string): Promise<AuthResponse> {
    return apiFetch("/auth/dev-login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
}

export async function logout(): Promise<{ message: string }> {
    return apiFetch("/auth/logout", {
        method: "POST",
    });
}

export async function checkAuthStatus(): Promise<User> {
    return apiFetch("/auth/me");
}
