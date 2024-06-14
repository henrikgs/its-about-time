export function calculateClicks(targetTime: string): number {
  return targetTime
    .split(":")
    .join("")
    .split("")
    .filter((char) => char !== "0").length
}
