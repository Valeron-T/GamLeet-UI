import { IconTrendingUp } from "@tabler/icons-react"
import { useStats } from "@/contexts/StatsContext"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"

import { Skeleton } from "@/components/ui/skeleton.tsx"

function SectionCardSkeleton() {
  return (
    <Card className="@container/card bg-gradient-to-br from-card to-card/30 border-border/50 shadow-xl">
      <CardHeader className="pb-2">
        <Skeleton className="h-3 w-24 mb-2" />
        <Skeleton className="h-8 w-32" />
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 pb-6">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </CardFooter>
    </Card>
  )
}

export function SectionCards() {
  const { stats, loading } = useStats()

  const lifetime_loss_statements: Record<number, { main: string; sub: string }> = {
    0: {
      main: "Congrats! You've risked absolutely nothing.",
      sub: "And that's exactly what you got in return."
    },
    1: {
      main: "Rs 100? Bold move, Warren Buffet.",
      sub: "Hope that taught you how not to invest."
    },
    2: {
      main: "You just paid for a lesson in humility.",
      sub: "Spoiler: The stock market doesn't care."
    },
    3: {
      main: "At this rate, your losses are compounding better than your returns.",
      sub: "Financial freedom, but in reverse."
    },
    4: {
      main: "Almost half a grand down the drain!",
      sub: "Consider it a donation to market chaos."
    },
    5: {
      main: "Congrats, you've unlocked premium regret.",
      sub: "No refunds. Only existential dread."
    },
    6: {
      main: "You really thought that stock was \"undervalued\", huh?",
      sub: "Turns out your instincts are, too."
    },
    7: {
      main: "A fine way to burn money without fire.",
      sub: "Your portfolio called — it's crying."
    },
    8: {
      main: "The market thanks you for your generous contribution.",
      sub: "Too bad it wasn't tax deductible."
    },
    9: {
      main: "You've almost reached influencer-level losses.",
      sub: "Just need a thread titled \"What I learned from failing...\""
    },
    10: {
      main: "Rs 1000 gone. But hey, at least you're consistent.",
      sub: "Now imagine if that was invested in brain cells."
    }
  }

  const streak_statements: Record<number, { main: string; sub: string }> = {
    1: {
      main: "Wow, you showed up once.",
      sub: "Let's not pull a muscle celebrating."
    },
    2: {
      main: "Ok wow, a sequel?",
      sub: "Most trilogies don't make it this far."
    },
    3: {
      main: "Three whole days? Are you okay?",
      sub: "Blink twice if you need rest."
    },
    4: {
      main: "Who is this consistent beast?",
      sub: "At this point, your keyboard has feelings."
    },
    5: {
      main: "Five-day streak — statistically impressive.",
      sub: "Even your fridge light is proud."
    },
    6: {
      main: "You've outlasted most new year resolutions.",
      sub: "Keep going before reality kicks in."
    },
    7: {
      main: "A full week of productivity!",
      sub: "Doctors recommend rest, not miracles."
    },
    8: {
      main: "This is no longer an accident.",
      sub: "You're making the rest of us look bad."
    },
    9: {
      main: "At this point, it's just showing off.",
      sub: "Go ahead, solve world hunger while you're at it."
    },
    10: {
      main: "Double digits? Who are you and what have you done with the old you?",
      sub: "Please don't ruin this with a weekend."
    },
    15: {
      main: "Fifteen days — enough to call it a lifestyle.",
      sub: "Careful, consistency might become a habit."
    },
    20: {
      main: "You're basically a monk now.",
      sub: "Inner peace achieved. Bugs feared."
    },
    30: {
      main: "A month straight. Please teach a masterclass.",
      sub: "You've officially outworked 97% of side projects."
    },
    50: {
      main: "50 days in. Are you even human?",
      sub: "Or are you training for coding Olympics?"
    },
    100: {
      main: "100-day streak. Okay, chill, overachiever.",
      sub: "Blink twice if AI wrote the code."
    }
  }

  const problems_solved_statements: Record<number, { main: string; sub: string }> = {
    1: {
      main: "You're basically a software engineer now.",
      sub: "Resume updated. Job offers pending."
    },
    2: {
      main: "Calm down, prodigy.",
      sub: "Let's not burn out too fast."
    },
    3: {
      main: "You're officially in tutorial mode.",
      sub: "Still waiting for that “Aha!” moment."
    },
    4: {
      main: "Just enough to be dangerously confident.",
      sub: "Stack Overflow still watching you struggle."
    },
    5: {
      main: "Welcome to the league of temporary motivation.",
      sub: "Your debugger is now mildly terrified."
    },
    6: {
      main: "Somewhere, your CS professor just smiled.",
      sub: "And then immediately braced for disappointment."
    },
    7: {
      main: "That's like, a week of effort.",
      sub: "Or one really chaotic Sunday night."
    },
    8: {
      main: "Too late to quit, too early to brag.",
      sub: "Perfect spot for a crisis."
    },
    9: {
      main: "Now you're just showing off.",
      sub: "Next stop: burnout or brilliance."
    },
    10: {
      main: "You're practically solving world hunger.",
      sub: "If world hunger was an array problem."
    },
    15: {
      main: "You've passed tutorial, entered grind mode.",
      sub: "You now speak fluent pseudocode."
    },
    20: {
      main: "You've unlocked mild suffering.",
      sub: "Arrays. Strings. Tears."
    },
    25: {
      main: "Halfway to a LinkedIn flex.",
      sub: "Your code is starting to fear you."
    },
    30: {
      main: "You might actually be getting good at this.",
      sub: "Too late to pretend it was a phase."
    },
    35: {
      main: "You're a machine.",
      sub: "Probably held together with caffeine and trauma."
    },
    40: {
      main: "Somewhere, an interviewer smiled.",
      sub: "...Then added a twist to the problem."
    },
    45: {
      main: "You're deep in the algorithm abyss now.",
      sub: "Don't worry, recursion will find you."
    },
    50: {
      main: "That's a milestone and a cry for help.",
      sub: "But hey, your imposter syndrome is shaking."
    },
    60: {
      main: "You now dream in code.",
      sub: "Syntax errors included."
    },
    70: {
      main: "Your keyboard is legally a weapon.",
      sub: "Time to start naming your functions like kids."
    },
    80: {
      main: "This is either genius or self-punishment.",
      sub: "But it's working. Somehow."
    },
    90: {
      main: "You've unlocked “Algorithm PTSD.”",
      sub: "Next boss: Dynamic Programming."
    },
    100: {
      main: "Okay LeetCode legend, calm down.",
      sub: "Just don't start mentoring people yet."
    }
  }

  const getStatement = (statements: Record<number, { main: string; sub: string }>, value: number, isLoss = false) => {
    const adjustedValue = isLoss ? Math.min(Math.floor(value / 100), 10) : value;
    const keys = Object.keys(statements).map(Number).sort((a, b) => b - a);
    const key = keys.find(k => adjustedValue >= k) ?? keys[keys.length - 1] ?? 0;
    return statements[key];
  };

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <SectionCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  const lossStmt = getStatement(lifetime_loss_statements, stats.lifetime_loss, true);
  const streakStmt = getStatement(streak_statements, stats.current_streak);
  const solvedStmt = getStatement(problems_solved_statements, stats.problems_solved);

  return (
    <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card bg-gradient-to-br from-card to-card/30 border-border/50 shadow-xl transition-all duration-300 hover:border-destructive/20 group">
        <CardHeader className="pb-2">
          <CardDescription className="text-[10px] uppercase font-black tracking-widest text-muted-foreground group-hover:text-destructive transition-colors">Lifetime Losses</CardDescription>
          <CardTitle className="text-3xl font-black font-mono tracking-tighter tabular-nums text-destructive">
            Rs {stats.lifetime_loss}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 pb-6">
          <div className="line-clamp-1 text-[11px] font-bold uppercase tracking-tight text-foreground/80">
            {lossStmt.main}
          </div>
          <div className="text-[10px] text-muted-foreground italic leading-tight">
            {lossStmt.sub}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-gradient-to-br from-card to-card/30 border-border/50 shadow-xl transition-all duration-300 hover:border-primary/20 group">
        <CardHeader className="pb-2">
          <CardDescription className="text-[10px] uppercase font-black tracking-widest text-muted-foreground group-hover:text-primary transition-colors">Current Streak</CardDescription>
          <CardTitle className="text-3xl font-black font-mono tracking-tighter tabular-nums">
            {stats.current_streak} <span className="text-sm uppercase opacity-50">{stats.current_streak === 1 ? 'Day' : 'Days'}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 pb-6">
          <div className="line-clamp-1 text-[11px] font-bold uppercase tracking-tight text-foreground/80">
            {streakStmt.main}
          </div>
          <div className="text-[10px] text-muted-foreground italic leading-tight">
            {streakStmt.sub}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-gradient-to-br from-card to-card/30 border-border/50 shadow-xl transition-all duration-300 hover:border-emerald-500/20 group">
        <CardHeader className="pb-2">
          <CardDescription className="text-[10px] uppercase font-black tracking-widest text-muted-foreground group-hover:text-emerald-500 transition-colors">Problems Solved</CardDescription>
          <CardTitle className="text-3xl font-black font-mono tracking-tighter tabular-nums text-emerald-500">
            {stats.problems_solved}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 pb-6">
          <div className="line-clamp-1 text-[11px] font-bold uppercase tracking-tight text-foreground/80">
            {solvedStmt.main}
          </div>
          <div className="text-[10px] text-muted-foreground italic leading-tight">
            {solvedStmt.sub}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-gradient-to-br from-card to-card/30 border-border/50 shadow-xl transition-all duration-300 hover:border-amber-500/20 group">
        <CardHeader className="pb-2">
          <CardDescription className="text-[10px] uppercase font-black tracking-widest text-muted-foreground group-hover:text-amber-500 transition-colors">Available Balance</CardDescription>
          <CardTitle className="text-3xl font-black font-mono tracking-tighter tabular-nums text-amber-500">
            Rs {stats.available_balance}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 pb-6">
          <div className="line-clamp-1 text-[11px] font-bold uppercase tracking-tight text-foreground/80 flex items-center gap-1.5">
            Wealth Status <IconTrendingUp className="size-3 text-emerald-500" />
          </div>
          <div className="text-[10px] text-muted-foreground italic leading-tight">
            {stats.available_balance < 100 ? "Might afford you one chai during inflation." : "Finally, some real money!"}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
