import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip"

interface DayCellProps {
  day: number
  activity: number
  maxEvents: number
  events: any[]
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

function DayActivityDot({
  day,
  colorIndex,
  ...props
}: {
  day: number
  colorIndex: number
}) {
  return (
    <div
      key={`day-${day}`}
      className={`w-3 h-3 rounded-sm ${activityColors[colorIndex]}`}
      {...props}
    ></div>
  )
}

export function DayCell({ day, events, activity, maxEvents }: DayCellProps) {
  const colorIndex = Math.min(
    Math.floor((activity / maxEvents) * (activityColors.length - 1)),
    activityColors.length - 1
  )

  return (
    <TooltipProvider delayDuration={100}>
      {activity > 0 ? (
        <Tooltip>
          <TooltipTrigger>
            <DayActivityDot day={day} colorIndex={colorIndex} />
          </TooltipTrigger>
          <TooltipContent>
            <>
              <p className="mb-1">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                }).format(new Date(events[0].start.dateTime))}
                {" | "}
                {activity} {activity === 1 ? "event" : "events"}
              </p>
              <ul className="list-none">
                {events.map((event, index) => (
                  <li key={index}>{event.summary || "No Title"}</li>
                ))}
              </ul>
            </>
          </TooltipContent>
        </Tooltip>
      ) : (
        <DayActivityDot key={`day-${day}`} day={day} colorIndex={0} />
      )}
    </TooltipProvider>
  )
}
