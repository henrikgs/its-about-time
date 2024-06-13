export const DropdownTimeInput = ({
  value,
  onValue,
}: {
  value: Date
  onValue: (value: Date) => void
}) => {
  return (
    <div className="flex">
      <div className="flex gap-1 bg-white p-1">
        <select
          value={value.getHours()}
          onChange={(event) => {
            onValue(new Date(value.setHours(parseInt(event.target.value))))
          }}
          className="font-mono"
        >
          {Array.from({ length: 24 }).map((_, hour) => (
            <option key={hour} value={hour}>
              {hour.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        <div>:</div>
        <select
          value={value.getMinutes()}
          onChange={(event) => {
            onValue(new Date(value.setMinutes(parseInt(event.target.value))))
          }}
          className="font-mono"
        >
          {Array.from({ length: 60 }).map((_, minute) => (
            <option key={minute} value={minute}>
              {minute.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
