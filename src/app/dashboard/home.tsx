import { AppSidebar } from "@/components/app-sidebar.tsx"
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
// import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards.tsx"
import SimpleTimer from "@/components/simple-timer"
import { SiteHeader } from "@/components/site-header.tsx"
import TaskQuestion from "@/components/task-question"
import { Card, CardContent } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Progress } from "@/components/ui/progress";
import { Calendar, RefreshCcw } from "lucide-react"
import { FaFire } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchDailyQuestions, DailyQuestions, syncUserProgress } from "@/api/dashboard";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { toast } from "sonner";
import { useStats } from "@/contexts/StatsContext";

function TaskQuestionSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/5">
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-5 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <Skeleton className="h-8 w-24 rounded-lg" />
    </div>
  )
}

export default function Home() {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(15, 30, 0, 0); // Set target time to 3:30 PM IST

  let remainingTimeInSeconds = Math.floor((targetTime.getTime() - now.getTime()) / 1000);
  if (remainingTimeInSeconds < 0) {
    remainingTimeInSeconds += 24 * 60 * 60; // Add 24 hours if the target time is for the next day
  }

  const { stats, refreshStats } = useStats()
  const totalDuration = 3600 * 8
  const [dailyQuestions, setDailyQuestions] = useState<DailyQuestions | null>(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchDailyQuestions()
      .then(setDailyQuestions)
      .catch(console.error);
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncUserProgress();
      const [, newQuestions] = await Promise.all([
        refreshStats(),
        fetchDailyQuestions()
      ]);
      setDailyQuestions(newQuestions);
      toast.success("Progress synchronized with LeetCode!");
    } catch (error) {
      console.error("Sync failed:", error);
      toast.error("Failed to sync with LeetCode. Try again later.");
    } finally {
      setSyncing(false);
    }
  };

  // Logic for progress bar: 
  const solvedToday = stats?.last_activity_date === new Date().toISOString().split('T')[0];
  const progressValue = solvedToday ? 100 : 0;
  const progressText = solvedToday ? "1 of 1 Daily Challenge Completed" : "0 of 1 Daily Challenge Completed";

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col h-full">
          <div className="@container/main flex flex-1 flex-col gap-2 ">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 md:px-6">

                {/* Problems Card */}
                <Card className="lg:col-span-2 p-8 bg-gradient-to-br from-card to-card/50 border-border/50 shadow-2xl transition-all duration-300 hover:shadow-primary/5 hover:border-primary/20">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">Curated Problems</h1>
                    <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                      Complete at least 1 problem to maintain your streak. Refreshes daily at 3:30 PM IST.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {stats && !stats.leetcode_connected ? (
                      <div className="flex flex-col items-center justify-center py-12 px-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 text-center animate-in fade-in zoom-in duration-500">
                        <div className="p-4 rounded-full bg-primary/10 border border-primary/20 mb-4">
                          <RefreshCcw size={32} className="text-primary animate-pulse" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">LeetCode Not Connected</h3>
                        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                          Connect your LeetCode account to access curated daily problems and earn rewards like GamCoins and XP.
                        </p>
                        <button
                          onClick={() => window.location.href = "/integrations"}
                          className="mt-6 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                          Connect Now <RefreshCcw size={14} />
                        </button>
                      </div>
                    ) : dailyQuestions ? (
                      <>
                        <TaskQuestion
                          title={dailyQuestions.easy.title}
                          tags={dailyQuestions.easy.topics?.split(", ") || []}
                          state={dailyQuestions.easy.status}
                          difficulty="easy"
                          slug={dailyQuestions.easy.slug}
                        />
                        <TaskQuestion
                          title={dailyQuestions.medium.title}
                          tags={dailyQuestions.medium.topics?.split(", ") || []}
                          state={dailyQuestions.medium.status}
                          difficulty="med"
                          slug={dailyQuestions.medium.slug}
                        />
                        <TaskQuestion
                          title={dailyQuestions.hard.title}
                          tags={dailyQuestions.hard.topics?.split(", ") || []}
                          state={dailyQuestions.hard.status}
                          difficulty="hard"
                          slug={dailyQuestions.hard.slug}
                        />
                      </>
                    ) : (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <TaskQuestionSkeleton key={i} />
                        ))}
                      </div>
                    )}
                  </div>
                </Card>

                <div className="lg:col-span-2 flex flex-col gap-6">
                  {/* Timer Card */}
                  <Card className="flex-1 p-8 bg-gradient-to-br from-card to-card/50 border-border/50 shadow-xl flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <CardContent className="p-0 relative z-10 w-full">
                      <SimpleTimer
                        totalDuration={totalDuration}
                        initialRemainingTime={remainingTimeInSeconds}
                        onComplete={() => console.log("Timer done")}
                      />
                    </CardContent>
                  </Card>

                  {/* Actions Card */}
                  <Card className="flex-1 p-8 bg-gradient-to-br from-card to-card/50 border-border/50 shadow-xl">
                    <CardContent className="p-0">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-xl font-bold tracking-tight">Daily Progress</h2>
                          <p className="text-sm text-muted-foreground">{progressText}</p>
                        </div>
                        <div className="w-1/2">
                          <Progress value={progressValue} className="h-2 bg-muted/20" />
                          <div className="flex justify-between mt-1.5">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">Focus</span>
                            <span className="text-[10px] uppercase font-bold text-primary">{progressValue}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 bg-muted/10 hover:bg-muted/20 hover:border-border transition-all group ${syncing ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={handleSync}
                          disabled={syncing}
                        >
                          <RefreshCcw size={24} className={`mb-2 text-muted-foreground group-hover:text-primary transition-colors ${syncing ? 'animate-spin' : ''}`} />
                          <span className="text-[10px] uppercase font-black tracking-widest">{syncing ? 'Wait' : 'Sync'}</span>
                        </button>
                        <button
                          className="flex flex-col items-center justify-center p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/20 hover:border-primary/40 transition-all group shadow-lg shadow-primary/5"
                          onClick={() => window.location.href = "/store"}
                        >
                          <FaFire size={24} className="mb-2 text-primary group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] uppercase font-black tracking-widest text-primary">Store</span>
                        </button>
                        <button
                          className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 bg-muted/10 hover:bg-muted/20 hover:border-border transition-all group"
                          onClick={() => console.log("Calendar clicked")}
                        >
                          <Calendar size={24} className="mb-2 text-muted-foreground group-hover:text-foreground transition-colors" />
                          <span className="text-[10px] uppercase font-black tracking-widest">Log</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

              </div>
              {/* <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div> */}
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}



