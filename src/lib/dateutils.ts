import { DateTime } from 'luxon'
import { getStoredTimezone } from './localStorage'

export const getToday = () => {
  const timezone = getStoredTimezone()
  const now = DateTime.now().setZone(timezone)
  const today = DateTime.utc(now.year, now.month, now.day)

  return today
}

export const getYesterday = () => {
  return getToday().minus({days: 1})
}
