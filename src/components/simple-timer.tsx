import { useEffect, useState } from "react";

interface SimpleTimerProps {
  totalDuration: number;
  initialRemainingTime: number;
  onComplete?: () => void;
}

export function SimpleTimer({
  totalDuration,
  initialRemainingTime,
  onComplete,
}: SimpleTimerProps) {
  const [remaining, setRemaining] = useState(initialRemainingTime);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining, onComplete]);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const formattedTime = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");

  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <div className="text-7xl font-semibold tracking-tight text-foreground drop-shadow-sm">
        {formattedTime}
      </div>
      <div className="text-sm text-muted-foreground mt-2 uppercase tracking-wide">
        Remaining Time
      </div>
    </div>
  );
}

export default SimpleTimer;
