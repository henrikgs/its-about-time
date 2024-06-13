import { cx } from "../utils/cx"

export const HPPlusTimeInput = ({
  value,
  onValue,
}: {
  value: Date
  onValue: (value: Date) => void
}) => {
  const hourTens = Math.floor(value.getHours() / 10)
  const hourOnes = value.getHours() % 10
  const minuteTens = Math.floor(value.getMinutes() / 10)
  const minuteOnes = value.getMinutes() % 10

  return (
    <div className="flex">
      <div className="grid grid-cols-[48px_48px_8px_48px_48px] gap-x-[2px] gap-y-2 rounded border bg-white px-2 py-2">
        <div className="pointer-events-none flex h-8 items-center justify-center rounded bg-gray-100 text-gray-800">
          {hourTens}
        </div>
        <div className="pointer-events-none flex h-8 items-center justify-center rounded bg-gray-100 text-gray-800">
          {hourOnes}
        </div>
        <div className="text-center">:</div>
        <div className="pointer-events-none flex h-8 items-center justify-center rounded bg-gray-100 text-gray-800">
          {minuteTens}
        </div>
        <div className="pointer-events-none flex h-8 items-center justify-center rounded bg-gray-100 text-gray-800">
          {minuteOnes}
        </div>

        <div className="flex flex-col gap-[2px]">
          <NumberButton
            label="0"
            selected={hourTens === 0}
            onClick={() => onValue(new Date(value.setHours(0 + hourOnes)))}
          />
          <NumberButton
            label="10"
            selected={hourTens === 1}
            onClick={() => onValue(new Date(value.setHours(10 + hourOnes)))}
          />
          <NumberButton
            label="20"
            selected={hourTens === 2}
            onClick={() =>
              onValue(new Date(value.setHours(Math.min(20 + hourOnes, 23))))
            }
          />
        </div>

        <div className="flex flex-col gap-[2px]">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((ones) => {
            return (
              <NumberButton
                key={ones}
                label={String(ones)}
                selected={hourOnes === ones}
                onClick={() =>
                  onValue(new Date(value.setHours(hourTens * 10 + ones)))
                }
                disabled={hourTens >= 2 && ones >= 4}
              />
            )
          })}
        </div>

        <div />

        <div className="flex flex-col gap-[2px]">
          {[0, 10, 20, 30, 40, 50].map((tens) => {
            return (
              <NumberButton
                key={tens}
                label={String(tens)}
                selected={minuteTens === tens / 10}
                onClick={() =>
                  onValue(new Date(value.setMinutes(tens + minuteOnes)))
                }
              />
            )
          })}
        </div>

        <div className="flex flex-col gap-[2px]">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((ones) => {
            return (
              <NumberButton
                key={ones}
                label={String(ones)}
                selected={minuteOnes === ones}
                onClick={() =>
                  onValue(new Date(value.setMinutes(minuteTens * 10 + ones)))
                }
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

const NumberButton = ({
  label,
  onClick,
  selected,
  disabled,
  className,
}: {
  label: string
  onClick: () => void
  selected?: boolean
  disabled?: boolean
  className?: string
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex h-8 w-[48px] items-center justify-center rounded border border-gray-300 bg-gray-200 font-medium",
        "hover:bg-gray-300",
        selected && "bg-green-200 hover:bg-green-300",
        disabled && "cursor-not-allowed opacity-30",
        className,
      )}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
