import { formatTime, getTimeDate } from "../utils/time"

export const NativeTimeInput = ({
  value,
  onValue,
}: {
  value: Date
  onValue: (value: Date) => void
}) => {
  return (
    <div className="flex-start flex">
      <input
        type="time"
        value={formatTime(value)}
        onChange={(event) => {
          const hours = parseInt(event.target.value.split(":")[0])
          const minutes = parseInt(event.target.value.split(":")[1])

          onValue(getTimeDate(hours, minutes))
        }}
        onKeyDown={(event) => {
          const eventKeyIsNumber = !isNaN(parseInt(event.key))
          if (eventKeyIsNumber) {
            event.preventDefault()
          }
        }}
      />
    </div>
  )
}
