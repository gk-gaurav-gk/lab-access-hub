import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  currentPhase: number;
  completedPhases: number[];
  phases: { number: number; title: string; description: string }[];
}

export function OnboardingProgress({
  currentPhase,
  completedPhases,
  phases,
}: OnboardingProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-border" />
        <div
          className="absolute left-0 top-5 h-0.5 bg-primary transition-all duration-500"
          style={{
            width: `${((Math.max(...completedPhases, 0)) / (phases.length - 1)) * 100}%`,
          }}
        />

        {phases.map((phase) => {
          const isCompleted = completedPhases.includes(phase.number);
          const isCurrent = currentPhase === phase.number;
          const isAccessible = isCompleted || isCurrent || completedPhases.includes(phase.number - 1);

          return (
            <div
              key={phase.number}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-background border-primary text-primary"
                    : isAccessible
                    ? "bg-background border-muted-foreground/50 text-muted-foreground"
                    : "bg-muted border-muted-foreground/30 text-muted-foreground/50"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{phase.number}</span>
                )}
              </div>
              <div className="mt-3 text-center max-w-[120px]">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {phase.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                  {phase.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
