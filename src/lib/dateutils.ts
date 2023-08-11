import { startOfToday, startOfYesterday } from 'date-fns'

export const getToday = () => startOfToday()
export const getYesterday = () => startOfYesterday()
