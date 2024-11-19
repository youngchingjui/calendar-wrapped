import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip"

interface DayCellProps {
  monthName: string
  day: number
  activity: number
  maxEvents: number
}

const activityColors = [
  "bg-purple-100",
  "bg-purple-200",
  "bg-purple-300",
  "bg-purple-400",
  "bg-purple-500",
  "bg-purple-600",
  "bg-purple-700",
  "bg-purple-800",
]

export function DayCell({ monthName, day, activity, maxEvents }: DayCellProps) {
  const colorIndex = Math.min(
    Math.floor((activity / maxEvents) * (activityColors.length - 1)),
    activityColors.length - 1
  )

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <div
            key={`day-${day}`}
            className={`w-3 h-3 rounded-sm ${activityColors[colorIndex]}`}
            title={`${monthName} ${day}: Activity level ${activity}`}
          ></div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {monthName} {day}: Activity level {activity}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
