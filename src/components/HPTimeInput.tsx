import { cx } from "../utils/cx"

export const HPTimeInput = ({
  value,
  onValue,
}: {
  value: Date
  onValue: (value: Date) => void
}) => {
  const hours = value.getHours()

  return (
    <div>
      <div className="flex-start flex">
        <div className="grid grid-cols-2 border border-gray-300 bg-white p-2 shadow-xl">
          <div className="border-r border-black">
            <div className="p-2 text-center font-medium">Time</div>

            <div className="grid grid-cols-2 gap-4 p-2 pr-4">
              <div className="">
                <NumberButton
                  label="0"
                  active={hours < 10}
                  onClick={() => {
                    onValue(new Date(value.setHours(0 + (hours % 10))))
                  }}
                  size="large"
                  className="rounded-t-md"
                />
                <NumberButton
                  label="10"
                  active={hours >= 10 && hours < 20}
                  onClick={() => {
                    onValue(new Date(value.setHours(10 + (hours % 10))))
                  }}
                  size="large"
                />
                <NumberButton
                  label="20"
                  active={hours >= 20}
                  onClick={() => {
                    onValue(
                      new Date(value.setHours(Math.min(20 + (hours % 10), 23))),
                    )
                  }}
                  size="large"
                  className="rounded-b-md"
                />

                <div className="mt-[6px]">
                  <NumberButton
                    label="Nå"
                    active={false}
                    onClick={() => onValue(new Date())}
                    size="large"
                    className="rounded-md"
                  />
                </div>
              </div>

              <div className="flex h-[400px] flex-col">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((hourOnes) => {
                  return (
                    <NumberButton
                      key={hourOnes}
                      label={String(hourOnes)}
                      active={hours % 10 === hourOnes}
                      disabled={hourOnes >= 4 && hours >= 20}
                      onClick={() => {
                        const hourTens = Math.floor(hours / 10) * 10
                        onValue(new Date(value.setHours(hourTens + hourOnes)))
                      }}
                      size="small"
                      className={cx(
                        "flex-1",
                        hourOnes === 0
                          ? "rounded-t-md"
                          : hourOnes === 9
                            ? "rounded-b-md"
                            : "",
                      )}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="p-2 text-center font-medium">Minutt</div>

            <div className="grid grid-cols-2 gap-4 p-2 pl-4">
              <div className="flex h-[400px] flex-col">
                {[0, 10, 20, 30, 40, 50].map((minuteTens) => {
                  return (
                    <NumberButton
                      key={minuteTens}
                      label={String(minuteTens)}
                      active={
                        Math.floor(value.getMinutes() / 10) * 10 === minuteTens
                      }
                      onClick={() => {
                        onValue(
                          new Date(
                            value.setMinutes(
                              minuteTens + (value.getMinutes() % 10),
                            ),
                          ),
                        )
                      }}
                      size="large"
                      className={cx(
                        "flex-1",
                        minuteTens === 0
                          ? "rounded-t-md"
                          : minuteTens === 50
                            ? "rounded-b-md"
                            : "",
                      )}
                    />
                  )
                })}
              </div>

              <div className="flex h-[400px] flex-col">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((minuteOnes) => {
                  return (
                    <NumberButton
                      key={minuteOnes}
                      label={String(minuteOnes)}
                      active={value.getMinutes() % 10 === minuteOnes}
                      onClick={() => {
                        const minuteTens =
                          Math.floor(value.getMinutes() / 10) * 10
                        onValue(
                          new Date(value.setMinutes(minuteTens + minuteOnes)),
                        )
                      }}
                      size="small"
                      className={cx(
                        "flex-1",
                        minuteOnes === 0
                          ? "rounded-t-md"
                          : minuteOnes === 9
                            ? "rounded-b-md"
                            : "",
                      )}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const NumberButton = ({
  label,
  active,
  onClick,
  size,
  disabled,
  className,
}: {
  label: string
  active: boolean
  onClick: () => void
  size: "small" | "large"
  disabled?: boolean
  className?: string
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex items-center justify-center border border-gray-300 bg-gray-100 font-medium",
        active && "border-[rgb(77,108,84)] bg-[rgb(95,149,106)] text-white",
        size === "small" && "h-[37px] w-[75px]",
        size === "large" && "h-[63px] w-[75px]",
        disabled && "opacity-30",
        className,
      )}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
