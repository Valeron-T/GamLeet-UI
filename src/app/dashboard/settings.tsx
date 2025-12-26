import { AppSidebar } from "@/components/app-sidebar.tsx"
import { SiteHeader } from "@/components/site-header.tsx"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export default function Settings() {
    const { theme, setTheme } = useTheme()
    const [evaluationTime, setEvaluationTime] = useState(() => {
        return localStorage.getItem("problem-evaluation-time") || "15:30"
    })
    const [isPrivateMode, setIsPrivateMode] = useState(() => {
        return localStorage.getItem("private-mode") === "true"
    })

    useEffect(() => {
        localStorage.setItem("problem-evaluation-time", evaluationTime)
    }, [evaluationTime])

    useEffect(() => {
        localStorage.setItem("private-mode", String(isPrivateMode))
    }, [isPrivateMode])

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col p-6">
                    <div className="max-w-2xl mx-auto w-full space-y-6">
                        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Appearance</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Dark Mode</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Switch between light and dark themes.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={theme === "dark"}
                                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">System Preferences</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Problem Evaluation Time</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Set the daily time when your problem solving is evaluated.
                                        </p>
                                    </div>
                                    <input
                                        type="time"
                                        value={evaluationTime}
                                        onChange={(e) => setEvaluationTime(e.target.value)}
                                        className="flex h-9 w-32 rounded-md border border-input bg-background/50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Private Mode</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Hide your activity from other users and public leaderboards.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={isPrivateMode}
                                        onCheckedChange={setIsPrivateMode}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
