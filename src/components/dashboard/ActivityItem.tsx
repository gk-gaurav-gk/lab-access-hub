import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
  iconColor?: string;
}

const ActivityItem = ({ icon: Icon, title, description, time, iconColor = "text-primary" }: ActivityItemProps) => {
  return (
    <div className="flex gap-4 py-3">
      <div className={cn("w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", iconColor.replace("text-", "bg-").replace(/\d+/, "100"))}>
        <Icon className={cn("w-4 h-4", iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
    </div>
  );
};

export default ActivityItem;
