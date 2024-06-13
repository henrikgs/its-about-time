import { useCallback, useRef, useState } from "react"
import { Content } from "./components/Content"
import { DropdownTimeInput } from "./components/DropdownTimeInput"
import { HPTimeInput } from "./components/HPTimeInput"
import { Layout } from "./components/Layout"
import { NativeTimeInput } from "./components/NativeTimeInput"
import { cx } from "./utils/cx"
import { formatTime, getTimeDate } from "./utils/time"

const saveTimeToLocalStorage = (item: {
  elapsedMilliseconds: number
  weapon: "native" | "hp" | "dropdown"
}) => {
  const times = JSON.parse(localStorage.getItem("times") || "[]")
  times.push(item)
  localStorage.setItem("times", JSON.stringify(times))
}

const getTimesFromLocalStorage = (): {
  elapsedMilliseconds: number
  weapon: "native" | "hp" | "dropdown"
}[] => {
  try {
    return JSON.parse(localStorage.getItem("times") || "[]")
  } catch {
    return []
  }
}

const sortedTimes = (): {
  elapsedMilliseconds: number
  weapon: "native" | "hp" | "dropdown"
}[] => {
  return getTimesFromLocalStorage().sort(
    (a, b) => a.elapsedMilliseconds - b.elapsedMilliseconds,
  )
}

const formatElapsedMilliseconds = (elapsedMilliseconds: number) => {
  const seconds = Math.floor(elapsedMilliseconds / 1000)
  const milliseconds = elapsedMilliseconds % 1000
  return `${seconds}.${String(milliseconds).padStart(3, "0")}s`
}

export function App() {
  const [weapon, setWeapon] = useState<"native" | "hp" | "dropdown" | null>(
    null,
  )
  const [targetTime, setTargetTime] = useState<Date | null>(null)
  const [countdown, setCountdown] = useState(3)

  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  const playingRef = useRef(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startGame = useCallback((weapon: "native" | "hp" | "dropdown") => {
    setWeapon(weapon)

    setCountdown(3)
    setTimeout(() => setCountdown(2), 1000)
    setTimeout(() => setCountdown(1), 2000)
    setTimeout(() => {
      setTime(getTimeDate(0, 0))
      setTargetTime(
        getTimeDate(
          Math.floor(Math.random() * 24),
          Math.floor(Math.random() * 60),
        ),
      )
      const localStartTime = new Date()
      setStartTime(localStartTime)
      playingRef.current = true

      timerRef.current = setInterval(() => {
        if (!playingRef.current) {
          return
        }

        const secondsElapsed = Math.floor(
          (new Date().getTime() - localStartTime.getTime()) / 1000,
        )
        const millisecondsElapsed = Math.floor(
          (new Date().getTime() - localStartTime.getTime()) % 1000,
        )

        const element = document.getElementById("time-elapsed")
        if (element) {
          element.innerText = `${secondsElapsed}s ${String(millisecondsElapsed).padStart(3, "0")}ms`
        }
      }, 1000 / 15)
    }, 3000)
  }, [])

  const [time, setTime] = useState(getTimeDate(0, 0))

  const correctTargetTime = Boolean(
    targetTime &&
      time.getHours() === targetTime.getHours() &&
      time.getMinutes() === targetTime.getMinutes(),
  )

  const times = sortedTimes()

  return (
    <Layout>
      <Content>
        {!weapon ? (
          <div className="mt-8 flex flex-col gap-16">
            <div className="flex flex-col items-center gap-2">
              <div className="text-center">
                Your mission, should you choose to accept it, is to find the
                best time picker.
              </div>
              <div className="text-center text-xl">
                Select your weapon to start the game
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => startGame("native")}
                  className="rounded bg-white px-3 py-1"
                >
                  Native
                </button>
                <button
                  onClick={() => startGame("hp")}
                  className="rounded bg-white px-3 py-1"
                >
                  HP
                </button>
                <button
                  onClick={() => startGame("dropdown")}
                  className="rounded bg-white px-3 py-1"
                >
                  Dropdown
                </button>
              </div>
            </div>

            <div className="rounded bg-white/[0.4] px-4 py-2">
              <div>Times</div>

              {times.map((item, i) => {
                return (
                  <div key={i}>
                    <span className="font-bold">{i + 1}. </span>
                    <span className="font-mono font-medium">
                      {formatElapsedMilliseconds(item.elapsedMilliseconds)}
                    </span>
                    <span> ({item.weapon})</span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : !targetTime ? (
          <div className="mt-8 flex justify-center">
            <div className="animate-bounce text-[200px] font-semibold">
              {countdown}
            </div>
          </div>
        ) : startTime && endTime ? (
          <div className="mt-8 text-center">
            <div>You made it in</div>
            <div className="text-6xl">
              {Math.floor((endTime.getTime() - startTime.getTime()) / 1000)}.
              {String(
                Math.floor((endTime.getTime() - startTime.getTime()) % 1000),
              ).padStart(3, "0")}
            </div>
            <div>seconds</div>
            <div>
              using{" "}
              <span className="font-semibold">
                {weapon === "native"
                  ? "native"
                  : weapon === "hp"
                    ? "hp"
                    : weapon === "dropdown"
                      ? "dropdown"
                      : "unknown"}{" "}
              </span>
              as weapon
            </div>
            <div className="mt-20">
              <button
                onClick={() => {
                  setWeapon(null)
                  setTargetTime(null)
                  setStartTime(null)
                  setEndTime(null)
                  clearInterval(
                    timerRef.current as ReturnType<typeof setInterval>,
                  )
                }}
                className="rounded bg-white px-3 py-1"
              >
                Play again
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="text-center text-lg">
              Target time is:{" "}
              <span className="font-semibold underline">
                {formatTime(targetTime)}
              </span>
            </div>

            {weapon === "native" ? (
              <NativeTimeInput value={time} onValue={setTime} />
            ) : weapon === "hp" ? (
              <HPTimeInput value={time} onValue={setTime} />
            ) : weapon === "dropdown" ? (
              <DropdownTimeInput value={time} onValue={setTime} />
            ) : null}

            <button
              className={cx(
                "mt-4 rounded bg-[rgb(76,35,29)] p-2 text-xl font-semibold text-white",
                !correctTargetTime && "cursor-not-allowed opacity-20",
              )}
              disabled={!correctTargetTime}
              onClick={() => {
                if (correctTargetTime) {
                  playingRef.current = false
                  const element = document.getElementById("time-elapsed")
                  if (element) {
                    element.innerText = ""
                  }

                  const localEndTime = new Date()
                  setEndTime(localEndTime)

                  if (startTime) {
                    saveTimeToLocalStorage({
                      elapsedMilliseconds:
                        localEndTime.getTime() - startTime.getTime(),
                      weapon,
                    })
                  }
                }
              }}
            >
              Submit
            </button>

            <div className="font-mono" id="time-elapsed" />
          </div>
        )}
      </Content>
    </Layout>
  )
}
