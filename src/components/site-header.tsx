import { Separator } from "@/components/ui/separator.tsx"
import { SidebarTrigger } from "@/components/ui/sidebar.tsx"
import { RiCopperCoinFill } from "react-icons/ri"
import { useStats } from "@/contexts/StatsContext"
import { Progress } from "@/components/ui/progress"

export function SiteHeader() {
  const { stats } = useStats()

  const XP_PER_LEVEL = 100
  const level = stats ? Math.floor(stats.total_xp / XP_PER_LEVEL) + 1 : 1
  const progress = stats ? (stats.total_xp % XP_PER_LEVEL) * (100 / XP_PER_LEVEL) : 0
  const currentXP = stats ? stats.total_xp % XP_PER_LEVEL : 0

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 py-2 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center gap-4 flex-1">
          <div className="flex flex-col gap-1 min-w-[120px] sm:min-w-[180px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Level {level}</span>
              <span className="text-[9px] font-bold text-muted-foreground/60">{currentXP}/{XP_PER_LEVEL} XP</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-muted/20" />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {stats !== null && (
            <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50 shadow-sm backdrop-blur-sm transition-all hover:bg-secondary/80">
              <RiCopperCoinFill size={18} color="#ffc900" className="drop-shadow-[0_0_8px_rgba(255,201,0,0.4)]" />
              <span className="text-sm font-black font-mono tracking-tight">{stats.gamcoins} <span className="text-[10px] opacity-50 uppercase ml-0.5">GC</span></span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
