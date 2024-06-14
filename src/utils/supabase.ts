import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://xgykciadpqhsgyxahehs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhneWtjaWFkcHFoc2d5eGFoZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzNTU4MDEsImV4cCI6MjAzMzkzMTgwMX0.-jeJ0xcxnwAvCa7M8okkQw7wYZNQuhX70MmnPeUo2TM",
)

export type LeaderboardEntry = {
  elapsedMilliseconds: number
  weapon: "native" | "hp" | "dropdown"
  targetTime: string
  username: string
}

export async function storeLeaderboardEntry(entry: LeaderboardEntry) {
  await supabase.from("leaderboard").insert({
    elapsed_milliseconds: entry.elapsedMilliseconds,
    weapon: entry.weapon,
    target_time: entry.targetTime,
    username: entry.username,
  })
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase.from("leaderboard").select()

  if (error) {
    console.error("Error getting documents", error)
    return []
  }

  return data
    .map((doc) => {
      return {
        elapsedMilliseconds: doc.elapsed_milliseconds,
        weapon: doc.weapon,
        targetTime: doc.target_time,
        username: doc.username,
      }
    })
    .sort((a, b) => a.elapsedMilliseconds - b.elapsedMilliseconds)
}
