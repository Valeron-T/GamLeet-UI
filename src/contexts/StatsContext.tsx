import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchUserStats } from "@/api/dashboard";

interface UserStats {
    lifetime_loss: number;
    available_balance: number;
    current_streak: number;
    max_streak: number;
    problems_solved: number;
    problems_since_last_life: number;
    lives: number;
    difficulty_mode: string;
    powerups_used_today: number;
    gamcoins: number;
    total_xp: number;
    name?: string;
    email?: string;
    leetcode_connected: boolean;
    leetcode_username?: string;
    zerodha_connected: boolean;
    allow_paid?: number;
    zerodha_error?: string;
    last_activity_date?: string;
    daily_risk_amount?: number;
    risk_locked?: boolean;
    email_notifications?: boolean;
}

interface StatsContextType {
    stats: UserStats | null;
    loading: boolean;
    error: any;
    refreshStats: () => Promise<UserStats>;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

import { useAuth } from "./AuthContext";

export function StatsProvider({ children }: { children: React.ReactNode }) {
    const [stats, setStats] = useState<UserStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const { isAuthenticated } = useAuth();

    const refreshStats = useCallback(async () => {
        try {
            const data = await fetchUserStats();
            setStats(data);
            setError(null);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true);
            refreshStats().catch(console.error);
        } else {
            setStats(null);
            setLoading(false);
        }
    }, [isAuthenticated, refreshStats]);

    return (
        <StatsContext.Provider value={{ stats, loading, error, refreshStats }}>
            {children}
        </StatsContext.Provider>
    );
}

export function useStats() {
    const context = useContext(StatsContext);
    if (context === undefined) {
        throw new Error("useStats must be used within a StatsProvider");
    }
    return context;
}
