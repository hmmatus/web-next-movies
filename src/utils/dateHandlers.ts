export function nextweek(): Date {
  const today = new Date()
  const nextweek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7,
  )
  return nextweek
}
