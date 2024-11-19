const monthMap = new Map([
  ["01", "J"],
  ["02", "F"],
  ["03", "M"],
  ["04", "A"],
  ["05", "M"],
  ["06", "J"],
  ["07", "J"],
  ["08", "A"],
  ["09", "S"],
  ["10", "O"],
  ["11", "N"],
  ["12", "D"],
])

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
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

export function ActivityCalendar({ calendarData }) {
  // Extract the year from the first event
  const firstEventDate = new Date(
    calendarData[0].start.dateTime || calendarData[0].start.date
  )
  const year = firstEventDate.getFullYear()

  // Create a map to store the activity level for each day
  const dayActivity = new Map<string, number>()

  calendarData.forEach((event) => {
    const eventDate = new Date(event.start.dateTime || event.start.date)
    const month = String(eventDate.getMonth() + 1).padStart(2, "0")
    const day = String(eventDate.getDate()).padStart(2, "0")
    const dateKey = `${month}-${day}`
    dayActivity.set(dateKey, (dayActivity.get(dateKey) || 0) + 1)
  })

  // Find the maximum number of events on any day
  const maxEvents = Math.max(...dayActivity.values(), 0)

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {[...monthMap.entries()].map(([month, monthName]) => (
          <div key={month} className="flex flex-col">
            <div className="text-sm font-semibold mb-1">{monthName}</div>
            <div className="grid grid-cols-7 gap-1">
              {[...Array(getFirstDayOfMonth(year, parseInt(month) - 1))].map(
                (_, i) => (
                  <div key={`empty-${i}`} className="w-3 h-3"></div>
                )
              )}
              {[...Array(getDaysInMonth(year, parseInt(month) - 1))].map(
                (_, day) => {
                  const dateKey = `${month}-${day + 1}`
                  const activity = dayActivity.get(dateKey) || 0
                  const colorIndex = Math.min(
                    Math.floor(
                      (activity / maxEvents) * (activityColors.length - 1)
                    ),
                    activityColors.length - 1
                  )
                  return (
                    <div
                      key={`day-${day + 1}`}
                      className={`w-3 h-3 rounded-sm ${activityColors[colorIndex]}`}
                      title={`${monthName} ${
                        day + 1
                      }: Activity level ${activity}`}
                    ></div>
                  )
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
