
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from "@/api/client";

export function TourGuide() {
    const { user, refreshAuth } = useAuth();

    useEffect(() => {
        if (user && !user.has_completed_walkthrough) {
            const driverObj = driver({
                showProgress: true,
                animate: true,
                doneBtnText: 'Get Started',
                nextBtnText: 'Next',
                prevBtnText: 'Previous',
                onDestroyed: async () => {
                    // Mark as completed on backend even if skipped/closed
                    await apiFetch("/user/complete-walkthrough", { method: "POST" });
                    await refreshAuth();
                },
                steps: [
                    {
                        element: '#sidebar',
                        popover: {
                            title: 'Your Command Center',
                            description: 'Navigate through your dashboard, integrations, and learning resources here.',
                            side: "right",
                            align: 'start'
                        }
                    },
                    {
                        element: '#stat-lives',
                        popover: {
                            title: 'Lives & Risk',
                            description: 'You have limited lives. Missing problems or ignoring risk parameters will cost you lives!',
                            side: "bottom",
                            align: 'start'
                        }
                    },
                    {
                        element: '#stat-streak',
                        popover: {
                            title: 'Maintain Your Streak',
                            description: 'Consistency is key. Keep your streak alive to earn bonuses and unlock achievements.',
                            side: "bottom",
                            align: 'start'
                        }
                    },
                    {
                        element: '#sidebar-integrations',
                        popover: {
                            title: 'Connect Integrations',
                            description: 'Link LeetCode to track progress and Zerodha/Kite to enable real stakes.',
                            side: "right",
                            align: 'center'
                        }
                    },
                    {
                        element: '#sidebar-problem-sets',
                        popover: {
                            title: 'Problem Sets',
                            description: 'Access curated problem lists like NeetCode 150 or browse by topic.',
                            side: "right",
                            align: 'center'
                        }
                    },
                    {
                        element: '#sidebar-store',
                        popover: {
                            title: 'Power-up Store',
                            description: 'Spend your hard-earned GamCoins on Streak Freezes and other perks.',
                            side: "right",
                            align: 'center'
                        }
                    },
                ]
            });

            // Small delay to ensure elements are rendered
            setTimeout(() => {
                driverObj.drive();
            }, 1000);
        }
    }, [user, refreshAuth]);

    return null;
}
