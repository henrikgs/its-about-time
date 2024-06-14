import { useState } from "react"
import { uniqBy } from "../utils/array"
import { cx } from "../utils/cx"
import { LeaderboardEntry } from "../utils/supabase"
import { formatElapsedMilliseconds } from "../utils/time"

export const Leaderboard = ({
  leaderboardEntries,
}: {
  leaderboardEntries: LeaderboardEntry[]
}) => {
  const [selectedType, setSelectedType] = useState<
    "global" | "global-today" | "today-best-only"
  >("global")

  return (
    <div className="rounded bg-white/[0.4] px-4 py-2">
      <div className="mb-2 flex justify-between">
        <div className="text-lg font-bold underline">Leaderboard</div>
        <div>{leaderboardEntries.length} entries</div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <LeaderboardButton
          label="Global"
          onClick={() => setSelectedType("global")}
          selected={selectedType === "global"}
        />
        <LeaderboardButton
          label="Global today"
          onClick={() => setSelectedType("global-today")}
          selected={selectedType === "global-today"}
        />
        <LeaderboardButton
          label="Today best only"
          onClick={() => setSelectedType("today-best-only")}
          selected={selectedType === "today-best-only"}
        />
      </div>

      {selectedType === "global" ? (
        <GlobalLeaderboard leaderboardEntries={leaderboardEntries} />
      ) : selectedType === "global-today" ? (
        <GlobalToday leaderboardEntries={leaderboardEntries} />
      ) : selectedType === "today-best-only" ? (
        <TodayBestOnly leaderboardEntries={leaderboardEntries} />
      ) : null}
    </div>
  )
}

const LeaderboardButton = ({
  label,
  onClick,
  selected,
}: {
  label: string
  onClick: () => void
  selected: boolean
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded bg-white px-3 py-1",
        selected && "bg-gray-800 text-white",
      )}
    >
      {label}
    </button>
  )
}

const LeaderboardTable = ({
  leaderboardEntries,
}: {
  leaderboardEntries: LeaderboardEntry[]
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="w-4 pr-2"></th>
          <th className="text-left">Name</th>
          <th className="text-left">Weapon</th>
          <th className="text-left">Target</th>
          <th className="text-right">Score</th>
        </tr>
      </thead>

      <tbody>
        {leaderboardEntries.map((item, i) => {
          return (
            <tr key={i}>
              <td className="w-4 pr-2 text-right text-gray-500">
                {i === 0 ? (
                  <span>🏆</span>
                ) : i === 1 ? (
                  <span>🥈</span>
                ) : i === 2 ? (
                  <span>🥉 </span>
                ) : (
                  <span>{i + 1}.</span>
                )}
              </td>
              <td className="break-all text-left">
                {(item.username || "unknown cowboy").slice(0, 16)}
              </td>
              <td className="text-left">{item.weapon}</td>
              <td className="text-left">{item.targetTime}</td>
              <td className="text-right font-mono font-medium">
                {formatElapsedMilliseconds(item.elapsedMilliseconds)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const GlobalLeaderboard = ({
  leaderboardEntries,
}: {
  leaderboardEntries: LeaderboardEntry[]
}) => {
  const sliceIncrement = 100
  const [slice, setSlice] = useState(sliceIncrement)

  return (
    <div>
      <LeaderboardTable
        leaderboardEntries={leaderboardEntries.slice(0, slice)}
      />

      {leaderboardEntries.length > slice && (
        <div className="mt-2 text-center">
          <button
            onClick={() => setSlice((slice) => slice + sliceIncrement)}
            className="rounded bg-white px-3 py-1"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  )
}

const GlobalToday = ({
  leaderboardEntries,
}: {
  leaderboardEntries: LeaderboardEntry[]
}) => {
  const entriesToday = leaderboardEntries.filter((entry) => {
    return isSameDate(new Date(entry.createdAt), new Date())
  })

  return (
    <div>
      <LeaderboardTable leaderboardEntries={entriesToday} />
    </div>
  )
}

const TodayBestOnly = ({
  leaderboardEntries,
}: {
  leaderboardEntries: LeaderboardEntry[]
}) => {
  const entries = uniqBy(
    leaderboardEntries.filter((entry) => {
      return isSameDate(new Date(entry.createdAt), new Date())
    }),
    (item) => item.username,
  )

  return (
    <div>
      <LeaderboardTable leaderboardEntries={entries} />
    </div>
  )
}

const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}
