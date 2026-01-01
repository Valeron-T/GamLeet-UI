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
import { Calendar, RefreshCcw, Zap } from "lucide-react"
import { FaFire } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchDailyQuestions, DailyQuestionsResponse, syncUserProgress } from "@/api/dashboard";
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
  const [dailyData, setDailyData] = useState<DailyQuestionsResponse | null>(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchDailyQuestions()
      .then(setDailyData)
      .catch(console.error);
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncUserProgress();
      const [, newData] = await Promise.all([
        refreshStats(),
        fetchDailyQuestions()
      ]);
      setDailyData(newData);
      toast.success("Progress synchronized with LeetCode!");
    } catch (error) {
      console.error("Sync failed:", error);
      toast.error("Failed to sync with LeetCode. Try again later.");
    } finally {
      setSyncing(false);
    }
  };

  // Logic for progress bar: 
  const solvedCount = dailyData ?
    (dailyData.problems.easy.status === 'completed' ? 1 : 0) +
    (dailyData.problems.medium.status === 'completed' ? 1 : 0) +
    (dailyData.problems.hard.status === 'completed' ? 1 : 0)
    : 0;
  const progressValue = Math.round((solvedCount / 3) * 100);
  const progressText = `${solvedCount} of 3 Daily Challenges Completed`;

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
                      Complete at least 1 problem to maintain your streak.<br /> Refreshes daily at 3:30 PM IST.
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
                    ) : dailyData ? (
                      <>
                        <TaskQuestion
                          title={dailyData.problems.easy.title}
                          tags={dailyData.problems.easy.topics?.split(", ") || []}
                          state={dailyData.problems.easy.status}
                          difficulty={dailyData.problems.easy.difficulty.toLowerCase().startsWith('h') ? 'hard' : dailyData.problems.easy.difficulty.toLowerCase().startsWith('m') ? 'med' : 'easy'}
                          slug={dailyData.problems.easy.slug}
                        />
                        <TaskQuestion
                          title={dailyData.problems.medium.title}
                          tags={dailyData.problems.medium.topics?.split(", ") || []}
                          state={dailyData.problems.medium.status}
                          difficulty={dailyData.problems.medium.difficulty.toLowerCase().startsWith('h') ? 'hard' : dailyData.problems.medium.difficulty.toLowerCase().startsWith('m') ? 'med' : 'easy'}
                          slug={dailyData.problems.medium.slug}
                        />
                        <TaskQuestion
                          title={dailyData.problems.hard.title}
                          tags={dailyData.problems.hard.topics?.split(", ") || []}
                          state={dailyData.problems.hard.status}
                          difficulty={dailyData.problems.hard.difficulty.toLowerCase().startsWith('h') ? 'hard' : dailyData.problems.hard.difficulty.toLowerCase().startsWith('m') ? 'med' : 'easy'}
                          slug={dailyData.problems.hard.slug}
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
                          <Progress value={progressValue} className={`h-2 ${progressValue === 100 ? 'bg-green-500/20' : 'bg-muted/20'}`} />
                          <div className="flex justify-between mt-1.5">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">{progressValue === 100 ? 'Complete' : 'Focus'}</span>
                            <span className={`text-[10px] uppercase font-bold ${progressValue === 100 ? 'text-green-500' : 'text-primary'}`}>{progressValue}%</span>
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
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all group ${dailyData?.daily_problem?.status === 'completed'
                            ? 'border-green-500/30 bg-green-500/10 hover:bg-green-500/20'
                            : 'border-border/50 bg-muted/10 hover:bg-muted/20 hover:border-border'
                            }`}
                          onClick={() => {
                            const link = dailyData?.daily_link ||
                              (dailyData?.daily_problem?.slug ? `https://leetcode.com/problems/${dailyData.daily_problem.slug}` : null);

                            if (link) {
                              window.open(link, '_blank');
                            } else {
                              toast.info("Daily problem link not available yet");
                            }
                          }}
                        >
                          <div className="relative mb-2">
                            {dailyData?.daily_problem?.status === 'completed' ? (
                              <Calendar size={24} className="text-green-500" fill="currentColor" />
                            ) : (
                              <Calendar size={24} className="text-muted-foreground group-hover:text-red-400 transition-colors" />
                            )}

                            {dailyData?.daily_problem?.status !== 'completed' && (
                              <span className="absolute -top-1 -right-4 bg-red-500 text-white text-[8px] font-black px-1 rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                +30 GC
                              </span>
                            )}
                          </div>
                          <span className={`text-[10px] uppercase font-black tracking-widest ${dailyData?.daily_problem?.status === 'completed' ? 'text-green-600' : ''}`}>
                            {dailyData?.daily_problem?.status === 'completed' ? 'Done' : 'Daily'}
                          </span>
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



