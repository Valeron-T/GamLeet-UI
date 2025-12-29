import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { checkAuthStatus, logout as apiLogout, User } from "@/api/auth";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshAuth = useCallback(async () => {
        try {
            const userData = await checkAuthStatus();
            setUser(userData);
        } catch (error) {
            console.log("Not authenticated", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (window.location.pathname !== "/") {
            refreshAuth();
        } else {
            setIsLoading(false);
        }
    }, [refreshAuth]);

    const logout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error(error);
        } finally {
            setUser(null);
            window.location.href = "/";
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated: !!user,
            logout,
            refreshAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
