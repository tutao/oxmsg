// @flow
/** https://stackoverflow.com/a/15550284
 * Convert a Microsoft OADate to ECMAScript Date
 * Treat all values as local.
 * OADate = number of days since 30 dec 1899 as a double value
 * @param {string|number} oaDate - OADate value
 * @returns {Date}
 */
export function oADateToDate(oaDate: number): Date {
	// Treat integer part as whole days
	const days = parseInt(oaDate)
	// Treat decimal part as part of 24hr day, always +ve
	const ms = Math.abs((oaDate - days) * 8.64e7)
	// Add days and add ms
	return new Date(1899, 11, 30 + days, 0, 0, 0, ms)
}

/** https://stackoverflow.com/a/15550284
 * Convert an ECMAScript Date to a Microsoft OADate
 * Treat all dates as local.
 * @param {Date} date - Date to convert
 * @returns {Date}
 */
export function dateToOADate(date: Date): number {
	const temp = new Date(date)
	// Set temp to start of day and get whole days between dates,
	const days = Math.round((temp.setHours(0, 0, 0, 0) - new Date(1899, 11, 30)) / 8.64e7)
	// Get decimal part of day, OADate always assumes 24 hours in day
	const partDay = (Math.abs((date - temp) % 8.64e7) / 8.64e7)//.toFixed(10)
	return days + partDay//.substr(1)
}

// $FlowIgnore[bigint-unsupported]
export const FT_TICKS_PER_MS = 10000n;
const FILE_TIME_ZERO = new Date(Date.parse("1601-01-01T00:00:00"))

// Date: milliseconds since 1. January 1970 (UTC)
// FileTime: unsigned 64 Bit, 100ns units since 1. January 1601 (UTC)
// ms between 01.01.1970 and 01.01.1601: 11644473600
// $FlowIgnore[bigint-unsupported]
export function fileTimeToDate(fileTime: bigint): Date {
	return new Date(FILE_TIME_ZERO.getTime() + Number(fileTime / FT_TICKS_PER_MS))
}

// $FlowIgnore[bigint-unsupported]
export function dateToFileTime(date: Date): bigint {
	const msSinceFileTimeEpoch = BigInt(date.getTime()) - BigInt(FILE_TIME_ZERO.getTime())
	const result = msSinceFileTimeEpoch * FT_TICKS_PER_MS;
	return result
}
