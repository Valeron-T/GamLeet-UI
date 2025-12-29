import { IconLock, IconRocket } from "@tabler/icons-react"
import { Button } from "./ui/button"
import { Link } from "react-router"

interface ComingSoonOverlayProps {
    title: string
    description: string
}

export function ComingSoonOverlay({ title, description }: ComingSoonOverlayProps) {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />
            <div className="relative z-10 max-w-md w-full p-8 rounded-[2.5rem] bg-gradient-to-br from-card/80 to-card/40 border border-primary/20 shadow-2xl flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in duration-500">
                <div className="p-4 rounded-3xl bg-primary/10 text-primary border border-primary/20 shadow-inner">
                    <IconLock size={40} stroke={1.5} className="animate-pulse" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-black tracking-tight uppercase italic">{title}</h2>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col w-full gap-3 mt-2">
                    <Button className="h-12 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 group" asChild>
                        <Link to="/whats-next">
                            View Roadmap <IconRocket size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em]">Deployment in Progress</p>
                </div>
            </div>
        </div>
    )
}
