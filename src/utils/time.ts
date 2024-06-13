export function getTimeDate(hours: number, minutes: number) {
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

export function formatTime(date: Date) {
  return date.toLocaleTimeString("nb-NO", {
    hour: "2-digit",
    minute: "2-digit",
  })
}
