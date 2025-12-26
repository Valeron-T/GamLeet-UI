import { AppSidebar } from "@/components/app-sidebar.tsx"
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
// import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards.tsx"
import SimpleTimer from "@/components/simple-timer"
import { SiteHeader } from "@/components/site-header.tsx"
import TaskQuestion from "@/components/task-question"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Progress } from "@/components/ui/progress";
import { Calendar, RefreshCcw } from "lucide-react"
import { FaFire } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchDailyQuestions } from "@/api/dashboard";

export default function Home() {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(15, 30, 0, 0); // Set target time to 3:30 PM IST

  let remainingTimeInSeconds = Math.floor((targetTime.getTime() - now.getTime()) / 1000);
  if (remainingTimeInSeconds < 0) {
    remainingTimeInSeconds += 24 * 60 * 60; // Add 24 hours if the target time is for the next day
  }

  const totalDuration = 3600 * 8
  const [dailyQuestions, setDailyQuestions] = useState({
    easy: { title: "", topics: "", slug: "" },
    medium: { title: "", topics: "", slug: "" },
    hard: { title: "", topics: "", slug: "" },
  });

  useEffect(() => {
    fetchDailyQuestions()
      .then(setDailyQuestions)
      .catch(console.error);
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col h-full">
          <div className="@container/main flex flex-1 flex-col gap-2 ">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 flex flex-row gap-6 mx-6">
                



                <Card className="@container/card w-[50%] p-12 ">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Curated Problems</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Complete at least 1 problem to maintain your streak. Refreshes Daily
                    </p>
                  </div>
                  {dailyQuestions ? (
                    <>
                      <TaskQuestion
                        title={dailyQuestions.easy.title}
                        tags={dailyQuestions.easy.topics.split(", ")}
                        state="unattempted"
                        difficulty="easy"
                        slug={dailyQuestions.easy.slug}
                      />
                      <TaskQuestion
                        title={dailyQuestions.medium.title}
                        tags={dailyQuestions.medium.topics.split(", ")}
                        state="unattempted"
                        difficulty="med"
                        slug={dailyQuestions.medium.slug}
                      />
                      <TaskQuestion
                        title={dailyQuestions.hard.title}
                        tags={dailyQuestions.hard.topics.split(", ")}
                        state="unattempted"
                        difficulty="hard"
                        slug={dailyQuestions.hard.slug}
                      />
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </Card>
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 flex flex-col w-[50%] gap-6">
                  <Card className="@container/card flex-1 p-6 ">

                    <div className="grid grid-cols-1">

                      <div className="flex flex-row text-center justify-center items-center">

                        <CardContent className="p-0">
                          <SimpleTimer
                            totalDuration={totalDuration}
                            initialRemainingTime={remainingTimeInSeconds}
                            onComplete={() => console.log("Timer done")}
                          />
                        </CardContent>
                      </div>

                    </div>


                  </Card>
                  <Card className="@container/card flex-1 p-6 ">


                    <CardContent className="p-0">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Task Progress</h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">1 of 3 tasks completed</p>
                        </div>
                        <Progress value={(1 / 3) * 100} className="h-4 bg-gray-600 w-1/2" />
                      </div>
                      <div className="flex justify-center gap-4 mt-4">
                        <button
                          className="p-6 flex flex-col items-center justify-center rounded-md hover:outline-gray-300 dark:hover:border-white/30 border cursor-pointer text-white"
                          aria-label="Refresh"
                          onClick={() => console.log("Refresh clicked")}
                        >
                          <RefreshCcw size={28} className="mb-1" />
                          <span className="text-sm text-white mt-1">Refresh Stats</span>
                        </button>
                        <button
                          className="p-6 flex flex-col items-center justify-center rounded-md hover:outline-gray-300 dark:hover:border-white/30 border cursor-pointer text-white"
                          aria-label="Refresh"
                          onClick={() => console.log("Refresh clicked")}
                        >
                          <FaFire size={28} className="mb-1" />
                          <span className="text-sm text-white mt-1">Use Powerups</span>
                        </button>
                        <button
                          className="p-6 flex flex-col items-center justify-center rounded-md dark:hover:border-white/30 border cursor-pointer text-white"
                          aria-label="Refresh"
                          onClick={() => console.log("Refresh clicked")}
                        >
                          <Calendar size={28} className="mb-1" />
                          <span className="text-sm text-white mt-1">Daily Challenge</span>
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



