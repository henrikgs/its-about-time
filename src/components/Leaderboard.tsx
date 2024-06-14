import { useState } from "react"
import { uniqBy } from "../utils/array"
import { cx } from "../utils/cx"
import { calculateClicks } from "../utils/scores"
import { LeaderboardEntry } from "../utils/supabase"
import { formatElapsedMilliseconds } from "../utils/time"

export const Leaderboard = ({
  leaderboardEntries,
}: {
  leaderboardEntries: LeaderboardEntry[]
}) => {
  const [selectedType, setSelectedType] = useState<
    | "global"
    | "global-today"
    | "today-best-only"
    | "most-played"
    | "daily-challenge"
  >("today-best-only")

  return (
    <div className="rounded bg-white/[0.4] px-4 py-2">
      <div className="mb-2 flex justify-between">
        <div className="text-lg font-bold underline">Leaderboard</div>
        <div>{leaderboardEntries.length} entries</div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <LeaderboardButton
          label="Daily leaderboard"
          onClick={() => setSelectedType("today-best-only")}
          selected={selectedType === "today-best-only"}
        />
        <LeaderboardButton
          label="Global all time"
          onClick={() => setSelectedType("global")}
          selected={selectedType === "global"}
        />
        <LeaderboardButton
          label="Global today"
          onClick={() => setSelectedType("global-today")}
          selected={selectedType === "global-today"}
        />
        <LeaderboardButton
          label="Most played"
          onClick={() => setSelectedType("most-played")}
          selected={selectedType === "most-played"}
        />
        <LeaderboardButton
          label="Daily challenge"
          onClick={() => setSelectedType("daily-challenge")}
          selected={selectedType === "daily-challenge"}
          pride
        />
      </div>

      {selectedType === "global" ? (
        <GlobalLeaderboard leaderboardEntries={leaderboardEntries} />
      ) : selectedType === "global-today" ? (
        <GlobalToday leaderboardEntries={leaderboardEntries} />
      ) : selectedType === "today-best-only" ? (
        <TodayBestOnly leaderboardEntries={leaderboardEntries} />
      ) : selectedType === "most-played" ? (
        <MostPlayedByUsername leaderboardEntries={leaderboardEntries} />
      ) : selectedType === "daily-challenge" ? (
        <DailyChallenge leaderboardEntries={leaderboardEntries} />
      ) : null}
    </div>
  )
}

const LeaderboardButton = ({
  label,
  onClick,
  selected,
  pride,
}: {
  label: string
  onClick: () => void
  selected: boolean
  pride?: boolean
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded bg-white px-3 py-1",
        pride && "font-bold",
        selected && "bg-gray-800 text-white",
      )}
      style={
        pride
          ? {
              backgroundImage:
                "linear-gradient(to right, rgba(237, 34, 36, 0.5), rgba(243, 91, 34, 0.5), rgba(249, 150, 33,0.5 ), rgba(245, 193, 30,0.5 ), rgba(241, 235, 27,0.5 ) 27%, rgba(241, 235, 27,0.5 ), rgba(241, 235, 27,0.5 ) 33%, rgba(99, 199, 32, 0.5), rgba(12, 155, 73, 0.5), rgba(33, 135, 141,0.5 ), rgba(57, 84, 165, 0.5), rgba(97, 55, 155, 0.5), rgba(147, 40, 142,0.5 ))",
            }
          : {}
      }
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
              <td className="text-left">
                {item.targetTime}
                {item.weapon === "hp"
                  ? ` (${calculateClicks(item.targetTime)})`
                  : ""}
              </td>
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

const MostPlayedByUsername = ({
  leaderboardEntries,
}: {
  leaderboardEntries: LeaderboardEntry[]
}) => {
  const res: {
    username: string
    count: number
    best: LeaderboardEntry
  }[] = []

  for (const entry of leaderboardEntries) {
    const index = res.findIndex((item) => item.username === entry.username)
    if (index === -1) {
      res.push({ username: entry.username, count: 1, best: entry })
    } else {
      res[index].count++
      if (entry.elapsedMilliseconds < res[index].best.elapsedMilliseconds) {
        res[index].best = entry
      }
    }
  }

  const entries = res.sort((a, b) => b.count - a.count)

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-4 pr-2"></th>
            <th className="text-left">Name</th>
            <th className="text-left">Weapon</th>
            <th className="text-left">Target</th>
            <th className="text-right">Best score</th>
            <th className="text-right">Total rounds</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((item, i) => {
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
                <td className="text-left">{item.best.weapon}</td>
                <td className="text-left">
                  {item.best.targetTime}
                  {item.best.weapon === "hp"
                    ? ` (${calculateClicks(item.best.targetTime)})`
                    : ""}
                </td>
                <td className="text-right font-mono font-medium">
                  {formatElapsedMilliseconds(item.best.elapsedMilliseconds)}
                </td>
                <td className="text-right">{item.count}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const dailyChallenges = [
  {
    maxElapsedMilliseconds: 5000,
    weapon: "native",
  },
  {
    maxElapsedMilliseconds: 2500,
    weapon: "hp",
  },
  {
    maxElapsedMilliseconds: 3500,
    weapon: "dropdown",
  },
]

const DailyChallenge = ({
  leaderboardEntries,
}: {
  leaderboardEntries: LeaderboardEntry[]
}) => {
  const todaysChallenges =
    dailyChallenges[new Date().getDay() % dailyChallenges.length]

  const entriesToday = leaderboardEntries
    .filter((entry) => {
      return isSameDate(new Date(entry.createdAt), new Date())
    })
    .filter((entry) => {
      return (
        entry.weapon === todaysChallenges.weapon &&
        entry.elapsedMilliseconds < todaysChallenges.maxElapsedMilliseconds
      )
    })

  return (
    <div>
      <div>
        <div className="text-lg font-bold underline">Daily challenge</div>
        <div className="mb-4">
          Weapon: {todaysChallenges.weapon} - Get under{" "}
          {formatElapsedMilliseconds(todaysChallenges.maxElapsedMilliseconds)}
        </div>
      </div>
      <LeaderboardTable leaderboardEntries={entriesToday} />

      {entriesToday.length === 0 && (
        <div className="mt-6 text-center text-lg">
          No entries yet.
          <br />
          Be the first to complete the daily challenge!
        </div>
      )}
    </div>
  )
}
