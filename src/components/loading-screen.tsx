import { RiCopperCoinFill } from "react-icons/ri"

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-xl">
            <style>
                {`
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.3; transform: scale(1); filter: blur(40px); }
                    50% { opacity: 0.6; transform: scale(1.1); filter: blur(60px); }
                }
                @keyframes coin-float {
                    0%, 100% { transform: translateY(0) rotateY(0deg); }
                    50% { transform: translateY(-10px) rotateY(180deg); }
                }
                @keyframes text-shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                `}
            </style>

            <div className="relative flex items-center justify-center">
                {/* Glowing Background Aura */}
                <div
                    className="absolute w-48 h-48 bg-primary/30 rounded-full"
                    style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
                />

                {/* Floating Coin */}
                <div
                    className="relative z-10"
                    style={{ animation: 'coin-float 3s ease-in-out infinite' }}
                >
                    <RiCopperCoinFill
                        size={80}
                        color="#ffc900"
                        className="drop-shadow-[0_0_15px_rgba(255,201,0,0.6)]"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                    <div className="h-1 w-36 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-full bg-primary origin-left animate-[loading-bar_1.5s_ease-in-out_infinite]" />
                    </div>
                </div>
            </div>

            <style>
                {`
                @keyframes loading-bar {
                    0% { transform: scaleX(0); transform-origin: left; }
                    45% { transform: scaleX(1); transform-origin: left; }
                    50% { transform: scaleX(1); transform-origin: right; }
                    100% { transform: scaleX(0); transform-origin: right; }
                }
                `}
            </style>
        </div>
    )
}
