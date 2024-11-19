const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]

function getRandomActivity() {
  const rand = Math.random()
  if (rand < 0.3) return 0 // 30% chance of no activity
  if (rand < 0.6) return 1 // 30% chance of low activity
  if (rand < 0.8) return 2 // 20% chance of medium activity
  if (rand < 0.95) return 3 // 15% chance of high activity
  return 4 // 5% chance of very high activity
}

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
]

export function ActivityCalendar() {
  const year = 2024

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {months.map((month, index) => (
          <div key={month} className="flex flex-col">
            <div className="text-sm font-semibold mb-1">{month}</div>
            <div className="grid grid-cols-7 gap-1">
              {[...Array(getFirstDayOfMonth(year, index))].map((_, i) => (
                <div key={`empty-${i}`} className="w-3 h-3"></div>
              ))}
              {[...Array(getDaysInMonth(year, index))].map((_, day) => {
                const activity = getRandomActivity()
                return (
                  <div
                    key={`day-${day + 1}`}
                    className={`w-3 h-3 rounded-sm ${activityColors[activity]}`}
                    title={`${months[index]} ${
                      day + 1
                    }: Activity level ${activity}`}
                  ></div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
